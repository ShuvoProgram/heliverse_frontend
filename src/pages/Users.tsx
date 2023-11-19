/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { useGetUsersQuery } from "../redux/api/userApi";
import { IUser } from "../types";
import { Pagination } from "react-headless-pagination";
import { useDebounced } from "../redux/hook";
import Teams from "../components/Teams";
import TeamForm from "../components/TeamForm";
import Spinner from "../components/Spinner";

interface User {
  _id: string;
  avatar?: string;
  first_name: string;
  last_name: string;
  domain: string;
  gender: string;
  available: boolean;
}

export interface Team {
  teamMember: string;
}

function User() {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [available, setAvailable] = useState<string | boolean | null>();
  const [domainList, setDomainList] = useState('');
  const [genderList, setGenderList] = useState('')
  const [inputData, setInputData] = useState<Team[]>([]);

  query["page"] = page;
  query["available"] = available;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (debouncedTerm) {
    query["query"] = debouncedTerm;
  }
  if (domainList) {
    query["domain"] = domainList;
  }
  if (genderList) {
    query["gender"] = genderList;
  }

  if (available == true || available == false) {
    query["available"] = available;
  }

  const { data, isLoading } = useGetUsersQuery({
    ...query
  });
  if (isLoading) {
    return <Spinner/>
  }
  //@ts-ignore
  const userData = data?.users?.data;
  // console.log(data?.users?.data)
  // Fetching unique domains from user data
  //@ts-ignore
  const allDomains: string[] = data?.users?.data.map((user: IUser) => user.domain);
  const uniqueDomains = Array.from(new Set(allDomains));
  //@ts-ignore
  const allGender = data?.users?.data?.map((user: IUser) => user.gender);
  const uniqueGender = Array.from(new Set(allGender));

  const handleDomains = (value: React.ChangeEvent<HTMLSelectElement>) => {
    setDomainList(value.target.value)
  };

  const handleGender = (value: React.ChangeEvent<HTMLSelectElement>) => {
    setGenderList(value.target.value)
  }

  const handleAvailableCheckboxChange = (value: React.SetStateAction<any>) => {
    console.log(value);
    setAvailable(value === available ? null : value);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  

  const handleCreateTeam = async (userData: User) => {
    const newTeam: any = [
      // Include other necessary properties from userData
       userData._id
    ];

    // Combine existing inputData with newTeam
    const updatedCart = [...inputData, newTeam];
    setInputData(updatedCart);
  }

  return (
    <div className="md:container md:mx-auto px-10">
      <div className="justify-between items-center flex-col-reverse md:flex-row flex my-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex">
            <select onChange={handleDomains} className="block w-sm text-sm font-medium transition duration-500 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none mr-2" >
              {uniqueDomains.map((domain: any, idx: any) => (
                <option key={idx} value={domain}>{domain}</option>
              ))}
            </select>
            <select onChange={handleGender} className="block w-sm text-sm font-medium transition duration-500 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none mr-2" >
              {uniqueGender.map((gender: any, idx: any) => (
                <option key={idx} value={gender}>{gender}</option>
              ))}
            </select>
          </div>
          <div className="flex">
          <div className="relative flex items-start py-4 ml-2">
                    <input id="1" type="checkbox" className="hidden peer" name="preferred_activities[]" value="1" checked={available === true}
                    onChange={() => handleAvailableCheckboxChange(true)}/>
                    <label htmlFor="1" className="inline-flex items-center justify-between w-auto p-2 font-medium tracking-tight border rounded-lg cursor-pointer bg-brand-light text-brand-black border-blue-500 peer-checked:border-blue-400 peer-checked:bg-blue-700 peer-checked:text-white peer-checked:font-semibold peer-checked:underline peer-checked:decoration-brand-dark decoration-2">
                        <div className="flex items-center justify-center w-full">
                            <div className="text-sm text-brand-black">Available</div>
                        </div>
                    </label>
                </div>
          <div className="relative flex items-start py-4 ml-2">
                    <input id="1" type="checkbox" className="hidden peer" name="preferred_activities[]" value="1" checked={available === false}
                    onChange={() => handleAvailableCheckboxChange(false)}/>
                    <label htmlFor="1" className="inline-flex items-center justify-between w-auto p-2 font-medium tracking-tight border rounded-lg cursor-pointer bg-brand-light text-brand-black border-red-500 peer-checked:border-red-400 peer-checked:bg-red-700 peer-checked:text-white peer-checked:font-semibold peer-checked:underline peer-checked:decoration-brand-dark decoration-2">
                        <div className="flex items-center justify-center w-full">
                            <div className="text-sm text-brand-black">Unable</div>
                        </div>
                    </label>
                </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-white p-4 rounded-lg">
            <div className="relative bg-inherit">
              <input type="text"
                id="username"
                name="username"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me" />
              <label htmlFor="username" className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Type inside me</label>
            </div>
          </div>
        <Teams />
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 basis-4/5">
          {userData?.map((user: IUser) => (
            <div className="container max-w-full relative">
            <span
              className={`absolute ${
                user.available ? 'bg-blue-500' : 'bg-red-500'
              } text-blue-100 px-2 py-1 text-xs font-bold rounded-full -top-2 right-4 md:-right-3`}
            >
              {user.available ? 'available' : 'unable'}
            </span>
            <div className="m-auto w-60 md:w-56 max-w-sm items-center justify-center overflow-hidden rounded-2xl bg-slate-200 shadow-xl">
              <div className="h-24 bg-white" />
              <div className="-mt-20 flex justify-center">
                <img
                  className="h-16 rounded-full"
                  src={
                    user.avatar ||
                    'https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A='
                  }
                  alt={`${user.first_name} ${user.last_name}`}
                />
              </div>
              <div className="mt-5 mb-1 px-3 text-center text-lg">{`${user.first_name} ${user.last_name}`}</div>
              <div className="mb-2 px-3 text-center text-sky-500">{user.domain}</div>
              <blockquote>
                <p className="mx-2 mb-4 text-center text-base">{user.gender}</p>
              </blockquote>
              <div className="w-full flex justify-center my-4">
                <button className="px-4 bg-blue-500 text-white" onClick={() => handleCreateTeam(user)}>
                  Add Team
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className="basis-1/4">
          <TeamForm data={inputData}/>
        </div>
      </div>
      <div className="w-full flex items-center justify-center my-10">
        <Pagination
          currentPage={page}
          setCurrentPage={handlePageChange}
          totalPages={10}
          edgePageCount={2}
          middlePagesSiblingCount={2}
          className="flex"
          truncableText="..."
          truncableClassName=""
        >
          <Pagination.PrevButton className="">Previous</Pagination.PrevButton>

          <div className="flex items-center justify-center flex-grow list-none">
            <Pagination.PageButton
              activeClassName="bg-blue-500 list-none rounded-lg text-white hover:text-white cursor-pointer"
              inactiveClassName=""
              className="p-2 list-none rounded-lg cursor-pointer border border-blue-500 outline-blue-500 mr-2"
            />
          </div>

          <Pagination.NextButton className="">Next</Pagination.NextButton>
        </Pagination>
      </div>
    </div>
  );
}

export default User;
