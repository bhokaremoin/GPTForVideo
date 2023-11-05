import React, { useState } from "react";
import Header from "../Components/Header";
// import Body from "../Components/Body";
import Footer from "../Components/Footer";
// import Loader from "../Components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [isLinkSubmitted, setIsLinkSubmitted] = useState(false);

  return (
    <div className="snap-none h-screen w-full">
      <Header setLoading={setLoading} setIsLinkSubmitted={setIsLinkSubmitted} />
      {/* <hr/> */}
      {/* <Body /> */}
      <Footer
        loading={loading}
        setLoading={setLoading}
        isLinkSubmitted={isLinkSubmitted}
      />
    </div>
  );
};

export default Home;
