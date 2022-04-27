import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';

const breakpointObj = {
  default: 4,
  3000: 5,
  2000: 4,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonaryLayout = ({ pins, created, loggedIn, loggedInID }) => {
  return (
    <Masonry className="flex gap-2" breakpointCols={breakpointObj}>
      {pins &&
        pins.map((pin) => (
          <Pin
            key={pin._id}
            pin={pin}
            className="w-max"
            created={created}
            loggedIn={loggedIn}
            loggedInID={loggedInID}
          />
        ))}
    </Masonry>
  );
};

export default MasonaryLayout;
