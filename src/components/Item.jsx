import React from 'react';
import { NavLink } from 'react-router-dom';

const Item = ({ to, src, alt, name,classes }) => {
  return (
    <NavLink to={to} className={classes}>
      <img className="w-8 h-8 rounded-full" src={src} alt={alt} />
      {name && <span>{name}</span>}
    </NavLink>
  );
};

export default Item;
