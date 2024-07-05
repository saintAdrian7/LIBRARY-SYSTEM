import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import axios from 'axios';
import { User, LoginUserPayload, RegisterUserPayload, FetchUserPayload } from '../models/User';

interface AuthenticationSliceState {
  loggedInUser: User | undefined;
  profileUser: User | undefined;
  displayLogin: boolean;
  loading: boolean;
  error: boolean;
  registerSuccess: boolean;
}

type Action =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'REGISTER_REQUEST' }
  | { type: 'REGISTER_SUCCESS' }
  | { type: 'REGISTER_FAILURE' }
  | { type: 'LOG_OUT' }
  | { type: 'HIDE_MODAL' }
  | { type: 'RESET_REGISTER_SUCCESS' }
  | { type: 'FETCH_USER_REQUEST' }
  | { type: 'FETCH_USER_SUCCESS'; payload: { user: User; property: string } }
  | { type: 'FETCH_USER_FAILURE' }
  | { type: 'RESET_USER'; payload: string }
  | { type: 'UPDATE_USER_REQUEST' }
  | { type: 'UPDATE_USER_SUCCESS'; payload: User }
  | { type: 'UPDATE_USER_FAILURE' };

const initialState: AuthenticationSliceState = {
  loggedInUser: undefined,
  profileUser: undefined,
  displayLogin: false,
  loading: false,
  error: false,
  registerSuccess: false,
};

const AuthContext = createContext<{
  state: AuthenticationSliceState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const authReducer = (state: AuthenticationSliceState, action: Action): AuthenticationSliceState => {
  switch (action.type) {
    case 'RESET_REGISTER_SUCCESS':
      return { ...state, registerSuccess: false };
    case 'REGISTER_REQUEST':
      return { ...state, loading: true, error: false, registerSuccess: false };
    case 'REGISTER_SUCCESS':
      return { ...state, loading: false, displayLogin: true, registerSuccess: true, error: false };
    case 'REGISTER_FAILURE':
      return { ...state, loading: false, error: true, registerSuccess: false };
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: false };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, displayLogin: false, registerSuccess: true, loggedInUser: action.payload };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: true };
    case 'HIDE_MODAL':
      return { ...state, displayLogin: false };
    case 'LOG_OUT':
      return { ...state, loggedInUser: undefined, displayLogin: true, loading: false, error: false };
    case 'FETCH_USER_REQUEST':
      return { ...state, loading: true, error: false };
    case 'FETCH_USER_SUCCESS':
      return { ...state, loading: false, [action.payload.property]: action.payload.user, error: false };
    case 'FETCH_USER_FAILURE':
      return { ...state, loading: false, error: true };
    case 'RESET_USER':
      return { ...state, [action.payload]: undefined };
    case 'UPDATE_USER_REQUEST':
      return { ...state, error: false, loading: true };
    case 'UPDATE_USER_SUCCESS':
      return { ...state, error: false, loading: false, loggedInUser: action.payload, profileUser: action.payload };
    case 'UPDATE_USER_FAILURE':
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const fetchUser = async (dispatch: React.Dispatch<Action>, payload: FetchUserPayload) => {
  dispatch({ type: 'FETCH_USER_REQUEST' });
  try {
    const response = await axios.get(`http://localhost:4000/users/${payload.userId}`);
    const user = response.data.user;
    dispatch({ type: 'FETCH_USER_SUCCESS', payload: { user, property: payload.property } });
  } catch (error) {
    dispatch({ type: 'FETCH_USER_FAILURE' });
    throw error;
  }
};

export const loginUser = async (dispatch: React.Dispatch<Action>, user: LoginUserPayload) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await axios.post('http://localhost:4000/auth/login', user);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
    localStorage.setItem("userId", response.data.user._id);
    console.log(response.data.user);
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE' });
    throw error;
  }
};

export const logoutUser = (dispatch: React.Dispatch<Action>) => {
  localStorage.removeItem("userId");
  dispatch({ type: 'LOG_OUT' });
};

export const registerUser = async (dispatch: React.Dispatch<Action>, user: RegisterUserPayload) => {
  dispatch({ type: 'REGISTER_REQUEST' });
  try {
    const response = await axios.post('http://localhost:4000/auth/register', user);
    dispatch({ type: 'REGISTER_SUCCESS' });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE' });
    throw error;
  }
};

export const resetUser = (dispatch: React.Dispatch<Action>, property: string) => {
  dispatch({ type: 'RESET_USER', payload: property });
};

export const updateUser = async (dispatch: React.Dispatch<Action>, payload: User) => {
  dispatch({ type: 'UPDATE_USER_REQUEST' });
  try {
    const response = await axios.put(`http://localhost:4000/users`, payload);
    const updatedUser = response.data.user;
    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: updatedUser });
    console.log(updatedUser);
  } catch (error) {
    dispatch({ type: 'UPDATE_USER_FAILURE' });
    throw error;
  }
};
