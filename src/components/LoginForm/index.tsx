import { useState } from 'react';
import { LoginContainer, ButtonContainer, FormGroup } from "./styles";
import { LoginProps } from "./types";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from "@mui/material/Button";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Icon from "@mui/material/Icon";
import Divider from '@mui/material/Divider';
import { SvgIcon } from "../../common/SvgIcon";
import { FormField } from "../../common/FormField";
import { GoogleLogin } from "react-google-login";
import { createBrowserHistory } from 'history';
import useAuth from "../../common/utils/useAuth";

const clientId = "696423802540-kdaruhuemo2foec1a0eqj9ortf8egr7n.apps.googleusercontent.com";

const LoginForm = ({id}: LoginProps) => {
  const history: any = createBrowserHistory({ forceRefresh: true });

  const googleIcon = (
    <SvgIcon src="google.svg" width="100%" height="100%" />
  );

  const onSuccess = (res: any) => {
    console.log('[Login Success] currentUser: ', res.profileObj);
  }

  const onFailure = (res: any) => {
    console.log('[Login Failed] res: ', res);
  }

  const [ showPassword, setShowPassword ] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const { login } = useAuth();

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
              <Button onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={googleIcon} variant="outlined" fullWidth>
                Sign In With Google
              </Button>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
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
        <FormField>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        </FormField>
        <FormField>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </FormField>
      </FormGroup>
    </LoginContainer>
  );
}

export default LoginForm;