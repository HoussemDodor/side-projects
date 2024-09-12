import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";
import { api } from "../api/axios";
import { PlusIcon } from "@heroicons/react/24/solid";

import TileCard from "../components/TileCard";

const TileOverview = () => {
  const { user } = useAuthContext();

  const [tiles, setTiles] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api
      .get("/tile/all", {
        headers: { Authorization: `Bearer ${user.acces_token}` },
      })
      .then((res) => {
        setTiles(res.data);
        setSearchResult(res.data);
      })
      .catch((err) => {
        console.log(
          err.response?.data?.error ? err.response.data.error : err.message
        );
      });
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);

    if (searchTerm.length <= 1) {
      setSearchResult(tiles);
    } else {
      setSearchResult(
        tiles.filter((item) => {
          return (
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.size.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    }
  };

  return (
    <>
      <div className="bg-gray-200 min-h-[93vh] flex justify-center">
        <div className="bg-gray-100 w-full md:max-w-[1400px] min-h-[90vh] m-5 p-5 rounded shadow-lg">
          <div className="w-full flex justify-between">
            <div className="flex gap-2">
              <h1 className="text-l text-4xl hidden sm:block pl-2 m-2 font-medium">
                Tegel overzicht
              </h1>
              <Link to="/createTile" className="flex items-center">
                <button
                  type="button"
                  className="bg-gray-800 inline-flex items-center hover:bg-green-800 m-2 p-2.5 rounded-md text-white font-medium transition"
                >
                  <PlusIcon className="size-5 mr-2 text-white" />
                  Nieuwe tegel
                </button>
              </Link>
            </div>
            <input
              className="min-w-48 m-2 bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              placeholder="Zoeken..."
              type="text"
              onChange={handleSearch}
              value={searchTerm}
            />
          </div>
          <div className="flex justify-center flex-wrap  overflow-y-scroll ">
            {searchResult &&
              searchResult.map((item) => (
                <TileCard key={item._id} tile={item} />
              ))}
            {searchResult &&
              searchResult.map((item) => (
                <TileCard key={item._id} tile={item} />
              ))}
            {searchResult &&
              searchResult.map((item) => (
                <TileCard key={item._id} tile={item} />
              ))}
            {searchResult &&
              searchResult.map((item) => (
                <TileCard key={item._id} tile={item} />
              ))}
            {searchResult &&
              searchResult.map((item) => (
                <TileCard key={item._id} tile={item} />
              ))}
            {searchResult &&
              searchResult.map((item) => (
                <TileCard key={item._id} tile={item} />
              ))}
            {searchResult &&
              searchResult.map((item) => (
                <TileCard key={item._id} tile={item} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TileOverview;
