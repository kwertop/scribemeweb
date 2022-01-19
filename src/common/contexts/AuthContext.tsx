import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import AdminLoader from '../../components/AdminLoader';

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null
}

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common['token'] = accessToken;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['token'];
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
    default: {
      return { ...state }
    }
  }
}

const AuthContext = createContext({
  ...initialState,
  login: (email: string, password: string) => { console.log("came here man"); Promise.resolve(); },
  logout: () => {},
  register: (email: string, name: string, password?: string, profileImg?: string) => Promise.resolve()
});

interface Props {
  children?: any;
}

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = async (email: string, password: string) => {
    console.log("inside login function");
    const response = await axios.post('http://localhost:3100/login', {
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

  const register = async (email: string, name: string, password?: string, profileImg?: string) => {
    const response = await axios.post('http://localhost:3100/signup', {
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
          const response = await axios.get('http://localhost:3100/profile');
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
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
