/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import UserCard from "../components/UserCard";
import { useGetUsersQuery } from "../redux/api/userApi";
import { IUser } from "../types";
import { Pagination } from "react-headless-pagination";
import { useDebounced } from "../redux/hook";
import Teams from "../components/Teams";
import TeamForm from "../components/TeamForm";

function User() {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [available, setAvailable] = useState<boolean>();
  const [domainList, setDomainList] = useState('');
  const [genderList, setGenderList] = useState('')

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

  const { data, isLoading } = useGetUsersQuery({
    ...query
  });
  if (isLoading) {
    return (
      <div>Loading...</div>
    )
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
  console.log(domainList)
  const handlePageChange = (page: number) => {
    setPage(page);
  };

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
          <div className="flex items-baseline">
            <div className="mx-4">
              Available
            </div>
            <div>
              <div className="flex space-x-4 items-baseline group">
                <div
                  className="rounded-full flex bg-gray-50 border border-gray-300 py-2 px-4 space-x-4 group-checked:border-gray-500">
                  <div>
                    <input type="radio" name="rdo" id="yes" className="peer hidden" />
                    <label htmlFor="yes"
                      className="cursor-pointer peer-checked:text-blue-700 peer-checked:cursor-default text-gray-400">Yes</label>
                  </div>
                  <div>
                    <input type="radio" name="rdo" id="no" className="peer hidden" />
                    <label htmlFor="no"
                      className="cursor-pointer peer-checked:text-gray-800 peer-checked:cursor-default text-gray-400">No</label>
                  </div>
                </div>
                <div>
                  <input type="radio" name="rdo" id="null" className="peer hidden" checked />
                  <label htmlFor="null" className="text-sm text-gray-200 peer-checked:inline hidden">Not set</label>
                  <label htmlFor="null" className="text-sm cursor-pointer text-blue-400 peer-checked:hidden inline">Reset
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
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
        </div>
        <Teams />
      </div>
      <div className="grid grid-cols-9">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 col-span-7">
          {userData?.map((user: IUser) => (
            <UserCard key={user._id} data={user} />
          ))}
        </div>
        <div className="col-span-2">
          <TeamForm/>
        </div>
      </div>
      {/* Pagination component */}
      Current page: {page}
      current Data: {userData?.length}
      <div className="w-full flex items-center justify-center my-4">
        <Pagination
          currentPage={page}
          setCurrentPage={handlePageChange}
          totalPages={10}
          edgePageCount={2}
          middlePagesSiblingCount={2}
          className="flex w-1/2"
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
