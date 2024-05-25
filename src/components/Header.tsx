
const Header = () => {
  return (
    <header className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">Effortless Publishing.</h1>
        <p className="mt-4 text-xl text-gray-600">AI-assisted blogging for developers and teams.</p>
        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300">
            Get started
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-300 transition duration-300">
            For enterprises
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
