import React, { useState } from 'react';
import { NavLink,Navigate } from 'react-router-dom';
import { useAuth, useAuthUser } from '../hooks';
import Brand from "../assets/logo.png";


const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { mutate: login,isSuccess:isLoggedIn } = useAuth();
  const {data} = useAuthUser();
  const { email, password } = values;

  const handleInputChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const submit = () => {
    console.log(values);
    login(values);
  };

  if(data || isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="w-screen bg-mainText h-screen flex items-center justify-center p-2 relative">
      <NavLink to="/" className="absolute top-10 left-10 md:left-4 bg-primaryBg p-2 md:p-1">
          <img src={Brand} alt="brand" className="w-32" />
        </NavLink>
      <div className="shadow-md rounded-md border-2 border-secondaryBg1 form p-4">
        <h1 className="text-xl font-bold text-mainBg">Login</h1>
        <span className="text-sm mt-2 block text-primaryBg">
          Don't have an account? <NavLink to="/register" className="italic underline">Register</NavLink>
        </span>

        <div className="flex flex-col gap-4 mt-4">
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
            <label className="block mb-2 text-mainBg capitalize">password:</label>
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

export default Login;
