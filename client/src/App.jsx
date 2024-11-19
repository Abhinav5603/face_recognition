// import Navbar from './components/Navbar';
// import UserAuth from './components/UserAuth';
// import Home from './components/Home';
// import { Route, Routes, Navigate } from "react-router-dom";
// import { useState } from 'react';
// import CapturePhoto from './components/CapturePhoto';

// const App = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleSignIn = () => {
//         setIsLoggedIn(true);
//     };

//     return (
//         <Routes>
//             <Route path="/" element={<Navbar />} >
//                 <Route path="signin" element={<UserAuth type="sign-in" onSignIn={handleSignIn} />} />
//                 <Route path="signup" element={<UserAuth type="sign-up" />} />
//                 <Route path="home" element={isLoggedIn ? <Home /> : <Navigate to="/signin" />} />
                
//             </Route>
//             <Route>
//                 <Route path='/capture' element={<CapturePhoto/>}>

//                 </Route>
//             </Route>
//         </Routes>
//     );
// }

// export default App;

import Navbar from './components/Navbar';
import UserAuth from './components/UserAuth';
import Home from './components/Home';
import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from 'react';
import CapturePhoto from './components/CapturePhoto';
// import FaceRecognition from './components/FaceRecognition';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSignIn = () => {
        setIsLoggedIn(true);
    };

    return (
        <Routes>
            <Route path="/" element={<Navbar />} >
                <Route path="signin" element={<UserAuth type="sign-in" onSignIn={handleSignIn} />} />
                <Route path="signup" element={<UserAuth type="sign-up" />} />
                <Route path="home" element={isLoggedIn ? <Home /> : <Navigate to="/signin" />} />
            </Route>
            {/* Remove the standalone capture route */}
            <Route path='/capture' element={<CapturePhoto />} />
        </Routes>
    );
}

export default App;

