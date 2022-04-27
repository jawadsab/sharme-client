import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useAuthUser,
  useUser,
  useCreatedPins,
  useSavedPins,
  useEditProfile,
} from '../hooks';
import { useQueryClient } from 'react-query';
import { FiLogOut } from 'react-icons/fi';
import MasonaryLayout from './MasonryLayout';
import { MdEdit } from 'react-icons/md';

const randomImage =
  'https://source.unsplash.com/1200x800/?nature,photography,technology';

const UserProfile = () => {
  const [text, setText] = useState('Created');
  const activeBtnStyles =
    'text-primaryBg bg-secondaryBg1 p-2 rounded-md shadow-md font-semibold';
  const notActiveBtnStyles =
    'text-mainText rounded-md p-2 border-2 border-secondaryBg1 font-semibold';
  const { userId } = useParams();
  const { data: authData } = useAuthUser();
  const { isLoading, data: userData, isError, error } = useUser(userId);
  const { data: createdPins } = useCreatedPins(userId, text);
  const { data: savedPins } = useSavedPins(userId, text);
  const { mutate: edit } = useEditProfile(userId);
  console.log('savedPins pins', savedPins);
  const queryClient = useQueryClient();
  console.log(userData);
  const logout = () => {
    console.log('logout');
    localStorage.removeItem('auth');
    queryClient.setQueryData('auth-user', null);
    console.log('AuthData', authData);
  };
  const [profileImage, setProfileImage] = useState(null);

  const authProfile = () => {
    if (authData?.data.user._id === userId) {
      return (
        <div className="absolute text-mainText bg-secondaryBg1 cursor-pointer bg-onPrimary p-2 rounded-full top-2 right-2">
          <FiLogOut onClick={logout} fontSize={25} />
        </div>
      );
    }

    return null;
  };

  const uploadImage = (e) => {
    console.log('Uploading....');
    const { type } = e.target.files[0];
    if (type === 'image/png' || type === 'image/jpeg'|| type === "image/jpg") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImage(e.target.files[0]);

          const bodyFormData = new FormData();
          console.log(profileImage);
          bodyFormData.append('image', profileImage);
          edit(bodyFormData);
        }
      };
      console.log(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.log('Error uploading');
    }
  };

  const isEdit = () => {
    if (authData?.data.user._id === userId) {
      return (
        <>
          <label htmlFor="profile">
            <MdEdit
              fontSize={25}
              className="absolute -right-4 cursor-pointer -top-4 text-secondaryBg1"
            />
          </label>
          <input
            name="profile-image"
            onChange={uploadImage}
            type="file"
            id="profile"
            className="hidden"
          />
        </>
      );
    }

    return null;
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  return (
    <div>
      <div className="w-full h-96 bg-secondary relative">
        <img
          src={randomImage}
          alt="random"
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col items-center gap-2 left-1/2 -translate-x-1/2 -bottom-16">
          <div className="relative">
            {isEdit()}
            <img
              src={userData?.data.user.profileImage}
              alt="profile"
              className="w-20 h-20 rounded-full"
            />
          </div>
          <div>
            <p className="text-3xl font-bold">{userData?.data.user.username}</p>
          </div>
        </div>
        {authData && authProfile()}
      </div>
      <div className="w-full pt-24">
        <div className="flex gap-4 items-center justify-center">
          <button
            onClick={() => setText('Created')}
            className={
              text === 'Created' ? activeBtnStyles : notActiveBtnStyles
            }
          >
            Created
          </button>
          <button
            onClick={() => setText('Saved')}
            className={text === 'Saved' ? activeBtnStyles : notActiveBtnStyles}
          >
            Saved
          </button>
        </div>
        <div className="px-2 mt-8">
          <MasonaryLayout
            pins={
              text === 'Created' ? createdPins?.data.pins : savedPins?.data.pins
            }
            created={text === 'Created' ? true : false}
            loggedIn={authData ? true : false}
            loggedInID={authData ? authData?.data.user._id : null}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
