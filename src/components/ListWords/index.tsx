import react from "react";
import { WordInterface } from "../Main";
import "./index.css";

interface Props {
  words: WordInterface["words"];
  setWords: React.Dispatch<React.SetStateAction<WordInterface["words"]>>;
}

const ListWords: React.FC<Props> = ({ words, setWords }) => {
  const handleRemove = (id: string) => {
    setWords(words.filter((item) => item.id !== id));
  };

  const renderList = () => {
    return words.map((word) => {
      return (
        <li className="ListWordsUl">
          <div>
            <h2>{word.word}</h2>
          </div>
          <button
            className="ListBtn"
            onClick={() => {
              handleRemove(word.id);
            }}
          >
            Remove
          </button>
        </li>
      );
    });
  };
  return (
    <div className="ListWords">
      <ul>{renderList()}</ul>
    </div>
  );
};

export default ListWords;
