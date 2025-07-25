import NewsLetter from "@/components/NewsLetter";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import React from "react";
import Collections from "@/components/Collections";
import ListPage from "./products/page";


const Homepage = () => {
  return (
    <>
      <Slider />
      <Collections/>
      <ListPage/>
      <NewsLetter/>
    </>
  );
};

export default Homepage;
