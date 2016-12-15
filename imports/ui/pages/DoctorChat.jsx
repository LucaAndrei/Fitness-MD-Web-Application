import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import { Component } from 'react';
import ChatMessage from '../components/ChatMessage.jsx'
var _ = require('lodash');

import sortMessages from '../../../client/modules/sort-messages';
import handleMessageInsert from '../../../client/modules/handle-message-insert';

import setScroll from '../../../client/modules/set-scroll';


export default class Chat extends Component {
    constructor() {
        super();
        console.log("Chat constructor");
        console.log("Object",Object);
        console.log("this.state before",this.state);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

  renderMessages(messages) {
    console.log("renderMessages",messages);
    return messages.map((message) => {
        console.log("renderMessages message",message);
        return <ChatMessage key={message._id} message={message} />;
    });

  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit this",this);
    var path = this.props.location.pathname;
    var toUser = path.substring(path.lastIndexOf('/')+1)
    handleMessageInsert(this.message, toUser);
    this.message.value='';
  }





  render() {
    const {
      messages,
      user,
      location
    } = this.props
    console.log("DoctorChat props",this.props)
    console.log("messages",messages);
    sortMessages(messages);
    //this.renderMessages(messages);
    setScroll( 'messages' );

    return (
        <div>Doctor Chat
            <div className="conversation">
                <div id="messages">
                    <div className="messages-list {{#if isLoading}}loading-list{{/if}}">
                         {messages.length> 0 ? this.renderMessages(messages)
                        : <div><p className="alert alert-warning">You haven't said anything</p></div> }
                  </div>
                </div>
                <div className="message-input">
                    <form onSubmit={this.handleSubmit} >
                        <input
                            name="message"
                            placeholder="Type your message here..."
                            ref={(c) => { this.message = c; }} />
                    </form>
                </div>
          </div>
        </div>
    );
  }
}