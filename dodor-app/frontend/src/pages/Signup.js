import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "../api/axios"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    await axios.post("/auth/signup", {email, password}).then((res) => {
      if (res.status === 200) {      
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "LOGIN", payload: res.data });  
        setIsLoading(false);
      }
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err.response?.data?.error ? err.response.data.error : err.message);
    })
  };

  return (
    <section className="bg-gray-50 min-h-[90vh] flex items-center justify-center">
      {/* Login container */}
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl py-5">
        {/* form */}
        <div className="sm:w-1/2 px-16">
          <h2 className="font-bold text-2xl">Sign up</h2>
          <p className="text-sm mt-4">
            Create your account
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              className="p-2 mt-4 rounded-xl border"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button disabled={isLoading} className="bg-blue-600 rounded-xl text-white mt-4 py-2">
              Sign up
            </button>
            { error && <span className="p-2 my-4 bg-[#ffefef] border-solid border-2 border-red-600 rounded-xl">{error}</span>}
          </form>

          {/* Divider */}
          <div className="mt-6 grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-500" />
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-gray-800">
            <p>Already have an account?</p>
            <Link
              to="/login"
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* image */}
        <div className="sm:block hidden w-1/2">
          <img src="/logo512.png" alt="" className="rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

export default Signup