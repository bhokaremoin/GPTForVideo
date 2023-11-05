import React, { useState } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import PendingIcon from "@mui/icons-material/Pending";
import Body from "./Body";
import axios from "axios";
import Loader from "./Loader";
const Footer = ({ loading, setLoading ,isLinkSubmitted }) => {
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };
  const handleSubmit = async (e) => {
    setLoading1(true);
    e.preventDefault();
    if (question === "") {
      alert("Enter a question");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/getAnswer", {
        question: question,
      });
      console.log(response);
      setHistory([...history, `${question}`, `${response.data.answer}`]);
    } catch (err) {
      console.log(err.message);
    }
    setLoading1(false);
  };
  return (
    <>
      {loading && <Loader message="Processing Video..." />}
      <Body history={history} />
      <div className="bg-dark-gray py-5 flex h-1/5">
        <div className="items-center justify-center w-full">
          <form
            className="w-full flex items-center"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="w-11/12 flex justify-center items-center">
              <input
                type="text"
                value={question}
                name="question"
                id="question"
                onChange={handleChangeQuestion}
                className="mt-5 rounded-lg w-3/4 ml-20 border-none outline-none pl-5 bg-gray-200 py-4 pr-20"
                placeholder="Ask your Question"
                disabled={isLinkSubmitted?false:true}
              />
              <div className="bg-black rounded-full p-2 -ml-16 mt-5">
                <button className=" cursor-pointer " type="submit">
                  {loading1 ? (
                    <PendingIcon className="text-white" />
                  ) : (
                    <TelegramIcon className="text-white" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Footer;
