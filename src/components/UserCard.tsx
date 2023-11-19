/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { ITeam } from '../types';

interface User {
  _id: string;
  avatar?: string;
  first_name: string;
  last_name: string;
  domain: string;
  gender: string;
  available: boolean;
}



interface UserCardProps {
  data: User;
}

const UserCard: React.FC<UserCardProps> = ({ data }) => {
  const [inputData, setInputData] = useState<ITeam[]>([]);

  const handleCreateTeam = async (userData: User) => {
    const newTeam: ITeam = {
      teamName: 'Default Team', // Provide a default team name or extract it from userData
      // Include other necessary properties from userData
      teamMember: userData._id
    };

    // Combine existing inputData with newTeam
    const updatedCart = [...inputData, newTeam];
    setInputData(updatedCart);
  }
  console.log(inputData)
  return (
    <div className="container max-w-full relative">
      <span
        className={`absolute ${
          data.available ? 'bg-blue-500' : 'bg-red-500'
        } text-blue-100 px-2 py-1 text-xs font-bold rounded-full -top-2 right-4 md:-right-3`}
      >
        {data.available ? 'available' : 'unable'}
      </span>
      <div className="m-auto w-60 md:w-56 max-w-sm items-center justify-center overflow-hidden rounded-2xl bg-slate-200 shadow-xl">
        <div className="h-24 bg-white" />
        <div className="-mt-20 flex justify-center">
          <img
            className="h-16 rounded-full"
            src={
              data.avatar ||
              'https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A='
            }
            alt={`${data.first_name} ${data.last_name}`}
          />
        </div>
        <div className="mt-5 mb-1 px-3 text-center text-lg">{`${data.first_name} ${data.last_name}`}</div>
        <div className="mb-2 px-3 text-center text-sky-500">{data.domain}</div>
        <blockquote>
          <p className="mx-2 mb-4 text-center text-base">{data.gender}</p>
        </blockquote>
        <div className="w-full flex justify-center my-4">
          <button className="px-4 bg-blue-500 text-white" onClick={() => handleCreateTeam(data)}>
            Add Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
