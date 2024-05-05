import React from "react";
import "./SearchInput.css";
export default function SearchInput({height="40px", width="190px", borderRadius="8px", backgroundColor="#f3f3f4", hoverBgColor="#ffffff", fontColor="#0d0c22", placeholderColor="#9e9ea7", borderColor="#3498db", shadowWidth="4px", shadowOpacityPercent=20, iconFillColor="#9e9ea7", onKeyPressCapture=()=>{}, onChange=()=>{}}) {
  return (
    <div className="group">
      <style dangerouslySetInnerHTML={{__html: `
      .group {
 display: flex;
 line-height: 28px;
 align-items: center;
 position: relative;
 width: 100%;
 max-width: ${width};
}

.input32dhf2iufhui3w {
 width: 100%;
 height: ${height};
 line-height: 28px;
 padding: 0 1rem;
 padding-left: 2.5rem;
 border: 2px solid transparent;
 border-radius: ${borderRadius};
 outline: none;
 background-color: ${backgroundColor};
 color: ${fontColor};
 transition: .3s ease;
}

.input32dhf2iufhui3w::placeholder {
 color: ${placeholderColor};
}

.input32dhf2iufhui3w:focus, input:hover {
 outline: none;
 border-color: ${borderColor};
 background-color: ${hoverBgColor};
 box-shadow: 0 0 0 ${shadowWidth} ${borderColor}${shadowOpacityPercent};
}

.icon {
 position: absolute;
 left: 1rem;
 fill: ${iconFillColor};
 width: 1rem;
 height: 1rem;
}
      `}} />
      <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
      <input onChange={onChange} onKeyPress={onKeyPressCapture} placeholder="Search" type="search" className="input32dhf2iufhui3w" />
    </div>
  );
}