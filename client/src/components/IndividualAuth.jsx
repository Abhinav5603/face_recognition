import React from 'react';
import { useNavigate } from 'react-router-dom';

const IndividualAuth = () => {
    const navigate = useNavigate();

    return (
        <button 
            style={{
                backgroundColor: '#4CAF50',
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
            onMouseEnter={e => e.target.style.backgroundColor = '#45a049'}
            onMouseLeave={e => e.target.style.backgroundColor = '#4CAF50'}
            onClick={() => navigate('/capture')}
        >
            Individual Person Authentication
            {/* <Link to="/capture" className="btn-light py2 md:block">Capture</Link> */}
        </button>
    );
};

export default IndividualAuth;
