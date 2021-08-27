export interface HashMap<T, T2> {
  [Key: string]: T2;
}

export class Node {
  me: string; // character of this node
  nxt: HashMap<string, number>; // the node that I have to go (on aho), if the next char is == x
  down: HashMap<string, number>; // the node that I have to go (on trie), if the next char is == x
  leafs: Set<string>; // ids of strings that ends at this node
  parent: number; // parent of this node
  link: number; // suffix link of this node
  exit_link: number; // the next leaf node that can be reached from this node using suffix links

  constructor(parent?: number, ch?: string) {
    this.me = ch === undefined ? "a" : ch;
    this.nxt = {};
    this.down = {};
    this.leafs = new Set();
    this.parent = parent === undefined ? -1 : parent;
    this.link = -1;
    this.exit_link = -1;
  }
}
