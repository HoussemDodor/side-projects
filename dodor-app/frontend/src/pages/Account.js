import { useAuthContext } from "../hooks/useAuthContext"

const Account = () => {
  const { user } = useAuthContext()

  return (
    <div className="bg-gray-200 min-h-[90vh] flex justify-center p-5">
      <div className="bg-gray-100 rounded shadow-lg w-[1400px] py-5">
        <img className="w-60 h-60 rounded-full mx-auto" src={user.profilePicture} />
        <p className="text-center py-2 text-2xl font-bold">{user.email}</p>
        <p className="text-center py-2 text-m">Role: {user.role}</p>
      </div>
    </div>
  )
}

export default Account