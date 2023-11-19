import { useGetAllTeamsQuery } from "../redux/api/teamApi";
import { ITeam } from "../types";

function TeamPage() {
    const {data} = useGetAllTeamsQuery(undefined, {
        refetchOnMountOrArgChange: true,
          pollingInterval: 30000
      });

  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {
                data?.data?.map((t: ITeam) => console.log(t))
            }
        </div>
    </div>
  )
}

export default TeamPage