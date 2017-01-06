import React from 'react';

import { Link } from 'react-router';

let DEBUG = true;
let LOG_TAG = "imports/ui/pages/About";
import {FaAngleLeft, FaAngleRight} from 'react-icons/lib/fa';

import {TiArrowBack, TiArrowForward, TiCodeOutline} from 'react-icons/lib/ti'
import {FaStar, FaCode, FaComment, FaUserPlus, FaEdit, FaBook} from 'react-icons/lib/fa'

export default class About extends React.Component {
    constructor(props) {
        super(props);

    }




    render() {
        const user = this.props;
        if (DEBUG) {
            console.log(LOG_TAG,"this.props : ",this.props);
        }
        return (
            <div className = "content-scrollable">
                <div className="container-fluid">
                    <div className="page-header">
                        <h3 id="timeline">Education and Training</h3>
                    </div>
                    <ul className="timeline">
                        <li>
                            <div className="timeline-badge"><FaBook /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4 className="timeline-title">2011 - 2015</h4>
                                </div>
                                <div className="timeline-body">
                                    <p>Faculty of Automatic Control and Computers, “Dunarea de Jos” University, Galati</p>
                                    <p>
                                        <i>Title of qualification awarded :</i>
                                        <b> Bachelor in Computer Science and Information Technology</b>
                                    </p>
                                    <p>
                                        <i>Thesis title :</i>
                                        <b> Web application using M.E.A.N (MongoDB, ExpressJS, AngularJS, NodeJS) framework suite</b>
                                    </p>
                                    <p>
                                        <i>Principal subjects/occupational skills covered :</i>
                                    </p>
                                    <ul className="timeline-item-list">
                                        <li>Mathematics</li>
                                        <li>Informatics</li>
                                        <li>Object-Oriented Programming</li>
                                        <li>Database Design and Programming</li>
                                    </ul>

                                </div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-badge warning"><FaBook /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4 className="timeline-title">2015 - Present</h4>
                                </div>
                                <div className="timeline-body">
                                    <p>Faculty of Automatic Control and Computers, “Dunarea de Jos” University, Galati</p>
                                    <p>
                                        <i>Title of qualification awarded :</i>
                                        <b> Master in Advanced Information Technology</b>
                                    </p>
                                    <p>
                                        <i>Thesis title :</i>
                                        <b> Android application for an Arduino Pedometer</b>
                                    </p>
                                    <p>
                                        <i>Principal subjects/occupational skills covered :</i>
                                    </p>
                                    <ul className="timeline-item-list">
                                        <li>Database Administration</li>
                                        <li>Advanced Object-Oriented Programming</li>
                                        <li>Multimedia & Web applications</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>


                    <div className="page-header">
                        <h3 id="timeline">Work experience</h3>
                    </div>
                    <ul className="timeline">
                        <li>
                            <div className="timeline-badge"><FaEdit /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4 className="timeline-title">2013 - 2014</h4>
                                </div>
                                <div className="timeline-body">
                                    <p>
                                        <i>Occupation or position held :</i>
                                        <b> ActionScript 3.0 Developer</b>
                                    </p>
                                    <p>
                                        <i>Main activities and responsibilities : </i>
                                        <b> Developing e-Learning software</b>
                                    </p>
                                    <p>
                                        <i>Name of the employer :</i>
                                        <b>SC AltFactor SRL</b>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-badge warning"><FaEdit /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4 className="timeline-title">2014 - Present</h4>
                                </div>
                                <div className="timeline-body">
                                    <p>
                                        <i>Occupation or position held :</i>
                                        <b> Android Developer</b>
                                    </p>
                                    <p>
                                        <i>Main activities and responsibilities : </i>
                                        <b> MOST (Media Oriented Systems Transport) implementation on the Android platform</b>
                                    </p>
                                    <p>
                                        <i>Name of the employer :</i>
                                        <b> Wind River, Galati, Romania</b>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div className="page-header">
                        <h3 id="timeline">Projects and personal achievements</h3>
                    </div>
                    <ul className="timeline">
                        <li>
                            <div className="timeline-badge"><FaStar /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4 className="timeline-title">Award of course completion – Oracle Academy, Database Design and Programming with SQL & PL/SQL</h4>
                                </div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-badge warning"><FaStar /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4 className="timeline-title">Digital Competence Certificate</h4>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="timeline-badge"><FaStar /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4 className="timeline-title">Certificate of Professional Competence</h4>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div className="page-header">
                        <h3 id="timeline">Personal skills and competences</h3>
                    </div>
                    <ul className="timeline">
                        <li>
                            <div className="timeline-badge"><FaComment /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4 className="timeline-title">Other foreign language(s):</h4>
                                </div>
                                <div className="timeline-body">
                                    <p>English (writing, understanding, speaking) – Linguistic Competence Certificate, B2</p>
                                </div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-badge warning"><FaCode /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4 className="timeline-title">Computer skills and competences</h4>
                                </div>
                                <div className="timeline-body">
                                    <ul className="timeline-item-list">
                                        <li>C++</li>
                                        <li>Java</li>
                                        <li>Android</li>

                                        <br />
                                        <li>Javascript</li>
                                        <li>HTML</li>
                                        <li>CSS</li>
                                        <li>jQuery</li>
                                        <li>ActionScript 3.0</li>
                                        <li>NodeJS</li>

                                        <br />
                                        <li>Windows</li>
                                        <li>Linux</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="timeline-badge"><FaUserPlus /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4 className="timeline-title">Other skills and competences</h4>
                                </div>
                                <div className="timeline-body">
                                    <ul className="timeline-item-list">
                                        <li>I have good communication and social skills and can integrate easily in working environments</li>
                                        <li>I have effective leadership and organizational aptitudes</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        )
    }
}