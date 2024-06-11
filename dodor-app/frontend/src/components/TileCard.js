import React from "react";

const TileCard = (props) => {
  return (
    <>
      <div className="bg-slate-300 m-5 p-5 rounded-2xl w-1/2 md:w-1/4 h-[350px] shadow-md hover:bg-slate-500">{props.tile.title}</div>
    </>
  );
};

export default TileCard;
