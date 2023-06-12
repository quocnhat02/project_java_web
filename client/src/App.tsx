import Carousel from './layouts/HomePage/Carousel';
import ExploreTopBooks from './layouts/HomePage/ExploreTopBooks';
import Navbar from './layouts/NavbarAndFooter/Navbar';
import './App.css';
import Heros from './layouts/HomePage/Heros';

function App() {
  return (
    <>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
      <Heros />
    </>
  );
}

export default App;
