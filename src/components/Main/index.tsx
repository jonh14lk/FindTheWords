import React, { useState } from "react";
import ListWords from "../ListWords";
import AddWord from "../AddWord";
import AddPattern from "../AddPattern";
import Header from "../Header";
import "./index.css";

export interface WordInterface {
  words: {
    word: string;
    id: string;
  }[];
}

const Main = () => {
  const [words, setWords] = useState<WordInterface["words"]>([]);

  return (
    <div className="App">
      <Header></Header>
      <div className="Screen">
        <div>
          <ListWords words={words} setWords={setWords}></ListWords>
          <AddWord words={words} setWords={setWords}></AddWord>
        </div>
        <div>
          <AddPattern></AddPattern>
        </div>
      </div>
    </div>
  );
};

export default Main;
