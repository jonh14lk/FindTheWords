import React, { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { WordInterface, ahoCorasick } from "../Main";
import "./index.css";

interface Props {
  words: WordInterface["words"];
  setWords: React.Dispatch<React.SetStateAction<WordInterface["words"]>>;
}

const AddWord: React.FC<Props> = ({ words, setWords }) => {
  const [input, setInput] = useState({
    word: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    if (!input.word) {
      return;
    }
    setWords([
      ...words,
      {
        word: input.word,
        id: uuidv1(),
      },
    ]);
    ahoCorasick.addString(input.word);
  };

  return (
    <div className="AddWord">
      <input
        type="text"
        placeholder="Word"
        className="AddToListInput"
        onChange={handleChange}
        value={input.word}
        name="word"
      ></input>
      <button className="AddToListBtn" onClick={handleClick}>
        Add word
      </button>
    </div>
  );
};

export default AddWord;
