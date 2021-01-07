import React from 'react';
import { Link } from 'react-router-dom';

const MainloginForm = () => {
    return (
        <>
            <h1>This is the login form.</h1>
            <div>
                <Link to="/">Main Page Link</Link>
                <Link to="/signup">Registration form link</Link>
            </div>
        </>
    );
};

export default MainloginForm;
