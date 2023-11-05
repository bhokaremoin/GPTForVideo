import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssistantIcon from "@mui/icons-material/Assistant";

const Body = ({ history }) => {
  return (
    <div className="flex justify-center bg-dark-gray overflow-y-auto h-3/5 -webkit-scrollbar-none">
      <div className="text-white w-3/5 ml-2">
        {history.map((h, i) => (
          <div
            key={i}
            className={
              i % 2 === 0
                ? "text-white flex mt-5 px-10 py-5 rounded-tl-lg rounded-tr-lg bg-gray-800 text-xl font-courier"
                : "text-white flex px-10 py-5 rounded-bl-lg rounded-br-lg bg-light-gray justify-normal text-lg font-courier"
            }
          >
            <div className="mr-2">
              {i % 2 == 0 ? (
                <div>
                  <AccountCircleIcon />
                </div>
              ) : (
                <div>
                  <AssistantIcon />
                </div>
              )}
            </div>
            <div className="break-words">{h}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
