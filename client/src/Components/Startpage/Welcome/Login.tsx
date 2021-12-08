import { Link } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import { ReactComponent as QRLogo } from '../../../Assets/thePerfectestLogo2.svg';
import Lottie from 'react-lottie';
import animationData from '../Assets/loginanimation.json';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLoginMutation } from '../../../generated/graphql';
import { setUser } from '../../../store/actions';

const initUser = {
  email: '',
  password: ''
};

const outerBox =
  'bg-white flex flex-row rounded-sm w-full h-1/2 md:w-10/12 md:h-4/6 lg:w-9/12 items-center shadow-lg m-auto';
const loginStyle =
  'bg-green flex rounded-sm w-full h-full md:w-1/2 flex-col justify-center items-center p-2';
const inputStyle =
  'text-white w-full border-b-2 border-b-white bg-green my-4 placeholder-green-light lg:text-xl';
const signupLink = 'text-white bg-green p-2';
const loginBtn =
  'text-green my-4 bg-white py-1 flex justify-center w-full lg:text-xl hover:bg-green-xlight';
const linkStyle = 'flex text-white justify-center hover:underline';
const lottieStyle = 'md:w-1/2 w-0 invisible md:visible';
const errorStyle = 'w-1/2 xl:w-4/12 flex bg-white h-14 m-auto my-8 text-red';
const logoStyle = 'm-auto w-1/3 lg:h-1/6 lg:w-1/5 xl:h-1/6 xl:w-1/6 mt-8';

const Login: React.FC = () => {
  const [userInfo, setUserInfo] = useState(initUser);
  const [errorMsg, setErrorMsg] = useState('');
  const [, login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {},
  };

  const userChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await login({ credentials: userInfo });
    const queryResult = response.data?.loginUser;
    if (queryResult?.data) {
      dispatch(setUser(queryResult.data));
      if (queryResult?.data?.role === 'TEACHER') navigate('/homepage');
      else if (queryResult?.data?.role === 'STUDENT') navigate('/student');
      setUserInfo(initUser);
    } else if (queryResult?.error) {
      setErrorMsg('Please enter valid inputs.');
      navigate('/login');
    }
  };

  const validateForm = () => {
    return !userInfo.email || !userInfo.password;
  };

  return (
    <div className='flex flex-col justify-center h-screen'>
      <Link to={'/'}>
        <div className={logoStyle}>
          <QRLogo />
        </div>
      </Link>
      <div className={outerBox}>
        <div className={lottieStyle}>
          <Lottie options={defaultOptions} height={400} width={'100%'} />
        </div>
        <div className={loginStyle}>
          <form className='w-full px-4' onSubmit={handleSubmit}>
            <p className='font-bold text-2xl text-white p-2 flex justify-center lg:text-3xl'>
              Welcome back.
            </p>
            <div>
              <input
                value={userInfo.email}
                name='email'
                className={inputStyle}
                placeholder='Email...'
                onChange={userChange}
              />
            </div>
            <div>
              <input
                value={userInfo.password}
                name='password'
                type="password"
                className={inputStyle}
                placeholder='Password...'
                onChange={userChange}
              />
            </div>
            <button
              type='submit'
              disabled={validateForm()}
              className={loginBtn}
            >
              Login
            </button>
          </form>
          <div className={signupLink}>
            <p className=' text-lg lg:text-xl'>Don't have an account?</p>
            <Link to={'/register'} className={linkStyle}>
              {' '}
              Sign up here.
            </Link>
          </div>
        </div>
      </div>
      <footer className={errorStyle}>
        <div className='m-auto text-red sm:text-xl'>{errorMsg}</div>
      </footer>
    </div>
  );
};

export default Login;
