import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const onSuccess = (response) => {
    console.log('Login Success: currentUser:', response.profileObj);
    navigate('/dashboard');
  };

  const onFailure = (response) => {
    console.log('Login failed: res:', response);
  };

  return (
    <GoogleLogin
      clientId="" // usunięte
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
