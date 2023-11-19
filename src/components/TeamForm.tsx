function TeamForm() {
  return (
    <div className="flex items-center justify-center">
        <div>
            <h1 className="text-lg">Create A New Team</h1>
            <form>
            <div className="mb-5">
                <input type="text" name="name" id="name" placeholder="Team Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="flex">
                <span>Total User: </span>
                <span>{}</span>
            </div>
                <input type="submit" value="Create Team" className="p-2 bg-blue-500 text-white rounded-lg my-2 w-full cursor-pointer"/>
            </form>
        </div>
    </div>
  )
}

export default TeamForm