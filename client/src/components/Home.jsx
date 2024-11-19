import React from 'react';
import IndividualAuth from './IndividualAuth';
import GroupAuth from './GroupAuth';
import Attendance from './Attendance';

const Home = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '40px',
            gap: '20px',
            flexWrap: 'wrap',
        }}>
            <IndividualAuth />
            <GroupAuth />
            <Attendance />
        </div>
    );
};

export default Home;
