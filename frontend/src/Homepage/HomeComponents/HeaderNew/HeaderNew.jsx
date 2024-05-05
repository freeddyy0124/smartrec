import React, {useState, useEffect, useRef, useContext} from "react";
import SearchInput from "../SearchInput/SearchInput";
import './HeaderNew.css'
import { AuthContext } from "../../../Contexts/authContextHelper";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";
export default function HeaderNew({
  height = "60px",
  width = "100%",
  padding = "0 20px",
  transitionScreenWidth = "600px",
  backgroundColor = "#ffffff",
  fontFamily = "inherit",
  fontSize = "13px",
  fontColor = "#000000",
  fontWeight = "500",
  logoImageSource = "https://cdn.svgporn.com/logos/cube.svg",
  logoWidth = "100px",
  logoLink = "/",
  logoMarginRight = "14px",
  options = [
    {
      option: "Features",
      link: ""
    },
    {
      option: "Solutions",
      link: ""
    },
    {
      option: "Resources",
      link: ""
    },
    {
      option: "Pricing",
      link: ""
    }
  ],
  optionMarginLeft = "25px",
  actionButtonColor1 = "#7A77FF",
  actionButtonColor2 = "#141446",
  actionButtonPadding = "10px 14px",
  actionButtonLink = "/",
  actionBorderRadius = "20px",
  actionButtonMargin = "0 2px",
  actionFontColor = "#ffffff",
  actionFontSize = "13px",
  actionButtonText = "Start free trial",
  actionButtonFontWeight = 500,
  actionOpenInNew = false,

  closeIconScale = 1,
  closeIconColor = "#121316",
  closeIconMarginLeft = "14px",  
  menuBackgroundColor1 = "#ffffff",
  menuBackgroundColor2 = "#E8F461",
  menuWidth = "180px",
  menuFontSize = "13px",
  menuFontWeight = "500",
  menuFontColor = "#000000",
  menuItemPadding = "12px 12px",
  menuItemBorderColor = "#2d2e33",
  menuItemOpenInNew = false,
  onKeyPressCapture = () => {},
  onChange = () => {}

}) {
  const [optionsOpen, setOptionsOpen] = useState(false)
  const { authenticated, user } = useContext(AuthContext);
  const [userToggle, setUserToggle] = useState(false)
  const [cartToggle, setCartToggle] = useState(false)
    const toggleOptions = (e) => {
    setOptionsOpen(e);
  }


  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          toggleOptions(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <footer className="footerrefun34" style={{width:width, display:"flex", backgroundColor:backgroundColor, position:"relative", height: height, maxHeight: height, boxShadow: "rgba(0, 0, 0, 0.1) 2.4px 2.4px 3.2px"}}>
      <style dangerouslySetInnerHTML={{__html: `
        .footerrefun34{
          font-family: ${fontFamily}
        }

        .button3r78hf23igd23{
          background-color: ${actionButtonColor1};
          cursor: pointer;
          font-family: ${fontFamily};
          font-weight: ${actionButtonFontWeight};
          font-size: ${actionFontSize};
        }

        .button3r78hf23igd23:hover{
          background-color: ${actionButtonColor2};
        }

        .button3r78hf23igd23:active{
          position: relative;
          top: 2px
        }

.linkDiv1238y4r237dgh32gf{
  opacity: 0.85;
}

.linkDiv1238y4r237dgh32gf:hover{
  opacity: 1;
}

.menu-iconqwdj32d293f {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 20px; /* Adjust size as needed */
  height: 14px; /* Adjust size as needed */
  cursor: pointer;
  margin-left: ${closeIconMarginLeft};
  scale: ${closeIconScale};
}

.close-icon3d32rfoi34fj43f {
  display:none;
  width: 20px; /* Adjust size as needed */
  height: 14px; /* Adjust size as needed */
  position: relative;
  cursor: pointer;
  margin-left: ${closeIconMarginLeft};
  scale: ${closeIconScale};
}

.lineDivekjdncwehfw23 {
  width: 100%;
  height: 2px;
  border-radius: 10px;
  background-color: ${closeIconColor};
}

.menuweud23232d{
  display: none
}


        @media (max-width: ${transitionScreenWidth}) {
  .linkDiv1238y4r237dgh32gf {
    display: none;
  }

  .menu-iconqwdj32d293f{
    display: flex;
  }

  .close-icon3d32rfoi34fj43f{
    display: unset;
  }

  .menuweud23232d{
    display: flex
  }
}



.line4r23uihrf23 {
  position: absolute;
  top: calc(50% - 1px);
  width: 100%;
  height: 2px;
  border-radius: 10px;
  background-color: ${closeIconColor}; /* Adjust color as needed */
  transform-origin: center;
}

.line-1ediweidhfe {
  transform: rotate(45deg);
}

.line-2dwbwedewdw {
  transform: rotate(-45deg);
}

.menuItem23iudh23iud{
  background-color: ${menuBackgroundColor1};
  cursor: pointer;
}

.menuItem23iudh23iud:hover{
  background-color: ${menuBackgroundColor2}
}


      `}} />
      <div style={{display:"flex",  height:height, flex:"1", fontSize:fontSize, color:fontColor, alignItems:"center", justifyContent:"space-between", margin:padding, fontWeight:fontWeight}}>
        <a className="logo" style={{marginRight: logoMarginRight, textDecoration:"none", color:"#000"}} href={logoLink} title="" class="flex">
          <span className="logo" style={{fontSize:"32px"}}>SmartRecs</span>
        </a>
        <div style={{display:"flex", alignItems:"center", flex:"1"}}>
          <div style={{display:"flex", alignItems:"center", flex:"1", margin:"0 60px"}}>
            {user?.email ? <SearchInput
            bgthemeColor={"#191A1D"}
            height={"40px"}
            width={"100%"}
            borderRadius={"8px"}
            backgroundColor={"#f3f3f4"}
            hoverBgColor={"#ffffff"}
            fontColor={"#0d0c22"}
            placeholderColor={"#9e9ea7"}
            borderColor={"#3498db"}
            shadowWidth={"4px"}
            shadowOpacityPercent={20}
            iconFillColor={"#9e9ea7"}
            onKeyPressCapture={onKeyPressCapture}
            onChange={onChange}
         />:<div style={{flex:"1"}}></div>}
          </div>
          {!user?.email && <><a href={"/login"} style={{margin:actionButtonMargin, textDecoration:"none"}} ><button className="button3r78hf23igd23" style={{padding:actionButtonPadding, borderRadius:actionBorderRadius, outlineDivekjdncwehfw23:"none", backgroundColor:"#fff", color:"#000", border:"solid 1px", marginRight:"5px"}}>Login</button></a>
          <a href={"/signup"} style={{margin:actionButtonMargin, textDecoration:"none"}} ><button className="button3r78hf23igd23" style={{padding:"11px 15px", borderRadius:actionBorderRadius, border:"none", outlineDivekjdncwehfw23:"none", color:actionFontColor }}>Sign up</button></a></>}
          {
            user?.email && <div onClick={()=>{
              setUserToggle(false)
              setCartToggle(!cartToggle)
            }
            } style={{backgroundColor:"rgba(0,0,0,0.1)", height:"36px", width:"36px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:"500", fontSize:"17px", cursor:"pointer", marginRight:"10px"}}><FaShoppingCart color="#000"/>
              {
                cartToggle === true && <div style={{position:"absolute", right:"5px", top:"75px", zIndex: "2", width:"400px", backgroundColor:"#fff", boxShadow:"rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px", borderRadius:"6px", display:"flex", flexDirection:"column", justifyContent:"space-between", maxHeight:"80vw", overflowY:"scroll"}}>
                  <Cart/>
                </div>
              }
            </div>
          }
          {
            user?.email && <div onClick={()=>{
              setCartToggle(false)
              setUserToggle(!userToggle)
            }} style={{backgroundColor:"#0A7E8E", height:"36px", width:"36px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:"500", fontSize:"17px", cursor:"pointer"}}>{user?.email.slice(0, 1).toUpperCase()}
              {userToggle === true && <div style={{position:"absolute", right:"5px", top:"75px", height:"90px", width:"220px", backgroundColor:"#fff",
              boxShadow:"rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px", borderRadius:"6px", display:"flex", flexDirection:"column", justifyContent:"space-between"
            
            }}>

                <div
                // overflow ellipsis
                style = {{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  padding: "10px",
                  borderBottom: "solid 1px rgba(0,0,0,0.1)",
                  color: "#000",
                  textAlign: "center",
                  fontSize: "14px",
                }}
                >{user.email}</div>
                <a href="/logout" style={{padding: "10px", color: "#fff", textAlign: "center", fontSize: "14px", textDecoration: "none", backgroundColor:"#000", margin:"10px", borderRadius:"4px"}}>Logout</a>
              </div>}
            </div>
          }
          
        </div>
      </div>
      
    </footer>
  );
}