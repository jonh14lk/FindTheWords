# Find The Words

## Purpose

Given a set of strings (words) and a text (pattern). We have to print the number of occurrences of all strings from the set in the given text in linear time complexity. The app uses the Aho-Corasick algorithm.

<div align="center">



https://user-images.githubusercontent.com/50853845/131140001-849461c2-39aa-4cfd-ac4a-3b70563e32db.mp4


</div>

## Aho–Corasick algorithm

The Aho–Corasick algorithm is a string-searching algorithm invented by Alfred V. Aho and Margaret J. Corasick. It is a kind of dictionary-matching algorithm that locates elements of a finite set of strings (the "dictionary") within an input text. It matches all strings simultaneously. The complexity of the algorithm is linear in the length of the strings plus the length of the searched text plus the number of output matches. Note that because all matches are found, there can be a quadratic number of matches if every substring matches.

Let there be a set of strings with the total length m (sum of all lengths). The Aho-Corasick algorithm constructs a data structure similar to a trie with some additional links, and then constructs a finite state machine (automaton) in O(mk) time, where k is the size of the used alphabet.

You can read more about this algorithm at the references links.

## To Run

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
In the project directory, you can run:

#### `npm install`

To install all app dependencies.

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## References

### 1 - [CP-Algorithms](https://cp-algorithms.com/string/aho_corasick.html)

### 2 - [Wikipedia](https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm)
