import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const TileCreateForm = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [tile, setTile] = useState({
    title: "",
    showTitle: "",
    size: "",
    outdoors: false,
    articleNumber: "",
    meterPerBox: "",
    price: "",
    importPrice: "",
    unit: "",
    supplier: "",
    inStore: false,
    positionInStore: "",
    picture: "",
  });
  const [enums, setEnums] = useState({});

  useEffect(() => {
    api
      .get("/tile/getEnums", {
        headers: { Authorization: `Bearer ${user.acces_token}` },
      })
      .then((res) => {
        setEnums(res.data);
      })
      .catch((err) => {
        setError(
          err.response?.data?.error ? err.response.data.error : err.message
        );
      });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(tile);

    api
      .post(`/tile/create`, tile, {
        headers: { Authorization: `Bearer ${user.acces_token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setTile(res.data);
          navigate("/tileOverview")
        }
      })
      .catch((err) => {
        setError(
          err.response?.data?.error ? err.response.data.error : err.message
        );
      });
  };

  return (
    <div className="bg-gray-200 min-h-[93vh] flex justify-center">
      <form
        type="submit"
        onSubmit={handleSubmit}
        className="bg-gray-100 rounded shadow-lg max-h-[90vh] my-5 p-5 overflow-y-scroll"
      >
        {/* Back Button */}
        <Link
          to="/tileOverview"
          className="text-white inline-flex mb-5 bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-auto px-4 py-2.5 text-center"
        >
          <ArrowLeftIcon className="size-5 mr-2 text-white" />
          <button>Terug</button>
        </Link>

        {/* Content */}
        <div className="mb-5">
          <h1 className="text-3xl font-bold">{tile.title}</h1>

          {/* Title */}
          <div className="mb-5">
            <label htmlFor="title" className="mr-2">
              Titel:
            </label>
            <input
              required
              type="text"
              id="title"
              name="title"
              value={tile.title}
              onChange={(e) => setTile({ ...tile, title: e.target.value })}
              className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="showTitle" className="mr-2">
              Show Titel:
            </label>
            <input
              required
              type="text"
              id="showTitle"
              name="showTitle"
              value={tile.showTitle}
              onChange={(e) => setTile({ ...tile, showTitle: e.target.value })}
              className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          {/* size */}
          <div className="mb-5">
            <label htmlFor="size" className="mr-2">
              Maat:
            </label>
            <input
              required
              type="text"
              id="size"
              name="size"
              value={tile.size}
              onChange={(e) => setTile({ ...tile, size: e.target.value })}
              className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          {/* Outdoors Checkbox */}
          <div className="flex items-center mb-5 ps-4 border border-gray-300 rounded">
            <input
              type="checkbox"
              id="outdoors"
              name="outdoors"
              checked={tile.outdoors}
              onChange={(e) => setTile({ ...tile, outdoors: e.target.checked })}
              className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="outdoors"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Buiten tegel
            </label>
          </div>
          {/* articleNumber */}
          <div className="mb-5">
            <label htmlFor="articleNumber" className="mr-2">
              Artikel nummer:
            </label>
            <input
              required
              type="text"
              id="articleNumber"
              name="articleNumber"
              value={tile.articleNumber}
              onChange={(e) =>
                setTile({ ...tile, articleNumber: e.target.value })
              }
              className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          {/* meterPerBox */}
          <div className="mb-5">
            <label htmlFor="meterPerBox" className="mr-2">
              M² per doos:
            </label>
            <input
              type="number"
              id="meterPerBox"
              name="meterPerBox"
              value={tile.meterPerBox}
              onChange={(e) =>
                setTile({ ...tile, meterPerBox: e.target.value })
              }
              className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          {/* Price & ImportPrice */}
          <div className="flex mb-5">
            <div>
              <label htmlFor="name" className="mr-2">
                Verkoopprijs/{tile.unit}:
              </label>
              <input
                required
                type="number"
                id="price"
                name="price"
                value={tile.price}
                onChange={(e) => setTile({ ...tile, price: e.target.value })}
                className="mr-2 w-44 bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
            <div>
              <label htmlFor="importPrice" className="mr-2">
                Inkoopprijs/{tile.unit}:
              </label>
              <input
                type="number"
                id="importPrice"
                name="importPrice"
                value={tile.importPrice}
                onChange={(e) =>
                  setTile({ ...tile, importPrice: e.target.value })
                }
                className="w-44 bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
          </div>
          {/* unit */}
          <div className="mb-5">
            <label htmlFor="unit" className="mr-2">
              Eenheid:
            </label>
            <input
              required
              type="text"
              id="unit"
              name="unit"
              value={tile.unit}
              onChange={(e) => setTile({ ...tile, unit: e.target.value })}
              className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            />
          </div>
          {/* Supplier selection box */}
          <div className="mb-5">
            <label htmlFor="supplier" className="mr-2">
              Leverancier:
            </label>
            <select
              required
              id="supplier"
              name="supplier"
              value={tile.supplier}
              onChange={(e) => setTile({ ...tile, supplier: e.target.value })}
              className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              <option value="" disabled>
                Selecteer een leverancier
              </option>
              {enums.enumSupplier &&
                enums.enumSupplier.map((item) => (
                  <option key={item}>{item}</option>
                ))}
            </select>
          </div>
          {/* inStore */}
          <div className="flex items-center mb-5 ps-4 border border-gray-300 rounded">
            <input
              type="checkbox"
              id="inStore"
              name="inStore"
              checked={tile.inStore}
              onChange={(e) => setTile({ ...tile, inStore: e.target.checked })}
              className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="inStore"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              In de winkel
            </label>
          </div>
        </div>
        {/* positionInStore */}
        <div className="mb-5">
          <label htmlFor="positionInStore" className="mr-2">
            Positie in winkel:
          </label>
          <select
            required
            id="positionInStore"
            name="positionInStore"
            value={tile.positionInStore}
            onChange={(e) =>
              setTile({ ...tile, positionInStore: e.target.value })
            }
            className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option value="" disabled>
              Selecteer een positie in de winkel
            </option>
            {enums.enumPositionInStore &&
              enums.enumPositionInStore.map((item) => (
                <option key={item}>{item}</option>
              ))}
          </select>
        </div>
        {/* picture */}
        <div className="mb-5">
          <label htmlFor="picture" className="mr-2">
            Afbeelding link:
          </label>
          <input
            type="text"
            id="picture"
            name="picture"
            value={tile.picture}
            onChange={(e) => setTile({ ...tile, picture: e.target.value })}
            className="mr-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          />
        </div>

        {/* Actions Buttons */}
        <div className="mb-5">
          <button
            type="submit"
            className="text-white inline-flex mr-2 bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-auto px-4 py-2.5 text-center"
          >
            Opslaan
          </button>
        </div>

        {error && (
          <div className="bg-[#ffefef] p-2 max-w-80 border-solid border-2 border-red-600 rounded-xl">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default TileCreateForm;
