import React, { useState } from "react";
import { WordInterface, ahoCorasick } from "../Main";
import { HashMap } from "../../algorithm/AhoCorasick";
import "./index.css";

interface Props {
  words: WordInterface["words"];
}

const AddPattern: React.FC<Props> = ({ words }) => {
  const [input, setInput] = useState({
    pattern: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    if (!input.pattern) {
      return;
    }
    var ans: HashMap<string, number> = ahoCorasick.query(input.pattern);
    words.map((word) => {
      word.occurrences = ans[word.id];
      if(word.occurrences == undefined) {
        word.occurrences = 0;
      }
      console.log(`${word.word}: ${word.occurrences}`);
    });
  };

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
