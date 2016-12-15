import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import AppContainer from '../../ui/containers/AppContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import DoctorChat from '../../ui/pages/DoctorChat.jsx';

import AdminContainer from '../../ui/containers/AdminContainer.jsx';
import Admin from '../../ui/pages/Admin.jsx';

import UserProfile from '../../ui/pages/UserProfile.jsx';

import ChatContainer from '../../ui/containers/ChatContainer.jsx';
import UserProfileContainer from '../../ui/containers/UserProfileContainer.jsx';


export const renderRoutes = () => (
	<Router history={browserHistory}>
    	<Route path="/" component={AppContainer}>
      		<Route path="signin" component={AuthPageSignIn} />
      		<Route path="join" component={AuthPageJoin} />
      		<Route path="chat/:assignedDoctorId" component={ChatContainer} />
      		<Route path="admin" component={Admin} />

    	</Route>
    	<Route path="user/" component={UserProfileContainer}>
    		<Route path="profile/:userId" component={UserProfile} />
    	</Route>
  	</Router>
);