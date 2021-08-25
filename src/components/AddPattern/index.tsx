import React, { useState } from "react";
import "./index.css";

const AddPattern = () => {
  const [input, setInput] = useState({
    pattern: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {};

  return (
    <div className="AddPattern">
      <textarea
        placeholder="Pattern"
        className="PatternText"
        onChange={handleChange}
        value={input.pattern}
        name="pattern"
      ></textarea>
      <button className="PatternBtn" onClick={handleClick}>
        Run
      </button>
    </div>
  );
};

export default AddPattern;
