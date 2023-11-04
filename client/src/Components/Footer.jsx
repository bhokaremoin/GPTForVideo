import React, { useState } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import PendingIcon from "@mui/icons-material/Pending";
import Body from "./Body";
import axios from "axios";
const Footer = () => {
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
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
    setLoading(false);
  };
  return (
    <>
      <Body history={history} />
      <div className="bg-dark-gray py-5 flex">
        <div className="items-center justify-center w-full ">
          <form className="w-full flex items-center" onSubmit={handleSubmit}>
            <label className="w-full pl-40">
              <input
                type="text"
                value={question}
                name="question"
                id="question"
                onChange={handleChangeQuestion}
                className="mt-5 rounded-lg w-3/4 ml-20 border-none outline-none pl-5 bg-gray-200 py-4 pr-16 "
                placeholder="Ask your Question"
              />
            </label>
            <button
              className="p-2 bg-black rounded-full mt-5 -ml-64 cursor-pointer"
              type="submit"
            >
              {loading ? (
                <PendingIcon className="text-white" />
              ) : (
                <TelegramIcon className="text-white" />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Footer;
