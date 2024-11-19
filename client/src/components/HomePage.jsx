import { Link } from "react-router-dom";

const HomePage = () => {
   return (
       <div style={styles.homePage}>
           <h1 style={styles.header}>Welcome to the Authentication System</h1>
           <div style={styles.sections}>
               <Link to="/individual-auth" style={{ ...styles.section, ...styles.sectionIndividual }}>
                   <h2>Individual Person Authentication</h2>
                   <p>Authenticate a single individual.</p>
               </Link>

               <Link to="/group-auth" style={{ ...styles.section, ...styles.sectionGroup }}>
                   <h2>Group Authentication</h2>
                   <p>Authenticate a group of individuals.</p>
               </Link>

               <Link to="/attendance" style={{ ...styles.section, ...styles.sectionAttendance }}>
                   <h2>Attendance</h2>
                   <p>Track and manage attendance.</p>
               </Link>
           </div>
       </div>
   );
};

const styles = {
   homePage: {
       textAlign: 'center',
       padding: '2rem',
       backgroundColor: '#f7f9fc',
       minHeight: '100vh',
       fontFamily: 'Arial, sans-serif'
   },
   header: {
       fontSize: '2rem',
       fontWeight: 'bold',
       color: '#333',
       marginBottom: '1.5rem',
   },
   sections: {
       display: 'flex',
       gap: '2rem',
       justifyContent: 'center',
       flexWrap: 'wrap',
   },
   section: {
       border: '2px solid #ddd',
       padding: '1.5rem',
       width: '260px',
       textAlign: 'center',
       textDecoration: 'none',
       color: '#333',
       borderRadius: '10px',
       transition: 'transform 0.3s ease, box-shadow 0.3s ease',
       backgroundColor: '#fff',
       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center'
   },
   sectionIndividual: {
       borderColor: '#007BFF',
   },
   sectionGroup: {
       borderColor: '#28A745',
   },
   sectionAttendance: {
       borderColor: '#FFC107',
   },
   sectionHover: {
       transform: 'translateY(-5px)',
       boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
   }
};

export default HomePage;
