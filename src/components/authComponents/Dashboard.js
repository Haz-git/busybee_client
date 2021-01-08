import React from 'react';

const Dashboard = () => {
    return (
        <>
            <h1>
                This should be a protected component, it should not reveal
                unless you have a JWT. This is the main dashboard.
            </h1>
        </>
    );
};

export default Dashboard;
