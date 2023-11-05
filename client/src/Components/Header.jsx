import React, { useState } from "react";
import axios from "axios";

const Header = ({ setLoading, setIsLinkSubmitted }) => {
  const [link, setLink] = useState("");
  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(link);
    if (link === "") {
      alert("Please enter a valid link");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/setup", { url: link });
      
      if (response.data.success === false) {
        alert(response.data.error);
      }
    } catch (err) {
      console.log(err.message);
    }
    setIsLinkSubmitted(true);
    setLoading(false);
  };
  return (
    <div className="bg-dark-gray pb-40 w-full h-1/5">
      <h1 className="flex flex-col justify-center items-center pt-3 text-heading-color text-5xl font-comic">
        GPT for Videos
      </h1>
      <div className="flex items-center justify-center w-full">
        <form
          className="w-3/5 flex items-center"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
            <input
              type="text"
              value={link}
              name="question"
              id="question"
              onChange={handleLinkChange}
              className="w-5/6 mt-5 rounded-tl-lg rounded-bl-lg border-none outline-none pl-5 bg-gray-200 py-4 pr-10 text-lg"
              placeholder="Enter Video Link"
            />
            <button
              className="w-1/6 rounded-tr-lg rounded-br-lg bg-gray-400 p-4 mt-5 hover:bg-gray-500 cursor-pointer text-lg"
              type="submit"
            >
              Generate
            </button>
          {/* </div> */}
        </form>
        {/* <div className="bg-white p-3 rounded-md px-4 mt-4 shadow-lg shadow-black">Upload Video</div> */}
      </div>
    </div>
  );
};

export default Header;
