import React from 'react';

let DEBUG = true;
let LOG_TAG = "imports/ui/components/ChatMessage";

export default class ChatMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    createTimestamp(timestamp) {
        //console.log("timestamp",timestamp);
        if (timestamp) {
            let today = moment().format('YYYY-MM-DD'),
            datestamp = moment(timestamp).format('YYYY-MM-DD'),
            isBeforeToday = moment(today).isAfter(datestamp),
            format = isBeforeToday ? 'MMMM Do, YYYY hh:mm a' : 'hh:mm a';
            var formattedTimestamp = moment(timestamp).format(format);
        }
        if(DEBUG) {
            console.log(LOG_TAG,"createTimestamp formattedTimestamp : ",formattedTimestamp)
        }
        return formattedTimestamp;
    }

    render() {
        if(DEBUG) {
            console.log(LOG_TAG,"render ChatMesssage this.props: ",this.props)
        }
        console.log("ChatMessage", this.props);
        const {
            message
        } = this.props;
        return (
            <div className = "message">
                {message.showHeader
                    ?
                        <header>
                            <h4> {message.ownerName} <span> {this.createTimestamp(message.timestamp)} </span></h4>
                        </header>
                    :   ""
                }
                <div className = "body">
                    {message.message}
                </div>
            </div>
        )
    }
}