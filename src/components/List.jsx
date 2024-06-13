import React from "react";

const List = ({ values }) => {

  return (
    <ul className="bg-gray-100 p-4 rounded-lg mt-2">
      <li className="text-lg font-bold">ID: {values.id}</li>
      <li className="text-base">Title: {values.title}</li>
      <li className="text-lg font-semibold text-green-600">Price :${values.price}</li>
      <hr />
    </ul>
  );
};

export default List;
