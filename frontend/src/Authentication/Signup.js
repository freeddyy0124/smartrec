import React, { useContext } from 'react'
import SignUp from './SignUp/SignUp'
import { AuthContext } from '../Contexts/authContextHelper';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const { signup } = useContext(AuthContext); // Extract signup function from context
    const navigate = useNavigate();

    const onSubmit = async (email, password) => {
        try {
            // Display a toast for the pending signup process
            await toast.promise(
                signup(email, password), // Directly pass the signup promise to toast.promise
                {
                    pending: 'Signing up...',
                    success: 'Signed up! Redirecting...',
                    error: 'Error signing up'
                }
            );

            // Navigate after the toast for success is shown
            setTimeout(() => { navigate("/"); navigate(0); }, 1500); // Consider increasing timeout to let user read the message
        } catch (error) {
            // Handle errors not caught by toast.promise
            console.error("Signup error:", error);
            toast.error("An unexpected error occurred during signup.");
        }
    };

  return (
    <div style={{height:"100vh", width:"100vw", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <SignUp
 				bgthemeColor={"rgba(255, 255, 255, 1)"}
 				onSignUp={onSubmit}
 				width={"350px"}
 				fontColor={"rgba(0, 0, 0, 1)"}
 				backgroundColor={"rgba(255, 255, 255, 1)"}
 				borderColor={"rgba(255,255,255,0.25)"}
 				borderRadius={"10px"}
 				padding={"20px"}
 				headingText={"Get started with SmartRecs"}
 				headingFontSize={"16px"}
 				headingFontWeight={600}
 				subheadingFontSize={"11.5px"}
 				subheadingMargin={"9px"}
 				subheadingText={"Already have an account?"}
 				subheadingLinkText={"Sign in"}
 				subheadingLink={"/login"}
 				subheadingLinkColor={"#3498db"}
 				inputFontSize={"12px"}
 				inputFontColor={"rgba(0, 0, 0, 1)"}
 				inputPadding={"10px"}
 				inputBorderRadius={"4px"}
 				inputBackgroundColor={"rgba(234, 235, 237, 1)"}
 				inputFocusColor={"#2563EB"}
 				labelFontSize={"12px"}
 				labelMarginTop={"15px"}
 				labelMarginBottom={"6px"}
 				labelFontWeight={500}
 				input0Label={"Username"}
 				input0Placeholder={"Username"}
 				input1Label={"Email"}
 				input1Placeholder={"Email address"}
 				input2Label={"Password"}
 				input2Placeholder={"Password (min. 8 characters)"}
 				showRememberMe={false}
 				rememberMeText={"Remember me"}
 				rememberMeFontSize={"11px"}
 				rememberMeMarginTop={"15px"}
 				showError={""}
 				errorFontSize={"11.5px"}
 				errorFontColor={"#ff0000"}
 				errorFontWeight={"400"}
 				errorMarginTop={"15px"}
 				actionButtonPadding={"11px 16px"}
 				actionMarginTop={"10px"}
 				actionFontSize={"13px"}
 				actionFontColor={"#ffffff"}
 				actionColor1={"#060B17"}
 				actionColor2={"#191D24"}
 				actionBorderRadius={"4px"}
 				actionFontWeight={500}
 				actionLogoMarginRight={"14px"}
 				actionLogoWidth={"15px"}
 				signUpButtonText={"Sign up"}
 				signUpColor1={"#2563EB"}
 				signUpColor2={"#1D4ED8"}
 				signUpFontColor={"#ffffff"}
 				signUpMarginTop={"0px"}
			/>
    </div>
  )
}

export default Signup