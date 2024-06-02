import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <header className="max-w-[1400px] h-[10vh] my-0 mx-auto px-5 py-5 flex items-center justify-between">
      <Link to="/" className="text-[#333] no-underline">
        <h1 className="text-m md:text-2xl font-bold">MERN Boilerplate</h1>
      </Link>
      <nav>
        <div className="flex items-center justify-center ">
          <div className="flex items-center justify-center mr-11 ">
            <Link
              className="bg-gray-300 active:bg-blue-500 hover:bg-gray-500  px-3 py-2 rounded-2xl shadow-lg hover:scale-110 duration-300"
              to="/customerOverview"
            >
              Klanten
            </Link>
          </div>
          <div className="flex items-center justify-center">
            {user ? (
              <>
                <Link to="/account">
                  <button className="flex items-center hover:scale-110 duration-300">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user.profilePicture}
                      alt="ProfilePicture"
                    />
                    <span className="py-3 pr-5 pl-2">{user.email}</span>
                  </button>
                </Link>
                <button className="" onClick={logout}>
                  <ArrowLeftStartOnRectangleIcon className="size-6 text-gray-800 hover:scale-110 duration-300" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
