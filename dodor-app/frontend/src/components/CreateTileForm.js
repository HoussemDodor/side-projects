import React from "react";

const CreateTileForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // handle submit
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 min-w-[30%] p-5 m-5 rounded shadow-lg"
    >
        <h1 className="text-2xl mb-5">Nieuwe klant</h1>
    </form>
  );
};

export default CreateTileForm;
