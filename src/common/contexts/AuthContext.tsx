import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import AdminLoader from '../../components/AdminLoader';
import { API_ENDPOINT } from '../../constants';

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null
}

const setSession = (accessToken: string | null) => {
  let name = 'buckbeak-access-token';
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common['token'] = accessToken;
    let date = new Date();
    date.setTime(date.getTime() + (365*24*60*60*1000));
    let expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (accessToken || "")  + expires + "; path=/";
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['token'];
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      }
    }
    case 'LOGIN': {
      const { user } = action.payload

      return {
        ...state,
        isAuthenticated: true,
        user
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    }
    case 'REGISTER': {
      const { user } = action.payload

      return {
        ...state,
        isAuthenticated: true,
        user
      }
    }
    case 'PROFILE_UPDATE': {
      const { user } = action.payload

      return {
        ...state,
        user
      }
    }
    default: {
      return { ...state }
    }
  }
}

const AuthContext = createContext({
  ...initialState,
  login: (email: string, password: string) => { console.log("came here man"); Promise.resolve(); },
  logout: () => {},
  register: (email: string, name: string, password?: string, profileImg?: string) => Promise.resolve(),
  updateProfile: (name: string) => Promise.resolve()
});

interface Props {
  children?: any;
}

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = async (email: string, password: string) => {
    console.log("inside login function");
    const response = await axios.post(`${API_ENDPOINT}/login`, {
      email,
      password
    });

    console.log(response.data);
    const { token, user } = response.data;

    setSession(token);

    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  }

  const updateProfile = async (name: string) => {
    const response = await axios.post(`${API_ENDPOINT}/profile/update`, {
      fullName: name
    });

    console.log(response.data);
    const { user } = response.data;

    dispatch({
      type: 'PROFILE_UPDATE',
      payload: {
        user
      }
    });
  }

  const register = async (email: string, name: string, password?: string, profileImg?: string) => {
    const response = await axios.post(`${API_ENDPOINT}/signup`, {
      email,
      password,
      name,
      profileImg
    });

    const { token, user } = response.data;

    setSession(token);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  }

  const logout = () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  }

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')

        if (accessToken) {
          setSession(accessToken);
          const response = await axios.get(`${API_ENDPOINT}/profile`);
          const { user } = response.data;

          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: true,
              user,
            }
          });
        } else {
          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: false,
            user: null,
          }
        });
      }
    })()
  }, []);

  if (!state.isInitialised) {
    return <AdminLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
