import React, { useState } from "react";
import axios from "axios";
import { order_api } from "../redux/api";

const Error4 = () => {
  const [message, setMessage] = useState("");

  const handleClick = async (endpoint, msg) => {
    try {
      await axios.get(`${order_api}/${endpoint}`);
      setMessage(msg);
    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.statusText : error.message}`);
    }
  };

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center gap-8 p-10 bg-gray-100">
      <section className="w-[300px] flex flex-col gap-4 items-center p-6 bg-white shadow-md rounded-lg">
        <div className="text-xl font-semibold text-gray-700">501</div>
        <button
          className="m-[5px] px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
          onClick={() => handleClick("trigger-error-501", "501 Not Implemented error triggered")}
          type="button"
        >
          Click To Throw Error
        </button>
      </section>

      <section className="w-[300px] flex flex-col gap-4 items-center p-6 bg-white shadow-md rounded-lg">
        <div className="text-xl font-semibold text-gray-700">502</div>
        <button
          className="m-[5px] px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300"
          onClick={() => handleClick("trigger-error-502", "502 Bad Gateway error triggered")}
          type="button"
        >
          Click To Throw Error
        </button>
      </section>

      <section className="w-[300px] flex flex-col gap-4 items-center p-6 bg-white shadow-md rounded-lg">
        <div className="text-xl font-semibold text-gray-700">503</div>
        <button
          className="m-[5px] px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          onClick={() => handleClick("trigger-error-503", "503 Service Unavailable error triggered")}
          type="button"
        >
          Click To Throw Error
        </button>
      </section>

      {message && (
        <div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded-md shadow-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default Error4;
