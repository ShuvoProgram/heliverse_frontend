import { useCreateTeamMutation } from "../redux/api/teamApi";
import { toast } from "react-toastify";

/* eslint-disable @typescript-eslint/no-explicit-any */
function TeamForm({data}: any) {
    // const [userId, setUserId] = useState<Team[]>([])
    const [createTeam] = useCreateTeamMutation();

    const handleTeamSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    // Access the form data here if needed
    const formData = new FormData(event.currentTarget);
    const teamName = formData.get('name') as string;
    const store = {
        teamName: teamName,
         teamMember: data
    }

    try {
        console.log(store)
        const res = await createTeam(store).unwrap();
        if(res?._id) {
           toast.success("Team created successfully")
        }
    } catch (error: any) {
        toast.success("Team created failed")
    }
    }
  return (
    <div className="flex items-center justify-center mb-8">
        <div>
            <h1 className="text-lg">Create A New Team</h1>
            <form onSubmit={handleTeamSubmit}>
            <div className="mb-5">
                <input type="text" name="name" id="name" placeholder="Team Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="flex">
                <span>Total User: </span>
                <span>{data?.length}</span>
            </div>
                <input type="submit" value="Create Team" className="p-2 bg-blue-500 text-white rounded-lg my-2 w-full cursor-pointer"/>
            </form>
        </div>
    </div>
  )
}

export default TeamForm