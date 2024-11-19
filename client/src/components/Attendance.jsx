import React from 'react';
import { useNavigate } from 'react-router-dom';

const Attendance = () => {
    const navigate = useNavigate();

    return (
        <button 
            style={{
                backgroundColor: '#f44336',
                color: '#fff',
                padding: '15px 32px',
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, backgroundColor 0.3s ease',
                width: '250px',
                margin: '20px',
                display: 'block'
            }}
            onMouseEnter={e => e.target.style.backgroundColor = '#e53935'}
            onMouseLeave={e => e.target.style.backgroundColor = '#f44336'}
            onClick={() => navigate('/attendance')}
        >
            Crowd counting
        </button>
    );
};

export default Attendance;
