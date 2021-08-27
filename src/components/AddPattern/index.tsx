import React, { useState } from "react";
import { WordInterface } from "../Main";
import { AhoCorasick } from "../../algorithm/AhoCorasick";
import { HashMap } from "../../algorithm/Node";
import "./index.css";

interface Props {
  words: WordInterface["words"];
  setWords: React.Dispatch<React.SetStateAction<WordInterface["words"]>>;
}

const AddPattern: React.FC<Props> = ({ words, setWords }) => {
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
    var ahoCorasick: AhoCorasick = new AhoCorasick();
    words.map((word) => {
      ahoCorasick.addString(word.word, word.id);
    });
    var ans: HashMap<string, number> = ahoCorasick.query(input.pattern);
    words.map((word) => {
      word.occurrences = ans[word.id];
      if (word.occurrences === undefined) {
        word.occurrences = 0;
      }
    });
    setWords(words.filter((word) => word.id !== ""));
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
