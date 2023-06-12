import React from 'react';
import ExploreTopBooks from './components/ExploreTopBooks';
import Carousel from './components/Carousel';
import Heros from './components/Heros';
import LibraryService from './components/LibraryService';

const HomePage = () => {
  return (
    <>
      <ExploreTopBooks />
      <Carousel />
      <Heros />
      <LibraryService />
    </>
  );
};

export default HomePage;
