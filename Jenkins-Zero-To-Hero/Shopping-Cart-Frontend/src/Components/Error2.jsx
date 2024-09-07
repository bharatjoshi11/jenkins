import React from "react";

const Error2 = () => {
  const handle = () => {
    var e = new Error();
    throw e;
  };

  const handle2 = () => {
    // let un;
    un = 0;
  };

  const handle3 = () => {
    // try {
    //   val = prompt("Enter the value");

    // }catch {
    //   console.log("ReferenceError: val is not defined")
    // }
    alert("Alert");
  };

  return (
    <div className="flex m-[60px] h-[70vh] gap-5 flex-col items-right content-center">
      <section className="text-md">
        Uncaught Error -
        <button
          className="m-[5px] pl-[8px] pr-[8px] bg-black text-cyan-200 rounded-md"
          onClick={() => handle()}
        >
          Click
        </button>
      </section>
      <section className="text-md">
        Reference Error -
        <button
          className="m-[5px] pl-[8px] pr-[8px] bg-black text-cyan-200 rounded-md"
          onClick={() => handle2()}
        >
          Click
        </button>
      </section>
      <section className="text-md">
        <div>
          Enter the value in prompt -
          <button
            className="m-[5px] pl-[8px] pr-[8px] bg-black text-cyan-200 rounded-md"
            onClick={() => handle3()}
          >
            Click
          </button>
        </div>
        <div className="text-red-600 text-sm italic">
          Will generate the ReferenceError coz the variable is not defined
        </div>
      </section>
      <section className="text-md"></section>
    </div>
  );
};

export default Error2;
