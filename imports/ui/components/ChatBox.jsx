import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import { Component } from 'react';
import ChatMessage from '../components/ChatMessage.jsx'

import sortMessages from '../../../client/modules/sort-messages';
import handleMessageInsert from '../../../client/modules/handle-message-insert';

import setScroll from '../../../client/modules/set-scroll';


let DEBUG = true;
let LOG_TAG = "imports/ui/components/ChatBox";

export default class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderMessages(messages) {
        console.log(LOG_TAG,"renderMessages", messages);
        return messages.map((message) => {
            console.log(LOG_TAG,"renderMessages message", message);
            return <ChatMessage key = {message._id} message = {message} />;
        });

    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(LOG_TAG,"handleSubmit this", this);
        var path = this.props.location.pathname;
        var toUser = path.substring(path.lastIndexOf('/') + 1)
        handleMessageInsert(this.message, toUser);
    }

    render() {
        if(DEBUG) {
            console.log(LOG_TAG,"render ChatBox this.props: ",this.props)
        }

        const {
            messages,
            user,
            location
        } = this.props

        sortMessages(messages);
        setScroll('messages');

        return (
            <div className = "card conversation">
                <div id = "messages">
                    <div className = "messages-list {{#if isLoading}}loading-list{{/if}}">
                        {
                            messages.length> 0
                                ?
                                    this.renderMessages(messages)
                                :
                                    <div>
                                        <p className = "alert alert-warning"> You haven 't said anything</p>
                                    </div>
                        }

                    </div>
                </div>
                <div className = "message-input">
                    <form onSubmit = {this.handleSubmit}>
                        <input
                            id = "messageInput"
                            name = "message"
                            placeholder = "Type your message here..."
                            ref = {
                                (c) => {
                                    this.message = c;
                                }
                            } />
                    </form>
                </div>
            </div>
        )
    }
}