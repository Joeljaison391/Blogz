import NOTFOUND from "../assets/Logo/NOTFOUND.png";
import AUTHGRAD from "../assets/AuthPages/AUTH-GRAD.jpg";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Background image */}
      <img
        src={AUTHGRAD}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Content */}
      <div className="relative z-10 max-w-lg p-8 bg-white shadow-lg rounded-lg text-center">
        <img
          src={NOTFOUND}
          alt="Page not found"
          className="w-32 h-32 mx-auto mb-8"
        />
        <h2 className="text-3xl font-bold mb-2">404</h2>
        <h1 className="text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-base mb-6">
          The page you were looking for might have been removed, had its name
          changed, or it's temporarily unavailable.
        </p>
        <Link to="/dashboard">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Go To Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
