import React from 'react';
import { useNavigate } from 'react-router-dom';

const GroupAuth = () => {
    const navigate = useNavigate();

    return (
        <button 
            style={{
                backgroundColor: '#2196F3',
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
            onMouseEnter={e => e.target.style.backgroundColor = '#1e88e5'}
            onMouseLeave={e => e.target.style.backgroundColor = '#2196F3'}
            onClick={() => navigate('/group-auth')}
        >
            Group Authentication
        </button>
    );
};

export default GroupAuth;
