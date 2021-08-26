export interface Map<T, T2> {
  [Key: string]: T2;
}

export class Node {
  me: string; // character of this node
  nxt: Map<string, number>; // the node that I have to go (on aho), if the next char is == x
  down: Map<string, number>; // the node that I have to go (on trie), if the next char is == x
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

export class AhoCorasick {
  trie: Array<Node>;

  constructor() {
    this.trie = [];
    this.trie.push(new Node());
  }

  addString = (s: string, id: string): void => {
    var v = 0;
    for (var i = 0; i < s.length; i++) {
      const ch = s.charAt(i);
      if (this.trie[v].down[ch] === undefined) {
        this.trie[v].down[ch] = this.trie.length;
        this.trie.push(new Node(v, ch));
      }
      v = this.trie[v].down[ch];
    }
    this.trie[v].leafs.add(id);
  };

  remString = (s: string, id: string): void => {
    var v = 0;
    for (var i = 0; i < s.length; i++) {
      const ch = s.charAt(i);
      v = this.trie[v].down[ch];
    }
    this.trie[v].leafs.delete(id);
  };

  getLink = (v: number): number => {
    if (this.trie[v].link === -1) {
      if (v === 0 || this.trie[v].parent === 0) {
        this.trie[v].link = 0;
      } else {
        this.trie[v].link = this.nxt(
          this.getLink(this.trie[v].parent),
          this.trie[v].me
        );
      }
    }
    return this.trie[v].link;
  };

  nxt = (v: number, ch: string): number => {
    if (this.trie[v].nxt[ch] === undefined) {
      if (this.trie[v].down[ch] !== undefined) {
        this.trie[v].nxt[ch] = this.trie[v].down[ch];
      } else {
        this.trie[v].nxt[ch] = v === 0 ? 0 : this.nxt(this.getLink(v), ch);
      }
    }
    return this.trie[v].nxt[ch];
  };

  getExitLink = (v: number): number => {
    if (this.trie[v].exit_link === -1) {
      var curr = this.getLink(v);
      if (v === 0 || curr === 0) {
        this.trie[v].exit_link = 0;
      } else if (this.trie[v].leafs.size > 0) {
        this.trie[v].exit_link = curr;
      } else {
        this.trie[v].exit_link = this.getExitLink(curr);
      }
    }
    return this.trie[v].exit_link;
  };

  query = (s: string): Map<string, number> => {
    var ans: Map<string, number> = {};
    var v = 0;
    var curr_l = 0;
    for (var i = 0; i < s.length; i++) {
      const ch = s.charAt(i);
      v = curr_l = this.nxt(v, ch);
      do {
        this.trie[curr_l].leafs.forEach(function (leaf) {
          ans[leaf] = ans[leaf] == undefined ? 1 : ans[leaf] + 1;
        });
        curr_l = this.getExitLink(curr_l);
      } while (curr_l > 0);
    }
    return ans;
  };
}

var a = new AhoCorasick();
a.addString("he", "a");
a.addString("she", "b");
a.addString("hes", "c");
a.addString("hhes", "c");
console.log(a.query("sheshehhes"));