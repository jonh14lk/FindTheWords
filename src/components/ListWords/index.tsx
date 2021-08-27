import react from "react";
import { WordInterface } from "../Main";
import "./index.css";

interface Props {
  words: WordInterface["words"];
  setWords: React.Dispatch<React.SetStateAction<WordInterface["words"]>>;
}

const ListWords: React.FC<Props> = ({ words, setWords }) => {
  const handleRemove = (id: string, word: string) => {
    setWords(words.filter((word) => word.id !== id));
  };

  const renderList = () => {
    return words.map((word) => {
      let occurrences;
      if (word.occurrences === -1) {
        occurrences = <p />;
      } else {
        occurrences = (
          <p className="ListOcurrences">occurrences: {word.occurrences}</p>
        );
      }
      return (
        <li className="ListWordsUl">
          <div>
            <h2>{word.word}</h2>
          </div>
          {occurrences}
          <button
            className="ListBtn"
            onClick={() => {
              handleRemove(word.id, word.word);
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
