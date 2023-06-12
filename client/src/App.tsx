import Carousel from './layouts/HomePage/Carousel';
import ExploreTopBooks from './layouts/HomePage/ExploreTopBooks';
import Navbar from './layouts/NavbarAndFooter/Navbar';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
    </>
  );
}

export default App;
