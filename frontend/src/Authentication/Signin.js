import React, { useContext } from 'react'
import SignIn from './SignIn/SignIn'
import { AuthContext } from '../Contexts/authContextHelper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signin() {
    const { login } = useContext(AuthContext); // Extract signup function from context
    const navigate = useNavigate();

    const onSubmit = async (email, password) => {
        try {
            // Display a toast for the pending signup process
            await toast.promise(
                login(email, password), // Directly pass the signup promise to toast.promise
                {
                    pending: 'Signing in...',
                    success: 'Signed in! Redirecting...',
                    error: 'Error signing in'
                }
            );

            // Navigate after the toast for success is shown
            setTimeout(() => { navigate("/"); navigate(0); }, 1500); // Consider increasing timeout to let user read the message
        } catch (error) {
            // Handle errors not caught by toast.promise
            if (error?.response?.data?.errors) error?.response?.data?.errors.forEach((err) => {
                toast.error(err.message, { autoClose: 1500 })
              });
            if(error.response.data?.error){
                toast.error(error.response.data.error, { autoClose: 1500 })
            }
        }
    };
  return (
    <div style={{height:"100vh", width:"100vw", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <SignIn
 				bgthemeColor={"#191A1D"}
 				onSignIn={onSubmit}
 				width={"350px"}
 				fontColor={"#000000"}
 				backgroundColor={"#ffffff"}
 				borderColor={"rgba(0,0,0,0.15)"}
 				borderRadius={"10px"}
 				padding={"20px"}
 				headingText={"Login to SmartRecs"}
 				headingFontSize={"16px"}
 				headingFontWeight={600}
 				subheadingFontSize={"11.5px"}
 				subheadingMargin={"9px"}
 				subheadingText={"Don't have an account?"}
 				subheadingLinkText={"Sign up"}
 				subheadingLink={"/signup"}
 				subheadingLinkColor={"#2563EB"}
 				inputFontSize={"12px"}
 				inputFontColor={"#000000"}
 				inputPadding={"10px"}
 				inputBorderRadius={"4px"}
 				inputBackgroundColor={"#F9FAFC"}
 				inputFocusColor={"#2563EB"}
 				labelFontSize={"12px"}
 				labelMarginTop={"15px"}
 				labelMarginBottom={"6px"}
 				labelFontWeight={500}
 				input1Label={"Email"}
 				input1Placeholder={"Email address"}
 				input2Label={"Password"}
 				input2Placeholder={"Password (min. 8 characters)"}
 				showRememberMe={true}
 				rememberMeText={"Remember me"}
 				rememberMeFontSize={"11px"}
 				rememberMeMarginTop={"15px"}
 				forgotPasswordLink={"/"}
 				showError={""}
 				errorFontSize={"11.5px"}
 				errorFontColor={"#ff0000"}
 				errorFontWeight={"500"}
 				errorMarginTop={"15px"}
 				actionButtonPadding={"11px 16px"}
 				actionMarginTop={"10px"}
 				actionFontSize={"13px"}
 				actionFontColor={"#000000"}
 				actionColor1={"#FFFFFF"}
 				actionColor2={"#F4F4F4"}
 				actionBorderRadius={"4px"}
 				actionFontWeight={500}
 				actionLogoMarginRight={"14px"}
 				actionLogoWidth={"15px"}
 				signInButtonText={"Sign in"}
 				signInColor1={"#2563EB"}
 				signInColor2={"#1D4ED8"}
 				signInFontColor={"#ffffff"}
 				signInMarginTop={"20px"}
			/>
    </div>
  )
}

export default Signin