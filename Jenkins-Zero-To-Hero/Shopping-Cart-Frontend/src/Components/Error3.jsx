import React from "react";
import axios from "axios";
import { order_api } from "../redux/api";

const Error3 = () => {
  return (
    <div className="h-[80vh] m-[50px] content-center flex gap-5 flex-col">
      <section className="w-[300px] flex gap-4 flex-col items-right content-center">
        <div>api/v1/error</div>
        <button
          className="m-[5px] pl-[8px] pr-[8px] bg-black text-cyan-200 rounded-md"
          onClick={async () => {
            await axios.get(`${order_api}/api/v1/error`);
          }}
          type="button"
        >
          Button
        </button>
      </section>

      <section className="w-[300px] flex gap-4 flex-col items-right content-center">
        <div>api/v1/error2</div>
        <button
          className="m-[5px] pl-[8px] pr-[8px] bg-black text-cyan-200 rounded-md"
          onClick={async () => {
            await axios.get(`${order_api}/api/v1/error2`);
          }}
          type="button"
        >
          Button
        </button>
      </section>

      <section className="w-[300px] flex gap-4 flex-col items-right content-center">
        <div>api/v1/error3</div>
        <button
          className="m-[5px] pl-[8px] pr-[8px] bg-black text-cyan-200 rounded-md"
          onClick={async () => {
            await axios.get(`${order_api}/api/v1/error3`);
          }}
          type="button"
        >
          Button
        </button>
      </section>
    </div>
  );
};

export default Error3;
