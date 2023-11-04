import React from "react";

const Body = ({history}) => {
  return (
    <div className="bg-dark-gray h-80 overflow-y-auto">
      <div className="text-white w-auto">
        {history.map((h, i) => (
          <div key={i} className={i % 2 === 0 ? "text-white flex pl-40 pr-20" : "text-white flex bg-light-gray pl-40 pr-20 justify-normal"}>
            <div className="break-words">
            {h}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
