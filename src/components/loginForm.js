import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginForm.css';
import '../styles/orgCode.css';

const LoginForm = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showOrgDetails, setShowOrgDetails] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        orgCode: '',
        empId: ''
    });
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setShowOrgDetails(false);
    };

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignUp && !showOrgDetails) {
            setShowOrgDetails(true);
        } else {
            await submitData(
                {
                    email: formData.email,
                    loginPassword: formData.password,
                    orgId: formData.orgCode,
                    empId: formData.empId,
                    paymentPin: '',
                    Address: ''
                },
                isSignUp ? 'signup' : 'signin'
            );
        }
    };

    const handleSkip = async () => {
        await submitData({
            email: formData.email,
            loginPassword: formData.password,
            orgId: '',
            empId: '',
            paymentPin: '',
            Address: ''
        }, 'signup');
    };

    const submitData = async (data, type) => {
        try {
            let response;
            if (type === 'signup') {
                response = await fetch(`http://127.0.0.1:8000/createnewuser/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            } else {
                response = await fetch(`http://127.0.0.1:8000/login/?email=${data.email}&loginPassword=${data.loginPassword}`);
            }

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                if (type === 'signup') {
                    sessionStorage.setItem("email", data.email);
                    navigate('/details');
                } else {
                    console.log(responseData);
                    sessionStorage.setItem("bnplId", responseData.bnplId);
                    sessionStorage.setItem("email", responseData.email);
                    sessionStorage.setItem("empId", responseData.empId);
                    sessionStorage.setItem("orgId", responseData.orgId);
                    navigate('/dashboard');
                }
            } else {
                // Handle error
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{justifyContent:'center', alignItems:'center', display: 'flex', height:'100vh'}}>
            {!showOrgDetails ? (
                <form onSubmit={handleSubmit} className="login-form_main">
                    <p className="login-heading">{isSignUp ? 'SignUp' : 'SignIn'}</p>
                    <div className="login-inputContainer">
                        <svg className="login-inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
                            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                        </svg>
                        <input type="email" className="login-inputField" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    
                    <div className="login-inputContainer">
                        <svg className="login-inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                        </svg>
                        <input type="password" className="login-inputField" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                    </div>
                    
                    <button id="login-button" type="submit" style={{background: isSignUp ? 'linear-gradient(40deg, #8983F7, #A3DAFB 70%)' : 'linear-gradient(40deg, #FF0080,#FF8C00 70%)'}}>
                        {isSignUp ? 'Next' : 'Submit'}
                    </button>
                    <a className="login-forgotLink" href="##">{isSignUp ? '(:: Terms and conditions ::)' : 'Forgot your password?'}</a>
                </form>
            ) : (
                <div className="orgcode-org">
                    <p>ORGANIZATION DETAILS</p>
                    <input placeholder="Your Organization Code" className="orgcode-input" name="orgCode" type="text" value={formData.orgCode} onChange={handleInputChange} />
                    <br />
                    <input placeholder="Your Employee ID" className="orgcode-input" name="empId" type="text" value={formData.empId} onChange={handleInputChange} />
                    <p></p>
                    <div className="orgcode-submit-btn orgcode-left-btn" onClick={handleSkip}>SKIP</div>
                    <div className="orgcode-submit-btn orgcode-right-btn" onClick={handleSubmit}>SUBMIT</div>
                    <span>If you don't have organization code, Please skip this page</span>
                </div>
            )}

            <input id="login-checkbox_toggle" type="checkbox" className="login-check" checked={isSignUp} onChange={toggleForm}/>
            <div className="login-checkbox">
                <label className="login-slide" htmlFor="login-checkbox_toggle">
                    <label className="login-toggle" htmlFor="login-checkbox_toggle"></label>
                    <label className="login-text" htmlFor="login-checkbox_toggle">SignIn</label>
                    <label className="login-text" htmlFor="login-checkbox_toggle">SignUp</label>
                </label>
            </div>
        </div>
    );
};

export default LoginForm;
