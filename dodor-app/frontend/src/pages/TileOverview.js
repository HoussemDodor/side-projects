import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "../api/axios";

import TileCard from "../components/TileCard"

const TileOverview = () => {
  const { user } = useAuthContext();

  const [error, setError] = useState("");
  const [tiles, setTiles] = useState("");

  useEffect(() => {
    axios
      .get("/tile/all", {
        headers: { Authorization: `Bearer ${user.acces_token}` },
      })
      .then((res) => {
        setTiles(res.data);
      })
      .catch((err) => {
        setError(
          err.response?.data?.error ? err.response.data.error : err.message
        );
      });
  }, [user]);

  return (
    <>
      <div className="bg-gray-200 h-[93vh] md:flex justify-center">
        <div className="bg-gray-100 inline-flex md:w-[1400px] max-h-[90vh] m-5 p-5 overflow-y-scroll rounded shadow-lg">
          {/* <h1 className="w-full text-4xl">Tegel overzicht</h1> */}
          {tiles &&
          tiles.map((item) => (
            <TileCard key={item._id} tile={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TileOverview;
