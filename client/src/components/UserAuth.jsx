// import InputBox from "./InputBox";
// import { Link, useNavigate } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";
// import axios from 'axios';

// const UserAuth = ({ type, onSignIn }) => {
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Determine endpoint based on form type
//         const serverRoute = type === "sign-in" ? "/signin" : "/signup";
//         const backendURL = `${'http://localhost:5000'}${serverRoute}`;
        
//         // Create form data object
//         let form = new FormData(document.getElementById("formElement"));
//         let formdata = {};
//         for(let [key, val] of form.entries()){
//             formdata[key] = val;
//         }

//         let { fullname, email, password } = formdata;

//         // Client-side validation
//         let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//         let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        
//         if (fullname && fullname.length < 3) return toast.error("Name cannot be less than 3 characters");
//         if (!email) return toast.error("Enter email");
//         if (!emailRegex.test(email)) return toast.error("Email is invalid");
//         if (!passwordRegex.test(password)) return toast.error("Password must contain numeric and caps");

//         try {
//             // Send request to backend
//             const response = await axios.post(backendURL, { fullname, email, password });
//             toast.success("Success! Redirecting...");

//             // If sign-in is successful, update login state
//             if (type === "sign-in") {
//                 onSignIn();
//             }

//             // Delay redirection by 2 seconds
//             setTimeout(() => {
//                 navigate("/home");
//             }, 2000);
            
//         } catch (error) {
//             // Handle errors from the backend
//             toast.error(error.response?.data?.error || "Something went wrong");
//         }
//     };

//     return (
//         <section className="h-cover flex items-center justify-center"> 
//             <Toaster />
//             <form id="formElement" className="w-[80%] max-w-[400px]">
//                 <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
//                     {type === 'sign-in' ? "Welcome Back" : "Join Us Today"}
//                 </h1>

//                 {/* we only need this for new users */}
//                 {
//                     type === 'sign-up' && (
//                         <InputBox   
//                             name="fullname"
//                             type="text"
//                             placeholder="Full Name"
//                             icon="fi-rr-user"
//                         />
//                     )
//                 }

//                 {/* common for both pages */}
//                 <InputBox   
//                     name="email"
//                     type="email"
//                     placeholder="Email"
//                     icon="fi-rr-envelope"
//                 />  

//                 <InputBox   
//                     name="password"
//                     type="password"
//                     placeholder="Password"
//                     icon="fi-rr-key"
//                 />  

//                 <button className="btn-dark center mt-14" type="submit" onClick={handleSubmit}>
//                     {type.replace('-', " ")}
//                 </button>
                
//                 <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
//                     <hr className="w-1/2 border-black"/>
//                         <p>or</p>
//                     <hr className="w-1/2 border-black"/>
//                 </div>
                
//                 <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
//                     continue with google
//                 </button>

//                 {
//                     type === 'sign-up' ? (
//                         <p className="mt-6 text-dark-grey text-xl text-center">
//                             Already a member?
//                             <Link className="underline text-black text-xl ml-2" to="/signin">Signin here</Link>
//                         </p>
//                     ) : (
//                         <p className="mt-6 text-dark-grey text-xl text-center">
//                             Don't have an account?
//                             <Link className="underline text-black text-xl ml-2" to="/signup">Join Us Today</Link>
//                         </p>
//                     )
//                 }
//             </form>
//         </section> 
//     );
// };

// export default UserAuth;





import InputBox from "./InputBox";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from 'axios';

const UserAuth = ({ type, onSignIn }) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Determine endpoint based on form type
        const serverRoute = type === "sign-in" ? "/signin" : "/signup";
        const backendURL = `${'http://localhost:5000'}${serverRoute}`;
        
        // Create form data object
        let form = new FormData(document.getElementById("formElement"));
        let formdata = {};
        for(let [key, val] of form.entries()){
            formdata[key] = val;
        }

        let { fullname, email, password } = formdata;

        // Client-side validation
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        
        if (fullname && fullname.length < 3) return toast.error("Name cannot be less than 3 characters");
        if (!email) return toast.error("Enter email");
        if (!emailRegex.test(email)) return toast.error("Email is invalid");
        if (!passwordRegex.test(password)) return toast.error("Password must contain numeric and caps");

        try {
            // Send request to backend
            const response = await axios.post(backendURL, { fullname, email, password });
            toast.success("Success! Redirecting...");

            // If sign-in is successful, update login state
            if (type === "sign-in") {
                onSignIn();
            }

            // Delay redirection by 2 seconds
            setTimeout(() => {
                navigate("/home");
            }, 2000);
            
        } catch (error) {
            // Handle errors from the backend
            toast.error(error.response?.data?.error || "Something went wrong");
        }
    };

    const handleCaptureButtonClick = () => {
        // Navigate to the capture photo page
        navigate('/capture');
    };

    return (
        <section className="h-cover flex items-center justify-center"> 
            <Toaster />
            <form id="formElement" className="w-[80%] max-w-[400px]">
                <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                    {type === 'sign-in' ? "Welcome Back" : "Join Us Today"}
                </h1>

                {/* we only need this for new users */}
                {
                    type === 'sign-up' && (
                        <InputBox   
                            name="fullname"
                            type="text"
                            placeholder="Full Name"
                            icon="fi-rr-user"
                        />
                    )
                }

                {/* common for both pages */}
                <InputBox   
                    name="email"
                    type="email"
                    placeholder="Email"
                    icon="fi-rr-envelope"
                />  

                <InputBox   
                    name="password"
                    type="password"
                    placeholder="Password"
                    icon="fi-rr-key"
                />  

                <button className="btn-dark center mt-14" type="submit" onClick={handleSubmit}>
                    {type.replace('-', " ")}
                </button>
                
                <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                    <hr className="w-1/2 border-black"/>
                        <p>or</p>
                    <hr className="w-1/2 border-black"/>
                </div>
                
                <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
                    continue with google
                </button>

                {/* Only show the Capture Photo button on the sign-in page */}
                {type === 'sign-in' && (
                    <button 
                        className="btn-dark flex items-center justify-center gap-4 w-[90%] center mt-6" 
                        onClick={handleCaptureButtonClick}
                    >
                        Capture Photo
                    </button>
                )}

                {
                    type === 'sign-up' ? (
                        <p className="mt-6 text-dark-grey text-xl text-center">
                            Already a member?
                            <Link className="underline text-black text-xl ml-2" to="/signin">Signin here</Link>
                        </p>
                    ) : (
                        <p className="mt-6 text-dark-grey text-xl text-center">
                            Don't have an account?
                            <Link className="underline text-black text-xl ml-2" to="/signup">Join Us Today</Link>
                        </p>
                    )
                }
            </form>
        </section> 
    );
};

export default UserAuth;
