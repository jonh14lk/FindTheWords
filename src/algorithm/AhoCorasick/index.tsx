import { Node, HashMap } from "../Node";

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
      } else if (this.trie[curr].leafs.size > 0) {
        this.trie[v].exit_link = curr;
      } else {
        this.trie[v].exit_link = this.getExitLink(curr);
      }
    }
    return this.trie[v].exit_link;
  };

  query = (s: string): HashMap<string, number> => {
    var ans: HashMap<string, number> = {};
    var v = 0;
    var curr_l = 0;
    for (var i = 0; i < s.length; i++) {
      const ch = s.charAt(i);
      v = this.nxt(v, ch);
      curr_l = v;
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
