import React, { useState } from "react";
import axios from "axios";

const Header = ({setLoading,setIsLinkSubmitted}) => {
  const [link, setLink] = useState("");
  // const [loading, setLoading] = useState(false);
  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log(link);
    if (link === "") {
      alert("Please enter a valid link");
      setLoading(false);
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/setup", { url: link });
    } catch (err) {
      console.log(err.message);
    }
    setIsLinkSubmitted(true);
    setLoading(false);
  };
  return (
    <div className="bg-dark-gray pb-10 w-full h-1/5">
      <div className="flex flex-col justify-center items-center pt-3">
        <h1 className="text-heading-color text-4xl ">GPT for Videos</h1>
      </div>
      <div className=" flex items-center justify-center w-full ">
        {/* <form
          className="w-full flex items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-center w-11/12">

          <label className="w-full">
            <div className="flex justify-center items-center w-11/12">
              <input
                type="text"
                value={link}
                id="link"
                name="link"
                onChange={handleLinkChange}
                className="mt-5 rounded-full w-3/4 ml-10 py-3 border-none outline-none px-5"
                placeholder="Enter Video Link"
                />
            </div>
          </label>
          <div className=" -ml-80 mt-4 ">
            <button
              type="submit"
              className="bg-white p-3 rounded-md px-4 shadow-lg shadow-black cursor-pointer"
              >
              {loading ? "loading..." : "Generate"}
            </button>
          </div>
            </div>
        </form> */}
        <form className="w-full flex items-center" onSubmit={handleSubmit} autoComplete="off">
            <div className="w-11/12 flex justify-center items-center">
              <input
                type="text"
                value={link}
                name="question"
                id="question"
                onChange={handleLinkChange}
                className="mt-5 rounded-lg w-3/4 ml-20 border-none outline-none pl-5 bg-gray-200 py-4 pr-20"
                placeholder="Ask your Question"
              />
              <div className=" rounded-md bg-white p-3 mt-5 ml-5 shadow-black shadow-lg">
                <button className=" cursor-pointer " type="submit">
                  Generate
                </button>
              </div>
            </div>
          </form>
        {/* <div className="bg-white p-3 rounded-md px-4 mt-4 shadow-lg shadow-black">Upload Video</div> */}
      </div>
    </div>
  );
};

export default Header;
