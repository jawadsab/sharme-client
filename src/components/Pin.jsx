import React, { useState } from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { useNavigate, NavLink } from 'react-router-dom';
import Item from './Item';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import Model from './Model';

import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../actions/model';
import { useAuthUser, useDeletePin, useSavePin } from '../hooks';
import { useQueryClient } from 'react-query';

import { MdDelete } from 'react-icons/md';

const Pin = ({ pin, created, loggedIn, loggedInID }) => {
  const queryClient = useQueryClient();
  const { postedBy } = pin;
  console.log(postedBy);
  const [pinHovered, setPinHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { model } = useSelector((state) => state);

  const { data: authData } = useAuthUser();
  const successCallback = () => {
    console.log(postedBy._id);
    queryClient.invalidateQueries(['createdPins', postedBy._id]);
  };
  const { mutate: deletePin } = useDeletePin(successCallback);
  const { mutate: savePin } = useSavePin();
  console.log(useAuthUser());

  const bookMarkPin = (e) => {
    if (!authData) {
      dispatch(openModal());
    } else {
      
      savePin(pin._id);
    }
    console.log('Boo ma');
  };

  const isSaved = () => {
    if (authData) {
      const { data: response } = authData;
      const { user } = response;

      const saves = pin?.saves;
      console.log(saves);
      return saves.includes(user._id);
    }

    return false;
  };

  const deletePinUI = () => {
    if (created) {
      if (loggedIn) {
        const postedBy = pin?.postedBy._id;
        if (postedBy === loggedInID) {
          return (
            <MdDelete
              onClick={(e) => {
                e.stopPropagation();
                deletePin(pin?._id);
              }}
              className="text-secondaryBg1 cursor-pointer"
              fontSize={25}
            />
          );
        }
      }
      return null;
    }
  };

  return (
    <div className="mt-2">
      <div
        onMouseEnter={() => setPinHovered(true)}
        onMouseLeave={() => setPinHovered(false)}
        onClick={() => navigate(`/pin-details/${pin._id}`)}
        className="relative cursor-zoom-in w-auto overflow-hidden transition-all duration-300 ease-in-out"
      >
        <img
          src={pin.pinImage}
          alt={pin.category}
          className="rounded-md w-full"
        />
        {pinHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-auto justify-between p-1 pr-2 pt-2 pb-2 z-30"
            style={{ height: '100%' }}
          >
            <div className="flex gap-2">
              <a
                href={`${pin.pinImage}?dl=`}
                download
                onClick={(e) => e.stopPropagation}
                className="bg-primaryBg w-8 h-8 rounded-full flex items-center justify-center text-onPrimary text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <AiOutlineCloudDownload />
              </a>
            </div>
            {deletePinUI()}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center pt-2">
        <Item
          to={`/user-profile/${postedBy._id}`}
          src={postedBy.profileImage}
          alt={postedBy.username}
          name={postedBy.username}
          classes="flex items-center gap-1 text-sm font-semibold"
        />
        <div className="flex items-center gap-1 text-sm">
          <div className="flex gap-1 items-center">
            <span className="font-semibold">{pin.saves.length}</span>
            {!authData ? (
              <BsBookmark onClick={bookMarkPin} className="cursor-pointer" />
            ) : isSaved() ? (
              <BsBookmarkFill
                onClick={bookMarkPin}
                className="cursor-pointer text-secondaryBg1"
              />
            ) : (
              <BsBookmark onClick={bookMarkPin} className="cursor-pointer" />
            )}
            {/* {!isAuthenticated ? (
              <BsBookmark onClick={bookMarkPin} className="cursor-pointer" />
            ) : (
              <BsBookmarkFill className="cursor-pointer text-secondary" />
            )} */}
          </div>
        </div>
      </div>
      {model.open ? (
        <Model>
          <div className="mt-24 p-2">
            <div className="border text-center border-2 border-dashed p-1">
              To bookmark a pin, please create an acount
            </div>
            <div className="h-full flex flex-col gap-4 mt-2">
              <h1 className="text-center font-semibold">Create an Account</h1>
              <div className="flex flex-col justify-evenly items-center">
                <NavLink
                  className="bg-secondaryBg1 text-mainBg rounded-md shadow-md w-full block p-2 text-center"
                  to="/register"
                >
                  Register
                </NavLink>
              </div>
              <h1 className="text-center italic font-semibold">
                Already have an account ?{' '}
              </h1>
              <div>
                <NavLink
                  className="bg-mainText text-mainBg rounded-md shadow-md w-full block p-2 text-center"
                  to="/login"
                >
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        </Model>
      ) : null}
    </div>
  );
};
export default Pin;
