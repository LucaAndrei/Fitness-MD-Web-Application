import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
//import { BarChart } from 'react-easy-chart';

import User from '../components/User.jsx';
import ChatBox from '../components/ChatBox.jsx';

import * as d3 from "d3";
import d3Format from "d3-time-format";

var _ = require('lodash');

var cx = require('classnames');

let DEBUG = true;
let LOG_TAG = "imports/ui/pages/UserProfile";

const monthNames = ["Jan","Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec"];

import BarChart from 'react-bar-chart';
import {FaAngleLeft, FaAngleRight} from 'react-icons/lib/fa';

const data = [
  {text: '18-Dec-16', value: 500},
  {text: '19-Dec-16', value: 0},
  {text: '20-Dec-16', value: 300},
  {text: '21-Dec-16', value: 127},
  {text: '22-Dec-16', value: 27},
  {text: '23-Dec-16', value: 58},
  {text: '24-Dec-16', value: 399}
];

const margin = {top: 20, right: 20, bottom: 30, left: 40};



// docs : http://rma-consulting.github.io/react-easy-chart/bar-chart/index.html

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        console.log(LOG_TAG,"props : ",props)

        this.renderUserData = this.renderUserData.bind(this);
        const initialWidth = window.innerWidth> 0 ? window.innerWidth : 500;
        this.state = {
            windowWidth: initialWidth - 100,
            componentWidth: 300,
            timeRange: {
                inferiorLimit : beforeNow(),
                superiorLimit : afterNow()
            },
            stepsData : [{
                text: '10-Jan-17',
                value: 20
            }]
        };

        this.clickLeft = this.clickLeft.bind(this);
        this.clickRight = this.clickRight.bind(this);
        this.clickToday = this.clickToday.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.mouseOverHandler = this.mouseOverHandler.bind(this);
        this.mouseOutHandler = this.mouseOutHandler.bind(this);

    }


    handleResize() {

        let elem = ReactDOM.findDOMNode(this);
        console.log("handleResize :",elem.offsetWidth);
        this.setState({
            windowWidth: window.innerWidth - 100,
            componentWidth: elem.offsetWidth
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        console.log("componentDidMount");
        this.setState({
            /*stepsValues : {
                minSteps : this.minStepsForPeriod(this.renderUserData(this.props.params.userId)),
                maxSteps : this.maxStepsForPeriod(this.renderUserData(this.props.params.userId))
            },*/
            stepsData : this.calculateStepsForWeek(this.renderUserData(this.props.params.userId))
        })

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate")
        console.log("nextProps",nextProps)
        console.log("nextState",nextState);
        console.log("this.state",this.state)
        var areArraysEqual = arraysEqual(this.state.stepsData, nextState.stepsData);
        console.log("areArraysEqual",areArraysEqual);
        if(
            (
                (nextState.timeRange.inferiorLimit != this.state.timeRange.inferiorLimit) && (nextState.timeRange.superiorLimit != this.state.timeRange.superiorLimit)
            ) || (areArraysEqual == false) || (nextState.dataDisplay != this.state.dataDisplay)
            ||(nextState.componentWidth != this.state.componentWidth)


        ) {
            console.log("component should update")
            return true;//should be true - testing purposes
        } else {
            console.log("component should not update;")
            return false;
        }
    }

    componentDidUpdate() {
        console.log("componentDidUpdate",this.state);

        this.setState({
            stepsData : this.calculateStepsForWeek(this.renderUserData(this.props.params.userId))
        })
    }

    calculateStepsForWeek(profile) {
        console.log("calculateStepsForWeek",profile);
        console.log(this.state);
        var xDomainRange = this.state.timeRange;
        console.log("calculateStepsForWeek xDomainRange",xDomainRange);

        var datePast = xDomainRange.inferiorLimit;
        var parsedData = d3.time.format("%d-%b-%y").parse(datePast);
        var longDatePast = new Date(parsedData);
        console.log("longDatePast",longDatePast.getTime());

        var dateFuture = xDomainRange.superiorLimit;
        var parsedDataFuture = d3.time.format("%d-%b-%y").parse(dateFuture);
        var longDateFuture = new Date(parsedDataFuture);
        console.log("longDateFuture",longDateFuture.getTime());
        var myArr = [];
        var hasDataBefore = false;
        var hasDataAfter = false;

        for(var i = 0; i < profile.pedometer.length ; i++) {
            var dateProfile = profile.pedometer[i].date;
            console.log("date[" + i+"] : ",dateProfile);
            if(dateProfile >= longDatePast.getTime() && dateProfile <= longDateFuture.getTime()) {
                console.log("in time");
                var dateFromProfile = new Date(dateProfile);

                let yr = dateFromProfile.getFullYear() % 100;
                let formattedDaysAgo = dateFromProfile.getDate()+"-"+monthNames[dateFromProfile.getMonth()]+"-"+yr;
                console.log("dateFromProfile.getDate()",dateFromProfile.getDate());
                console.log("monthNames[dateFromProfile.getMonth()]",monthNames[dateFromProfile.getMonth()]);
                console.log("formattedDaysAgo",formattedDaysAgo);

                console.log("computed day",new Date(Date.UTC(yr,dateFromProfile.getMonth(), dateFromProfile.getDate())))

                let data = {
                    text : formattedDaysAgo,
                    value : profile.pedometer[i].steps
                }
                console.log("data",data)
                myArr.push(data);
            } else if (dateProfile <= longDatePast.getTime()) {
                console.log("before");
                hasDataBefore = true;
            } else if (dateProfile >= longDateFuture.getTime()) {
                console.log("after");
                hasDataAfter = true;
            }



        }
        console.log("hasDataBefore : ",hasDataBefore);
        console.log("hasDataAfter : ",hasDataAfter);
        if (hasDataBefore == false) {
            console.log("disable button left");
            this.setState({
                disableButtonLeft : "pointer-events"
            })
        } else {
            //document.getElementById("button-left").className -= 'pointer-events';
            this.setState({
                disableButtonLeft : ""
            })
        }
        if(hasDataAfter == false) {
            console.log("disable button right");
            this.setState({
                disableButtonRight : "pointer-events"
            })
        } else {
            this.setState({
                disableButtonRight : ""
            })
        }

        console.log("myArr",myArr);
        return myArr;

    }


    clickLeft() {
        console.log(LOG_TAG,"clickLeft");
        this.setState({
            timeRange : {
                inferiorLimit : xDaysAgo(this.state.timeRange.inferiorLimit,7),
                superiorLimit : xDaysAgo(this.state.timeRange.superiorLimit,7)
            }/*,
            stepsValues : {
                minSteps : this.minStepsForPeriod(this.renderUserData(this.props.params.userId)),
                maxSteps : this.maxStepsForPeriod(this.renderUserData(this.props.params.userId))
            },*/
            //stepsData : this.calculateStepsForWeek(this.renderUserData(this.props.params.userId))
        })
    }

    clickRight() {
        console.log(LOG_TAG,"clickRight");
        this.setState({
            timeRange : {
                inferiorLimit : xDaysFuture(this.state.timeRange.inferiorLimit,7),
                superiorLimit : xDaysFuture(this.state.timeRange.superiorLimit,7)
            }/*,
            stepsValues : {
                minSteps : this.minStepsForPeriod(this.renderUserData(this.props.params.userId)),
                maxSteps : this.maxStepsForPeriod(this.renderUserData(this.props.params.userId))
            },*/
            //stepsData : this.calculateStepsForWeek(this.renderUserData(this.props.params.userId))
        })
    }

    clickToday() {
        console.log(LOG_TAG,"clickToday");
        this.setState({
            timeRange: {
                inferiorLimit : beforeNow(),
                superiorLimit : afterNow()
            }/*,
            stepsValues : {
                minSteps : this.minStepsForPeriod(this.renderUserData(this.props.params.userId)),
                maxSteps : this.maxStepsForPeriod(this.renderUserData(this.props.params.userId))
            },*/
            //stepsData : this.calculateStepsForWeek(this.renderUserData(this.props.params.userId))
       })
    }

    minStepsForPeriod(profile) {
        console.log(LOG_TAG,"minStepsForPeriod : ",profile);
        /*if (profile !== undefined) {
            if(profile.pedometer.length > 1) {
                var min = profile.pedometer[0].steps;
                for(var i = 1; i < profile.pedometer.length ; i++) {
                    var nrSteps = profile.pedometer[i].steps;
                    if ( nrSteps < min) {
                        min = nrSteps;
                    }
                }
                console.log("min : ",min);
                return min;
            } else if(profile.pedometer.length == 1) {
                console.log("min is : ",profile.pedometer[0].steps - 50)
                return profile.pedometer[0].steps - 50;
            } else return 0;


        } else {
            console.log("profile is undefined");
            return 0;
        }*/
        return 0;
    }
    maxStepsForPeriod(profile) {
        console.log(LOG_TAG,"maxStepsForPeriod : ",profile);
        if (profile !== undefined) {
            if(profile.pedometer.length > 1) {
                var max = profile.pedometer[0].steps;
                for(var i = 1; i < profile.pedometer.length ; i++) {
                    var nrSteps = profile.pedometer[i].steps;
                    if ( nrSteps > max) {
                        max = nrSteps;
                    }
                }
                console.log("max : ",max);
                return max+50;
            } /*else if(profile.pedometer.length == 1) {
                console.log("max is : ",profile.pedometer[0].steps +100)
                return profile.pedometer[0].steps + 100;
            } else return 100;*/
        } else {
            console.log("profile is undefined");
            return 0;
        }
    }

    renderUserData(userId) {
        let users = this.props.users;
        var userProfile = users.filter(function(user, pos) {
            return user._id == userId;
        })
        return userProfile[0]
    }

    handleBarClick(element, id){
        console.log("element",element);
        console.log("id",id);
        //this.setState({dataDisplay: `The value on the ${d.x} is ${d.y}`})
    }

    mouseOverHandler(element, id){
        console.log("mouseOverHandler");
        console.log("element",element);
        console.log("id",id);

        //this.setState({dataDisplay: `The value on the ${element.text} is ${element.value}`})
    }

    mouseOutHandler() {
        //this.setState({dataDisplay: ''});
    }

    todayDate() {
        var date = new Date();
        return date;
    }


    render() {
        if (DEBUG) {
            console.log(LOG_TAG, "render UserProfile this.props",this.props);
        }
        var profile = this.renderUserData(this.props.params.userId);
        console.log(LOG_TAG,"profile : ",profile);
        console.log("this.state",this.state)
        var dateNow = new Date();
        var date = dateNow.getDate()+"-"+monthNames[dateNow.getMonth()]+"-"+dateNow.getFullYear()%100;

        return (

            <div className="content-scrollable container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-user">
                            <div className="image">
                                </div>
                            <div className="content">
                                <div className="author">
                                  <img className="avatar border-white" src={"data:image/png;base64," + profile.profilePictureBase64} alt="..." />
                                  <h4 className="title">Chet Faker<br/>
                                    <Link to = {`/app/chat/${profile._id}`}>
                                        <small>{profile.emails[0].address}</small>
                                    </Link>
                                    </h4>
                                </div>
                            </div>


                            <hr />
                            <div className="text-center">
                                <div className="row">
                                    <div className="col-md-3 col-md-offset-1">
                                        <h5>137453<br /><small>Steps</small></h5>
                                    </div>
                                    <div className="col-md-4">
                                        <h5>55.7<br /><small>Kg</small></h5>
                                    </div>
                                    <div className="col-md-3">
                                        <h5>13:24:33<br /><small>Time active</small></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">

                    </div>
                    <div>
                        <BarChart
                            grid
                            width={this.state.componentWidth - 30}
                            height={this.state.componentWidth / 4}
                            margin={margin}
                            data = { this.state.stepsData}
                            onBarClick={this.handleBarClick}
                            onMouseOver={this.mouseOverHandler}
                            onMouseOut = {this.mouseOutHandler} />

                        <div className="col-lg-12">
                            <div className="col-lg-4">
                            <a className={"button button--ujarak button--border-thin button--text-thick button--size-s button--graph" + this.state.disableButtonLeft} onClick={this.clickLeft}>
                                    <FaAngleLeft />
                            </a></div>
                            <div className="col-lg-4">
                            <a className = "button button--ujarak button--border-thin button--text-thick button--size-s text-align-center button--graph" onClick={this.clickToday}>
                                    <span>{date}</span>
                            </a></div>
                            <div className="col-lg-4">
                            <a className = {"button button--ujarak button--border-thin button--text-thick button--size-s button--graph text-align-right" + this.state.disableButtonRight} onClick={this.clickRight}>
                                    <FaAngleRight />
                            </a></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function xDaysAgo(dateNow, xDays) {
    if (DEBUG) {
        console.log(LOG_TAG,"xDaysAgo date : ", dateNow, " >>> xDays : ", xDays);
    }

    var parsedData = d3.time.format("%d-%b-%y").parse(dateNow);
    var date = new Date(parsedData);
    var daysAgo = date - (xDays*24*60*60*1000);
    var dateDaysAgo = new Date(daysAgo);
    var yr = dateDaysAgo.getFullYear() % 100;
    var formattedDaysAgo = dateDaysAgo.getDate()+"-"+monthNames[dateDaysAgo.getMonth()]+"-"+yr;
    if (DEBUG) {
        console.log(LOG_TAG,"formattedDaysAgo : ", formattedDaysAgo);
    }
    return formattedDaysAgo;
}


function xDaysFuture(dateNow, xDays) {
    if (DEBUG) {
        console.log(LOG_TAG,"xDaysFuture date : ", dateNow, " >>> xDays : ", xDays);
    }

    var parsedData = d3.time.format("%d-%b-%y").parse(dateNow);
    var date = new Date(parsedData);
    var daysFuture = date.getTime() + (xDays*24*60*60*1000);
    var dateDaysFuture = new Date(daysFuture);
    var yr = dateDaysFuture.getFullYear() % 100;
    var formattedDaysFuture = dateDaysFuture.getDate()+"-"+monthNames[dateDaysFuture.getMonth()]+"-"+yr;

    if (DEBUG) {
        console.log(LOG_TAG,"formattedDaysFuture : ", formattedDaysFuture);
    }
    return formattedDaysFuture;
}


function beforeNow() {
    var date = new Date();
    if (DEBUG) {
        console.log(LOG_TAG,"beforeNow date : ", date);
    }

    var daysAgo = date - (3*24*60*60*1000);
    var dateDaysAgo = new Date(daysAgo);
    var yr = dateDaysAgo.getFullYear() % 100;
    var formattedBeforeNow = dateDaysAgo.getDate()+"-"+monthNames[dateDaysAgo.getMonth()]+"-"+yr;
    if (DEBUG) {
        console.log(LOG_TAG,"formattedBeforeNow : ", formattedBeforeNow);
    }

    return formattedBeforeNow;
}

function afterNow() {
    var date = new Date();
    if (DEBUG) {
        console.log(LOG_TAG,"afterNow date : ", date);
    }
    var daysFuture = date.getTime() + (4*24*60*60*1000);
    var dateDaysFuture = new Date(daysFuture);
    var yr = dateDaysFuture.getFullYear() % 100;
    var formattedAfterNow = dateDaysFuture.getDate()+"-"+monthNames[dateDaysFuture.getMonth()]+"-"+yr;
    if (DEBUG) {
        console.log(LOG_TAG,"formattedAfterNow : ", formattedAfterNow);
    }

    return formattedAfterNow;

}


function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        console.log("arr1["+i+"] : ",arr1[i]);
        console.log("arr2["+i+"] : ",arr2[i]);

        if((arr1[i].text !== arr2[i].text) || (arr1[i].value !== arr2[i].value)) {

            console.log("not equal");
            return false;
        } else {
            console.log("are equal");
        }
    }

    return true;
}