/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import AvailableButton from "../components/AvailableButton";
import DropDown from "../components/DropDown";
import SearchField from "../components/SearchField";
import UserCard from "../components/UserCard";
import { useGetUsersQuery } from "../redux/api/userApi";
import { IUser } from "../types";
import { useDebounced } from "../redux/hook";
import { Pagination } from "react-headless-pagination";

function User() {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["page"] = page;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  const { data, isLoading } = useGetUsersQuery({
  ...query
  });
if(isLoading) {
  return (
    <div>Loading...</div>
  )
}
  //@ts-ignore
  const userData = data?.users?.data;
  console.log(data?.users)

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="md:container md:mx-auto px-10">
      <div className="justify-between items-center flex-col-reverse md:flex-row flex my-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex">
            <DropDown />
            <DropDown />
          </div>
          <AvailableButton />
        </div>
        <div>
          {/* <SearchField setSearchTerm={handleSearch} /> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {userData?.map((user: IUser) => (
          <UserCard key={user._id} data={user} />
        ))}
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
