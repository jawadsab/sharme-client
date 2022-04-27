import React, { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { useRegister } from '../hooks';
import Brand from '../assets/logo.png';

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { mutate: register, isError, error, isSuccess } = useRegister();
  const { username, email, password } = values;

  const handleInputChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const submit = () => {
    console.log(values);
    register(values);

    setValues({ ...values, username: '', email: '', password: '' });
  };

  if (isSuccess) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center p-2 bg-mainText relative">
      <NavLink
        to="/"
        className="absolute top-10 left-10 md:left-4 bg-primaryBg p-2 md:p-1"
      >
        <img src={Brand} alt="brand" className="w-32" />
      </NavLink>
      <div className="shadow-md rounded-md border-2 border-secondaryBg1 form p-4">
        <h1 className="text-xl font-bold text-mainBg">Register</h1>
        <span className="text-sm mt-2 block text-primaryBg">
          Already have an account?{' '}
          <NavLink to="/login" className="italic underline">
            Login
          </NavLink>
        </span>
        {isError && (
          <div className="rounded-md w-full border text-xs p-1 mt-2">
            {error.response.data.error}
          </div>
        )}
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <label className="block mb-2 text-mainBg capitalize">
              username:
            </label>
            <input
              autoComplete="off"
              onChange={handleInputChange('username')}
              value={username}
              name="username"
              placeholder="minimum 4 characters"
              type="text"
              className="border w-full p-2 bg-mainBg text-mainText font-semibold border-1 border-secondaryBg1 rounded-md outline-none px-1"
            />
          </div>
          <div>
            <label className="block mb-2 text-mainBg capitalize">email:</label>
            <input
              autoComplete="off"
              onChange={handleInputChange('email')}
              value={email}
              name="email"
              placeholder="johndoe@email.com"
              type="email"
              className="border w-full p-2 bg-mainBg text-mainText font-semibold border-1 border-secondaryBg1 rounded-md outline-none px-1"
            />
          </div>
          <div>
            <label className="block mb-2 text-mainBg capitalize">
              password:
            </label>
            <input
              autoComplete="off"
              onChange={handleInputChange('password')}
              value={password}
              name="password"
              placeholder="minumum 8 characters"
              type="password"
              className="border w-full p-2 bg-mainBg text-mainText font-semibold border-1 border-secondaryBg1 rounded-md outline-none px-1"
            />
          </div>
        </div>
        <button
          onClick={submit}
          className="w-full mt-8 border-2 border-mainBg hover:bg-secondaryBg1 hover:text-mainText hover:border-mainText text-mainBg py-2 px-1 rounded-md shadow-sm font-semibold tansition-all duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Register;
