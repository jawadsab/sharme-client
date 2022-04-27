import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { closeModal } from '../actions/model';
import { AiOutlineClose } from 'react-icons/ai';
import Brand from "../assets/logo.png";
import {NavLink} from "react-router-dom";

const Model = ({ children }) => {
  const dispatch = useDispatch();
  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(0,0,0,0.3)' }}
    >
      <div className="bg-primaryBg rounded-md shadow-md border-2 border-secondaryBg1 text-mainText h-3/4 sm:h-3/4 relative">
        <div className="absolute top-2 right-0 left-0 flex items-center justify-between p-2 h-8">
          <NavLink to="/">
            <img src={Brand} alt="brand" className="w-32" />
          </NavLink>
          <AiOutlineClose
            fontSize={25}
            className="cursor-pointer"
            onClick={() => dispatch(closeModal())}
          />
        </div>

        {children}
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default Model;
