import React from 'react';
import { Router, Route, browserHistory, IndexRedirect, IndexRoute } from 'react-router';
import AppContainer from '../../ui/containers/AppContainer.jsx';
import AuthenticatedAppContainer from '../../ui/containers/AuthenticatedAppContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';

import Index from '../../ui/pages/Index.jsx';

//import AdminContainer from '../../ui/containers/AdminContainer.jsx';
import Admin from '../../ui/pages/Admin.jsx';

import About from '../../ui/pages/About.jsx';
import Contact from '../../ui/pages/Contact.jsx';
import MessagesUserlist from '../../ui/pages/MessagesUserlist.jsx';

import UserProfile from '../../ui/pages/UserProfile.jsx';

import ChatContainer from '../../ui/containers/ChatContainer.jsx';


export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={Index} />
            <Route path="signin" component={AuthPageSignIn} />
            <Route path="join" component={AuthPageJoin} />
            <Route path="about" component={About} />
            <Route path="contact" component={Contact} />
        </Route>
        <Route path="/app" component={AuthenticatedAppContainer}>
            <Route path="chat/:interlocutorId" component={ChatContainer} />
            <Route path="admin" component={Admin} />
            <Route path="profile/:userId" component={UserProfile} />
            <Route path="messages" component={MessagesUserlist} />
        </Route>
    </Router>
);