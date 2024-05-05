import React, { useState } from 'react';

const SignUp = ({ 
  onSignUp=()=>{},
  width = "350px",
  fontColor = "#000000",
  fontFamily = "inherit",
  backgroundColor= "#ffffff",
  borderColor = "rgba(255,255,255,0.25)",
  borderRadius = "10px",
  padding = "20px",
  headingText = "Get started with NovaStream",
  headingFontSize = "16px",
  headingFontWeight = 600
,
  subheadingFontSize = "11.5px",
  subheadingMargin = "9px",
  subheadingText = "Don't have an account?",
  subheadingLinkText = "Sign up",
  subheadingLink = "/",
  subheadingLinkColor = "#2563EB"
,
  inputFontSize = "12px",
  inputFontColor = "#000000",
  inputPadding = "10px",
  inputBorderRadius = "4px",
  inputBackgroundColor = "#F9FAFC",
  inputFocusColor = "#2563EB"
,
  labelFontSize = "12px",
  labelMarginTop = "15px",
  labelMarginBottom = "6px",
  labelFontWeight = 500,
  input0Label = "Username",
  input0Placeholder = "Username",
  input1Label = "Email",
  input1Placeholder = "Email address",
  input2Label = "Password",
  input2Placeholder = "Password (min. 8 characters)",

  showRememberMe = true,
  rememberMeText = "Remember me",
  rememberMeFontSize = "11px",
  rememberMeMarginTop = "15px",

  showError = "",
  errorFontSize = "11.5px",
  errorFontColor = "#ff0000",
  errorFontWeight = "500",
  errorMarginTop = "15px",

  actionButtonPadding = "11px 16px",
  actionMarginTop = "10px",
  actionFontSize = "13px",
  actionFontColor = "#000000",
  actionColor1 = "#FFFFFF",
  actionColor2 = "F4F4F4",
  actionBorderRadius = "4px",
  actionFontWeight = 500,
  actionLogoMarginRight = "14px",
  actionLogoWidth = "15px",

  signUpButtonText = "Sign in",
  signUpColor1 = "#2563EB",
  signUpColor2 = "#1D4ED8",
  signUpFontColor = "#ffffff",
  signUpMarginTop = "20px",

  socialLogins
  
}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('');
  const [passwordHidden, setpasswordHidden] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please enter all required fields.');
      return;
    }

    else{
      onSignUp(email, password, remember)
    }
  };

  return (
    <div className="formqwdinn23d2" style={{ padding:"0px", display:"flex", flexDirection:"column", width:width, maxWidth:"calc(100vw - 40px)"}}>
      <style dangerouslySetInnerHTML={{__html: `

        .formqwdinn23d2{
          font-family: ${fontFamily || "inherit"};
          border-radius: ${borderRadius};
          background-color: ${backgroundColor};
          color: ${fontColor};
          box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
        }

        .input238ehd32d2f32{
          font-size: ${inputFontSize};
          color: ${inputFontColor};
          padding: ${inputPadding};
          border: none;
          border-radius: ${inputBorderRadius};
          outline: solid 1px ${borderColor};
          background-color: ${inputBackgroundColor};
        }

        .input238ehd32d2f32:focus{
          outline: solid 1px ${inputFocusColor};
        }

        .passwordivehd232d{
          border-radius: ${inputBorderRadius};
          outline: solid 1px ${borderColor};
          background-color: ${inputBackgroundColor};
        }

        .passwordivehd232d:focus-within{
          outline: solid 1px ${inputFocusColor};
        }
        

        .label2eh23ud2{
          font-size: ${labelFontSize};
          margin-bottom: ${labelMarginBottom};
          margin-top: ${labelMarginTop};
          font-weight: ${labelFontWeight};
        }

        .submitbtni3dun23d{
          margin-top: ${signUpMarginTop};
          margin-bottom: ${actionMarginTop};
          fontSize: ${actionFontSize};
          padding: ${actionButtonPadding};
          border:solid 1px ${borderColor};
          border-radius: ${actionBorderRadius};
          outline: none;
          background-color: ${signUpColor1};
          font-weight: ${actionFontWeight};
          color: ${signUpFontColor};
          cursor: pointer;
        }

        .submitbtni3dun23d:hover{
          background-color: ${signUpColor2};
        }

        .submitgooglbtni3dun23d{
          margin-top: ${actionMarginTop};
          fontSize: ${actionFontSize};
          padding: ${actionButtonPadding};
          border:solid 1px ${borderColor};
          border-radius: ${actionBorderRadius};
          outline: none;
          background-color: ${actionColor1};
          font-weight: ${actionFontWeight};
          color: ${actionFontColor};
          cursor: pointer;
        }

        .submitgooglbtni3dun23d:hover{
          background-color: ${actionColor2};
        }

        .error3dk34edn3jifc3n{
          margin-top: ${errorMarginTop};
          font-size: ${errorFontSize};
          font-weight: ${errorFontWeight};
          margin-left: 1px;
          color: ${errorFontColor};
          
        }

        .headingdiviuf3nc3{
          font-size: ${headingFontSize};
          font-weight: ${headingFontWeight};
        }

        .subheadingdiviuf3nc3{
          font-size: ${subheadingFontSize};
          opacity: 0.8;
          margin-top: ${subheadingMargin};
          margin-bottom: ${subheadingMargin};
        }

        .forgotdivdeoi23f4cn23{
          font-size: ${rememberMeFontSize};
          opacity: 0.85;
          color: ${fontColor};
          text-decoration: none;
        }

        .gg-eye {
          position: relative;
          display: block;
          transform: scale(var(--ggs,1));
          width: 24px;
          height: 18px;
          border-bottom-right-radius: 100px;
          border-bottom-left-radius: 100px;
          overflow: hidden;
          box-sizing: border-box
        }
        .gg-eye::after,
        .gg-eye::before {
            content: "";
            display: block;
            border-radius: 100px;
            position: absolute;
            box-sizing: border-box
        }
        .gg-eye::after {
            top: 2px;
            box-shadow:
                inset 0 -8px 0 1.5px ${fontColor}70,
                inset 0 0 0 1.5px ${fontColor}70;
            width: 24px;
            height: 24px
        }
        .gg-eye::before {
            width: 8px;
            height: 8px;
            border: 2px solid ${fontColor}70;
            bottom: 4px;
            left: 8px
        }


      `}} />
      <div style={{display:"flex", flexDirection:"column", flex:"1", margin:padding}}>
      <form style={{display:"flex", flexDirection:"column"}} onSubmit = {handleSubmit}>
        {headingText.length > 0 && <div className="headingdiviuf3nc3">{headingText}</div>}
        {subheadingText.length > 0 && <div className="subheadingdiviuf3nc3">{subheadingText} <a href={subheadingLink} style={{color: subheadingLinkColor, fontWeight:"500", textDecoration:"none"}}>{subheadingLinkText}</a></div>}
      <div className="inputDivedj23nfcib23" style={{display:"flex", flexDirection:"column"}}>
        <label className="label2eh23ud2">{input1Label}</label>
        <input className="input238ehd32d2f32"
          placeholder={input1Placeholder}
          type="email" 
          value={email} 
          onChange={(e) => {setEmail(e.target.value); setError("")}} 
        />
      </div>
      <div className="inputDivedj23nfcib23" style={{display:"flex", flexDirection:"column"}}>
        <label className="label2eh23ud2">{input2Label}</label>
        <div className="passwordivehd232d" style={{display:"flex"}}>
          <input className="input238ehd32d2f32"
          placeholder={input2Placeholder}
          type={passwordHidden? "password":"text"}
          style={{flex:"1", outline:"none"}}
          value={password} 
          id="password3idn2f"
          onChange={(e) => {setPassword(e.target.value); setError("")}} 
        />
        <div style={{display:"flex", alignItems:"center", marginRight:"8px"}}>
          <span onClick={()=>{setpasswordHidden(!passwordHidden)}} style={{scale:"0.6", marginBottom:"2px", position:"relative", cursor:"pointer"}} className="gg-eye">
            {passwordHidden && <span style={{border:`solid 1.5px ${fontColor}70`, height:"110%", width:"0px", position:"absolute", left:"40%", top:"0%", zIndex:"4", transform: "rotateZ(48deg)"}}></span>}
          </span>
        </div>
        </div>
        <div style={{display:"flex", alignItems:"center", marginTop:rememberMeMarginTop, justifyContent:"space-between"}}>
          {rememberMeText?.length> 0 && showRememberMe === true && <div style={{fontSize:rememberMeFontSize, display:"flex", alignItems:"center", fontWeight:"500"}}><input type="checkbox" onClick={()=>{setRemember(!remember)}}/><span style={{marginLeft:"3px"}}>{rememberMeText}</span></div>}
        </div>
      </div>
      {showError?.length===0 && error && <div className="error3dk34edn3jifc3n">{error}</div>}
      {showError?.length > 0 && <div className="error3dk34edn3jifc3n">{showError}</div>}
      <button style={{fontSize: actionFontSize}} className="submitbtni3dun23d" type="submit">{signUpButtonText}</button>
      </form>
      <div style={{borderTop:`solid 1px ${borderColor}`, margin:`${actionMarginTop} 0`}}></div>
      {socialLogins && socialLogins?.map((e, i)=>{
        return e.onClick ? <button key={i} onClick={e.onClick} style={{display:"flex", alignItems:"center", justifyContent:"flex-start"}} className="submitgooglbtni3dun23d" type="submit">
        <img style={{width:actionLogoWidth, marginRight:actionLogoMarginRight}} src={e.logoLink} alt=""/>
        <span style={{fontSize: actionFontSize}}>{e.text}</span>
      </button> : <button key={i} onClick={()=>{console.log(`Button ${i+1} clicked`)}} style={{display:"flex", alignItems:"center", justifyContent:"flex-start"}} className="submitgooglbtni3dun23d" type="submit">
        <img style={{width:actionLogoWidth, marginRight:actionLogoMarginRight}} src={e.logoLink} alt=""/>
        <span style={{fontSize: actionFontSize}}>{e.text}</span>
      </button>
      })}
      </div>
    </div>
  );
};

export default SignUp;