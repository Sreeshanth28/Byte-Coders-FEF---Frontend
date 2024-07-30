import React from 'react';
import '../styles/orgCode.css'; // Make sure to import the CSS file

const OrgCode = () => {
    return (
    <div style={{justifyContent:'center', alignItems:'center', display: 'flex', height:'100vh'}}>
      <div className="orgcode-org">
        <p>ORGANIZATION DETAILS</p>
        <input placeholder="Your Organization Code" className="orgcode-input" name="orgCode" type="text" />
        <br />
        <input placeholder="Your Employee ID" className="orgcode-input" name="empId" type="text" />
        <p></p>
        <div className="orgcode-submit-btn orgcode-left-btn">SKIP</div>
        <div className="orgcode-submit-btn orgcode-right-btn">SUBMIT</div>
        <span>If you don't have organization code, Please skip this page</span>
      </div>
    </div>
    );
};

export default OrgCode;
