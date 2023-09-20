"use client";
import React from "react";
const TestPage = () => {
  const [hello, setHello] = React.useState("hello");
  console.log(hello);
  React.useEffect(() => {
    console.log(hello);
  }, [hello]);

  return (
    <button
      onClick={() => {
        setHello("other hello");
        alert("helllo");
        console.log("Testing");
      }}
    >
      test
    </button>
  );
};

export default TestPage;
