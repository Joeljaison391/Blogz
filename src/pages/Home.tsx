import { Navbar } from '../components/Navbars/Navbar';
import Header from '../components/HomeComponents/Header';
import Features from '../components/HomeComponents/Features';
import CallToAction from '../components/HomeComponents/CallToAction';

const Home = () => {
  return (
    <div className="font-sans w-dvw overflow-hidden">
      <Navbar />
      <Header />
      <Features />
      <CallToAction />
    </div>
  );
};

export default Home;
