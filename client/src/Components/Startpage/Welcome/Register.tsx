import { useState } from 'react';
import React from 'react';
import { useRegisterMutation } from '../../../generated/graphql';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/actions';
import { useNavigate } from 'react-router';
import Lottie from 'react-lottie';
import animationData from '../Assets/welcome.json';


const initUser = {
  name: '',
  lastname: '',
  email: '',
  password: '',
  role: '',
};

const registerStyle = "bg-green flex rounded-sm xl:w-4/12 w-1/2 m-auto flex-col justify-center items-center shadow-lg";
const inputStyle = "text-white w-full border-b-2 border-b-white bg-green my-2 py-2 placeholder-green-light";
const continueBtn = "text-green my-2 bg-white p-2 flex justify-center my-4";
const selector = "text-green my-2 bg-white p-3 my-4 flex justify-center";
const lottieStyle = "invisible md:visible h-24 md:h-full";

const Register: React.FC = () => {
  const [userInfo, setUserInfo] = useState(initUser);
  const [, register] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {}
  };

  const validateForm = () => {
    return (
      !userInfo.name ||
      !userInfo.lastname ||
      !userInfo.email ||
      !userInfo.password ||
      !userInfo.role
    );
  };

  const userChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await register({ user: userInfo });
    const queryResult = response.data?.registerUser;
    if (queryResult?.data) dispatch(setUser(queryResult.data));
    else if (queryResult?.error) { } //TODO handle error
    if (queryResult?.data?.role === 'TEACHER') navigate('/homepage');
    else if (queryResult?.data?.role === 'STUDENT') navigate('/student');
    setUserInfo(initUser);
  };

  return (
    <div>
      <div className={lottieStyle}>
        <Lottie options={defaultOptions}
          height={250}
          width={'100%'}
        />
      </div>
      <div className={registerStyle}>
        <h1 className='p-4 text-white text-xl xl:text-2xl'>Register</h1>
        <form className='w-full px-4' onSubmit={handleSubmit}>
          <div>
            <input
              required
              name='name'
              value={userInfo.name}
              className={inputStyle}
              placeholder='First Name'
              onChange={userChange}
            />
          </div>
          <div>
            <input
              required
              name='lastname'
              value={userInfo.lastname}
              className={inputStyle}
              placeholder='Last Name'
              onChange={userChange}
            />
          </div>
          <div>
            <input
              required
              name='email'
              value={userInfo.email}
              className={inputStyle}
              placeholder='Email'
              onChange={userChange}
            />
          </div>
          <div>
            <input
              required
              name='password'
              value={userInfo.password}
              className={inputStyle}
              placeholder='Password'
              onChange={userChange}
            />
          </div>
          <div className={selector}>
            <select
              className='bg-white'
              name='role'
              value={userInfo.role}
              onChange={userChange}
              required
            >
              <option hidden value='default'>
                Select Role
              </option>
              <option value='TEACHER'>Teacher</option>
              <option value='STUDENT'>Student</option>
            </select>
          </div>
          <div className={continueBtn}>
            <button type='submit' disabled={validateForm()}>
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
