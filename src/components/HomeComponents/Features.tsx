import { FaEdit, FaShareAlt, FaChartLine } from 'react-icons/fa';

const Features = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <FaEdit className="text-blue-500 text-5xl mx-auto" />
            <h3 className="mt-4 text-xl font-bold text-gray-800">Easy Content Creation</h3>
            <p className="mt-2 text-gray-600">Use our intuitive editor to create beautiful posts effortlessly.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <FaShareAlt className="text-blue-500 text-5xl mx-auto" />
            <h3 className="mt-4 text-xl font-bold text-gray-800">Seamless Sharing</h3>
            <p className="mt-2 text-gray-600">Share your posts across social media platforms with one click.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <FaChartLine className="text-blue-500 text-5xl mx-auto" />
            <h3 className="mt-4 text-xl font-bold text-gray-800">In-Depth Analytics</h3>
            <p className="mt-2 text-gray-600">Track your post performance and audience engagement.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
