import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Item from './Item';
import { useAuthUser, useCreatePin } from '../hooks';
import { categories } from '../data';

const CreatePin = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pinImage, setPinImage] = useState(null);
  const [category, setCategory] = useState('');

  const [displayImage, setDisplayImage] = useState(null);
  const { data: authData, isLoading } = useAuthUser();
  const successCallback = () => {
    setTitle('');
    setDescription('');
    setPinImage(null);
    setDisplayImage(null);
    setCategory('');
  };

  const { mutate: save } = useCreatePin(successCallback);

  if (isLoading) return <h1>Loading...</h1>;

  const uploadImage = (e) => {
    const { type } = e.target.files[0];
    if (
      type === 'image/png' ||
      type === 'image/svg' ||
      type === 'image/jpeg' ||
      type === 'image/gif' ||
      type === 'image/tiff'
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setDisplayImage(reader.result);
          setPinImage(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.log('Error uploading');
    }
  };
  const submit = (e) => {
    const bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('description', description);
    bodyFormData.append('image', pinImage);
    bodyFormData.append('category', category);

    if (title && description && pinImage && category && category !== 'select') {
      //   dispatch(createPin(bodyFormData, navigate));
      save(bodyFormData);
    }
  };
  return (
    <div>
      <div className="mt-4 p-2 rounded-md bg-primaryBg border shadow-md w-full flex gap-2 md:flex-col md:h-screen">
        <input
          onChange={uploadImage}
          type="file"
          className="hidden"
          id="create-pin"
        />
        {!displayImage ? (
          <label
            htmlFor="create-pin"
            className="basis-1/2 rounded-lg bg-mainBg text-mainText p-2 h-96 cursor-pointer"
          >
            <div className="h-full w-full border rounded-lg flex flex-col justify-evenly">
              <div className="flex items-center flex-col">
                <AiOutlineCloudUpload fontSize={25} />
                <p className="text-sm">Click here to upload</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold">Recommendation: Use High Quality</p>
              </div>
            </div>
          </label>
        ) : (
          <div className="relative h-96 basis-1/2">
            <img
              src={displayImage}
              alt="..."
              className="h-full w-full object-cover"
            />
            <button
              className="absolute bottom-3 right-3 p-3 rounded-full bg-secondaryBg1 text-mainText text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
              onClick={(e) => {
                setDisplayImage(null);
                setPinImage(null);
              }}
            >
              <MdDelete />
            </button>
          </div>
        )}
        <div className="basis-1/2 p-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            type="text"
            className="outline-none text-2xl sm:text-3xl font-bold border-secondaryBg1 p-2 text-mainText border-b-2 w-full"
          />
          <Item
            to={`/user-profile/${authData.data.user._id}`}
            src={authData.data.user.profileImage}
            alt={authData.data.user.username}
            name={authData.data.user.username}
            classes="flex items-center gap-1 text-sm mt-4 font-semibold"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="What is your pin about?"
            className="outline-none text-mainText text-base sm:text-lg font-bold border-secondaryBg1 p-2 border-b-2 w-full"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl w-full">
                Choose Pin category
              </p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-secondaryBg1 p-2 rounded-md cursor-pointer"
              >
                <option value="select" className="bg-white">
                  Select Category
                </option>
                {categories.map((category) => {
                  return (
                    <option
                      value={category.name}
                      key={category.key}
                      className="text-base border-0 outline-none bg-white text-black"
                    >
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button onClick={submit} className="bg-secondaryBg1 font-semibold text-mainText p-2 rounded-md">
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
