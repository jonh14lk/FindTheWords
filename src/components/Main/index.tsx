import React, { useState } from "react";
import { AhoCorasick } from "../../algorithm/AhoCorasick";
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

export var ahoCorasick: AhoCorasick = new AhoCorasick();

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
          <AddPattern words={words}></AddPattern>
        </div>
      </div>
    </div>
  );
};

export default Main;
