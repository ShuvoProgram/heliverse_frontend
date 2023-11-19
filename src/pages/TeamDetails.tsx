import { useParams } from "react-router-dom"
import { useGetSingleTeamQuery } from "../redux/api/teamApi";
import Spinner from "../components/Spinner";
import { IUser } from "../types";

function TeamDetails() {
    const {id} = useParams();
    const {data, isLoading} = useGetSingleTeamQuery(id);
    if(isLoading) {
        return <Spinner/>
    }
    console.log(data?.data)
  return (
    <div>
        <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
    {data?.data?.teamName}
</h1>
<div className="container grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 mx-10">
    {
        data?.data?.teamMember?.map((member: IUser) => (
            <div className="container max-w-full relative">
            <span
              className={`absolute ${
                member.available ? 'bg-blue-500' : 'bg-red-500'
              } text-blue-100 px-2 py-1 text-xs font-bold rounded-full -top-2 right-9 md:-right-9`}
            >
              {member.available ? 'available' : 'unable'}
            </span>
            <div className="m-auto w-60 md:w-56 max-w-sm items-center justify-center overflow-hidden rounded-2xl bg-slate-200 shadow-xl">
              <div className="h-24 bg-white" />
              <div className="-mt-20 flex justify-center">
                <img
                  className="h-16 rounded-full"
                  src={
                    member.avatar ||
                    'https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A='
                  }
                  alt={`${member.first_name} ${member.last_name}`}
                />
              </div>
              <div className="mt-5 mb-1 px-3 text-center text-lg">{`${member.first_name} ${member.last_name}`}</div>
              <div className="mb-2 px-3 text-center text-sky-500">{member.domain}</div>
              <blockquote>
                <p className="mx-2 mb-4 text-center text-base">{member.gender}</p>
              </blockquote>
              <div className="w-full flex justify-center my-4">
              </div>
            </div>
          </div>
        ))
    }
</div>
    </div>
  )
}

export default TeamDetails