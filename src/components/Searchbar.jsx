import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';

const Searchbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex gap-2 items-center justify-center">
      <input
        type="text"
        className="border border-mainText text-sm rounded-md p-1 w-3/4"
        placeholder="Search"
        onFocus={(e) => navigate('/search')}
      />
      <button className="bg-mainText text-primaryBg p-1 rounded-md">
        <AiOutlineSearch fontSize={25} />
      </button>
      <button onClick={() => navigate("/create-pin")} className="bg-mainText text-primaryBg p-1 rounded-md">
        <MdAdd fontSize={25} />
      </button>
    </div>
  );
};

export default Searchbar;
