import React from 'react';

// a common layout wrapper for auth pages
const AuthPage = ({content,link}) => ( 
    <div className = "">
        <div className = "content-scrollable"> 
            {content}
        </div>
    </div>
);

AuthPage.propTypes = {
    content: React.PropTypes.element,
};

export default AuthPage;