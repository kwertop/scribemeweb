import { useState } from 'react';
import { LoginContainer, FormGroup } from "./styles";
import { LoginProps } from "./types";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from "@mui/material/Button";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { SvgIcon } from "../../common/SvgIcon";
import { FormField } from "../../common/FormField";
import { LoginFooter } from "../../common/LoginFooter";
import { LoginBottomField } from "../../common/LoginBottomField";
import { GoogleLogin } from "react-google-login";
import { createBrowserHistory } from 'history';
import useAuth from "../../common/utils/useAuth";

import { LinkedIn } from 'react-linkedin-login-oauth2';
import MicrosoftLogin from "react-microsoft-login";

const clientId = "696423802540-kdaruhuemo2foec1a0eqj9ortf8egr7n.apps.googleusercontent.com";

const LoginForm = ({id}: LoginProps) => {
  const history: any = createBrowserHistory({ forceRefresh: true });
  const { login, register, isAuthenticated } = useAuth();

  const [ showPassword, setShowPassword ] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);

  if(isAuthenticated) {
    history.push('/dashboard');
    return null;
  }

  const googleIcon = (
    <SvgIcon src="google.svg" width="100%" height="100%" />
  );

  const microsoftIcon = (
    <SvgIcon src="microsoft.svg" width="100%" height="100%" />
  );

  const appleIcon = (
    <SvgIcon src="apple-logo.svg" width="100%" height="100%" />
  );

  const onGoogleSuccess = async (res: any) => {
    console.log('[Login Success] currentUser: ', res.profileObj);
    const profile: any = res.profileObj;
    const email: string = profile.email;
    const name: string = profile.name;
    const profileImg: string = profile.imageUrl;
    const googleId: string = profile.googleId;

    try {
      // const response = await register(email, name, undefined, profileImg);
      // history.push('/dashboard');
    }
    catch(err: any) {
      //show error
    }
  }

  const onGoogleFailure = (res: any) => {
    console.log('[Login Failed] res: ', res);
    //call API to save data or capture event in analytics
  }

  const authHandler = (err: any, data: any) => {
    console.log(err, data);
  };

  const handleLoginFormSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await login(email, password);
      console.log(response);
      history.push('/dashboard');
    } catch (e) {
      console.log(e);
      // setMessage(e.message);
      setLoading(false);
    }
  }

  return (
    <LoginContainer>
      <FormGroup onSubmit={handleLoginFormSubmit}>
        <FormField>
          <GoogleLogin
            clientId={clientId}
            render={renderProps => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={googleIcon}
                variant="outlined"
                style={{textTransform: 'none', width: '80%'}}
              >
                Sign in with Google
              </Button>
            )}
            onSuccess={onGoogleSuccess}
            onFailure={onGoogleFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        </FormField>
        <FormField>
          <LinkedIn
            clientId="78jmaaeeipd7h3"
            redirectUri={`${window.location.origin}/login`}
            onSuccess={(code) => {
              console.log(code);
            }}
            onError={(error) => {
              console.log(error);
            }}
          >
            {({ linkedInLogin }) => (
              <Button
                onClick={linkedInLogin}
                startIcon={appleIcon}
                variant="outlined"
                style={{textTransform: 'none', width: '80%'}}
              >
                Sign in with Apple
              </Button>
            )}
          </LinkedIn>
        </FormField>
        <FormField>
          <MicrosoftLogin
            clientId={"f8c7976f-3e93-482d-88a3-62a1133cbbc3"}
            authCallback={authHandler}
            children={<Button startIcon={microsoftIcon} variant="outlined" style={{textTransform: 'none', width: '312px'}}>Sign in with Microsoft</Button>}
            useLocalStorageCache={true}
            className={"full-width-div"}
          />
        </FormField>
        <Divider>
          OR
        </Divider>
        <FormField>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormField>
        <FormField>
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </FormField>
        <LoginBottomField>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" size="small" />}
            label={<Typography variant="body2" color="textSecondary">Remember me</Typography>}
          />
          <Link href="#" underline="none">Forgot Password?</Link>
        </LoginBottomField>
        <FormField>
          <Button type="submit" variant="contained" color="primary" style={{textTransform: 'none', width: '80%'}}>
            Signin
          </Button>
        </FormField>
        <FormField>
          <Typography variant="body2" color="textSecondary">
            Don't have an account? <Link href="/signup" underline="none">Signup</Link>
          </Typography>
        </FormField>
        <FormField>
          <LoginFooter>
            <Typography variant="caption" color="textSecondary" align="center">
              By using Callr you agree to the <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>
            </Typography>
          </LoginFooter>
        </FormField>
      </FormGroup>
    </LoginContainer>
  );
}

export default LoginForm;