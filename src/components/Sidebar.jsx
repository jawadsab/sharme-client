import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdHome } from 'react-icons/md';
import { categories } from '../data';
import Item from './Item.jsx';
import Searchbar from './Searchbar';
import { useAuthUser } from '../hooks';
import Brand from "../assets/logo.png";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { data: authData } = useAuthUser();
  const sidebarClass = open
    ? 'bg-primaryBg text-mainText w-48 z-40 fixed top-0 bottom-0 transition-transform duration-300 sm:translate-x-0'
    : 'bg-primaryBg text-mainText w-48 z-40 fixed top-0 bottom-0 transition-transform duration-300 sm:-translate-x-full';
  return (
    <>
      <nav className="bg-primaryBg sticky z-50 top-0 w-screen p-2 h-12 flex items-center justify-between gap-2">
        <GiHamburgerMenu
          onClick={() => setOpen(!open)}
          fontSize={25}
          className="cursor-pointer hidden sm:block"
        />
        <NavLink to="/">
          <img src={Brand} alt="brand" className="w-32" />
        </NavLink>
        <div className="w-full sm:hidden">
          <Searchbar />
        </div>
        {!authData ? (
          <div>
            <NavLink
              className="bg-secondaryBg1 text-primaryText font-semibold p-2 rounded-md sm:text-sm"
              to="/login"
            >
              Login
            </NavLink>
          </div>
        ) : (
          <Item
            src={authData?.data.user.profileImage}
            alt="profile"
            to={`/user-profile/${authData?.data.user._id}`}
          />
        )}
      </nav>
      <div className={sidebarClass}>
        <NavLink
          to="/"
          className="border-secondaryText1 flex justify-start items-center gap-2 w-full mt-12 p-2 hover:border-r-2 transition-all duration-100 hover:font-bold hover:text-secondaryText1"
        >
          <MdHome fontSize={25} />
          <span>Home</span>
        </NavLink>
        <div className="p-2 text-sm">
          <h3 className="font-semibold">Discover Categories</h3>
          <ul className="mt-2">
            {categories.map((category) => {
              return (
                <li
                  key={category.key}
                  className="border-secondaryText1 w-full p-1 transition-all duration-100 hover:border-r-2 hover:font-bold"
                >
                  <Item
                    classes="capitalize flex items-center gap-2 justify-start"
                    src={category.src}
                    name={category.name}
                    alt={category.name}
                    to={`/category/${category.name}`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
