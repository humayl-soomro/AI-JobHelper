import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.js";

export default function Navbar() {
  const { access, logout } = useAuthStore();

  return (
      <nav className="bg-gray-800 p-4 text-white flex justify-between">
      {access ? <Link to={"/"}>
          <h1 className="text-2xl font-bold">Jobify</h1>
      </Link> : <h1 className="text-2xl font-bold">Jobify</h1> }
      <div className="flex gap-4">
        {access && <Link to="/jobs">Jobs</Link>}
        {access && <Link to="/resume/analyze">Resume Analyze</Link>}
      </div>

      <div>
        {access ? (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}