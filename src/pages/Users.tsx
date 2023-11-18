import AvailableButton from "../components/AvailableButton";
import DropDown from "../components/DropDown";
import SearchField from "../components/SearchField";
import UserCard from "../components/UserCard";
import { useGetUsersQuery } from "../redux/api/userApi";
import { IUser } from "../types";

function User() {
  const {data, isLoading} = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
        pollingInterval: 30000
  })

  if(isLoading) {
    return (
      <div>Loading....</div>
    )
  }
  // console.log(data?.data);
    return (
      <div className="md:container md:mx-auto px-10">
        <div className="justify-between items-center flex-col-reverse md:flex-row flex my-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex">
            <DropDown/>
            <DropDown/>
            </div>
            <AvailableButton/>
          </div>
          <div>
            <SearchField/>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {data?.data.map((user: IUser) => (
            <UserCard key={user._id} data={user} />
          ))}
        </div>
      </div>
    )
  }

export default User;