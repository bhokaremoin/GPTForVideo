import React, { useState } from "react";
import axios from "axios";

const Header = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(false);
  };
  return (
    <div className="bg-dark-gray pb-10 w-full">
      <div className="flex flex-col justify-center items-center pt-3">
        <h1 className="text-heading-color text-4xl ">GPT for Videos</h1>
      </div>
      <div className="items-center justify-center w-full ">
        <form className="w-full flex items-center " onSubmit={handleSubmit}>
          <label className="w-full pl-40">
            <input
              type="text"
              value={link}
              id="link"
              name="link"
              onChange={handleLinkChange}
              className="mt-5 rounded-full w-3/4 ml-10 py-3 border-none outline-none px-5"
              placeholder="Enter Video Link"
            />
          </label>
          <button
            type="submit"
            className="bg-white p-3 rounded-md px-4 -ml-52 mr-5 mt-4 shadow-lg shadow-black cursor-pointer"
          >
            {loading ? "loading..." : "Generate"}
          </button>
        </form>
        {/* <div className="bg-white p-3 rounded-md px-4 mt-4 shadow-lg shadow-black">Upload Video</div> */}
      </div>
    </div>
  );
};

export default Header;
