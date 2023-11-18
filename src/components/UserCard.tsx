/* eslint-disable @typescript-eslint/no-explicit-any */

function UserCard({data}: any) {
    const {avatar, first_name, last_name, domain, gender, available} = data;

  return (
    <div className="container max-w-full relative">
        <span className={`absolute ${available === true ? `bg-blue-500` : `bg-red-500`} text-blue-100 px-2 py-1 text-xs font-bold rounded-full -top-2 right-4 md:-right-3`}>{available === true ? 'available' : 'unable'}</span>
  <div className="m-auto w-60 md:w-56 max-w-sm items-center justify-center overflow-hidden rounded-2xl bg-slate-200 shadow-xl">
    <div className="h-24 bg-white"></div>
    <div className="-mt-20 flex justify-center">
      <img className="h-16 rounded-full" src={avatar || "https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A="} />
    </div>
    <div className="mt-5 mb-1 px-3 text-center text-lg">{first_name + " " + last_name}</div>
    <div className="mb-2 px-3 text-center text-sky-500">{domain}</div>
    <blockquote>
      <p className="mx-2 mb-4 text-center text-base">{gender}</p>
    </blockquote>
    <div className="w-full flex justify-center my-4">
      <button className="px-4 bg-blue-500 text-white">Add Team</button>
    </div>
  </div>
</div>
  )
}

export default UserCard