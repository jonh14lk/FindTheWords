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
    occurrences: number;
  }[];
}

const Main = () => {
  const [words, setWords] = useState<WordInterface["words"]>([]);
  return (
    <div>
      <Header />
      <div className="MainContent">
        <div>
          <ListWords words={words} setWords={setWords}></ListWords>
          <AddWord words={words} setWords={setWords}></AddWord>
        </div>
        <div>
          <AddPattern words={words} setWords={setWords}></AddPattern>
        </div>
      </div>
    </div>
  );
};

export default Main;
