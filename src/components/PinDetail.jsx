import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import {
  usePinDetails,
  useComments,
  useAuthUser,
  useCategory,
  useComment,
} from '../hooks';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import Item from './Item';
import MasonaryLayout from './MasonryLayout';

const PinDetail = () => {
  const { pinId } = useParams();
  const [text, setText] = useState('');

  const { isLoading, data: pinDetails } = usePinDetails(pinId);
  const { isLoading: commentsLoading, data: comments } = useComments(pinId);
  const { data: authData } = useAuthUser();
  const { data: morePins } = useCategory(pinDetails?.data?.pin.category);
  const { mutate: post } = useComment(pinDetails?.data?.pin._id);
  console.log(authData);

  if (isLoading) {
    return 'Loading....';
  }

  console.log(pinDetails);
  console.log(commentsLoading, comments);
  console.log(morePins?.data.pins);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const submit = () => {
    const data = { comment: text };
    post(data);
  };

  console.log("COMMM",pinDetails.data.pin.comments)
  return (
    <div className="">
      <div className="flex md:flex-col p-2 rounded-md border border-mainText bg-primaryBg shadow-md gap-4">
        <div className="basis-1/2">
          <img
            src={pinDetails.data.pin.pinImage}
            alt={pinDetails.data.pin.category}
            className="rounded-md object-cover aspect-square w-full"
          />
        </div>
        <div className="basis-full">
          <div className="w-full">
            <a
              href={`${pinDetails.data.pin.pinImage}?dl=`}
              download
              onClick={(e) => e.stopPropagation}
              className="bg-secondaryBg1 w-8 h-8 rounded-full flex items-center justify-center text-mainText text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none block"
            >
              <AiOutlineCloudDownload />
            </a>
          </div>
          <div className="w-full mt-2 ">
            <h1 className="capitalize text-secondaryText1 font-bold text-2xl">
              {pinDetails.data.pin.title}
            </h1>
            <p className="normal-case text-mainText text-sm mt-2">
              {pinDetails.data.pin.description}
            </p>
          </div>
          <Item
            to={`/user-profile/${pinDetails.data.pin.postedBy._id}`}
            src={pinDetails.data.pin.postedBy.profileImage}
            alt={pinDetails.data.pin.postedBy.username}
            name={pinDetails.data.pin.postedBy.username}
            classes="flex items-center gap-2 text-sm mt-2 text-mainText block font-semibold"
          />
          <div>
            <h1 className="text-base mt-4 font-semibold text-mainText">
              Comments({comments?.data.comments.length})
            </h1>
            <div className="max-h-32 overflow-y-scroll text-mainText">
              {!commentsLoading &&
                comments.data.comments.map((comment) => {
                  console.log("COM",comment)
                  return (
                    <div
                      key={comment._id}
                      className="flex items-center gap-2 mt-1"
                    >
                      <NavLink to={`/user-profile/${comment.commentedBy._id}`}>
                        <img
                          className="w-8 h-8 rounded-full"
                          src={comment.commentedBy.profileImage}
                          alt={comment.commentedBy.username}
                        />
                      </NavLink>
                      <div>
                        <p className="text-sm font-semibold">
                          {comment.commentedBy.username}
                        </p>
                        <p className="text-sm">{comment.comment}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            {authData ? (
              <div className="flex gap-2 mt-4">
                <NavLink to={`/user-profile/${authData.data.user._id}`}>
                  <img
                    className="w-8 h-8 aspect-square rounded-full basis-1/4"
                    src={authData.data.user.profileImage}
                    alt={authData.data.user.username}
                  />
                </NavLink>
                <input
                  onChange={handleInputChange}
                  value={text}
                  placeholder="Add a comment"
                  type="text"
                  className="p-2 w-full border border-mainText text-sm rounded-md"
                />
                <button
                  onClick={submit}
                  className="p-2 bg-secondaryBg1 font-semibold text-mainText rounded-md flex-1/4"
                >
                  Post
                </button>
              </div>
            ) : (
              <p className="text-sm text-mainText mt-4">
                <NavLink className="text-secondaryBg1 font-bold underline" to="/login">Login</NavLink> to post a comment
              </p>
            )}
          </div>
        </div>
      </div>
      <h1 className="w-full p-2 mt-4 text-mainText font-bold text-2xl text-center">
        More Like This
      </h1>
      <div>
        {morePins?.data.pins && <MasonaryLayout pins={morePins?.data.pins} />}
      </div>
    </div>
  );
};

export default PinDetail;
