import { Link } from "react-router-dom";

const TileCard = (props) => {
  return (
    <>
      <div className="bg-white text-gray-900 w-80 m-2 min-h-[10rem] shadow-lg rounded-md overflow-hidden">
        <img
          className="w-full h-60 object-cover"
          alt="Tile"
          src={props.tile.picture}
        />
        <div className="p-5 flex-col gap-3">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded full text-xs bg-gray-100">
              {props.tile.size}
            </span>
            {props.tile.outdoors ? (
              <span className="px-3 py-1 rounded full text-xs bg-gray-100">
                Buiten
              </span>
            ) : null}
            {props.tile.inStore ? (
              <span className="px-3 py-1 rounded full text-xs bg-gray-100">
                Winkel
              </span>
            ) : null}
          </div>

          <h2
            title={props.tile.title}
            className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap"
          >
            {props.tile.title}
          </h2>

          {/* Product Price */}
          <div>
            <span className="text-xl font-bold">
              €{props.tile.price}/{props.tile.unit}
            </span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm opacity-50">
                €{props.tile.importPrice}/{props.tile.unit}
              </span>
            </div>
          </div>

          {/* Supplier */}
          <span className="flex items-center mt-1 text-xs text-gray-500">
            {props.tile.supplier}
          </span>

          {/* Product Action */}
          <Link to={`/tile/${props.tile._id}`}>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="bg-gray-800 hover:bg-blue-800 p-3 rounded-md text-white font-medium tracking-wider transition"
              >
                Bewerken
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TileCard;
