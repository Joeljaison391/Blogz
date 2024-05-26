import { Navbar } from '../components/Navbar';
import Header from '../components/Header';
import Features from '../components/Features';
import CallToAction from '../components/CallToAction';

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
