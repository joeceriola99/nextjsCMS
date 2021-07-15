import HomeComponent from './home';
import NavBar from '../../components/Navigation';
import Footer from '../../components/Footer';

const index = () => {
  return (
    <div>
      <NavBar />
      <HomeComponent />
      <Footer />  
    </div>
  );
};

export default index;
