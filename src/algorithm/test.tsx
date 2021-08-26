interface Map<T> {
  [Key: string]: number;
}

export class Node {
  me: string; // character of this node
  nxt: Map<string>; // the node that I have to go (on aho), if the next char is == x
  down: Map<string>; // the node that I have to go (on trie), if the next char is == x
  leaf_count: number; // how many strings ends at this node
  parent: number; // parent of this node
  link: number; // suffix link of this node
  exit_link: number; // the next leaf node that can be reached from this node using suffix links

  constructor(parent?: number, ch?: string) {
    this.me = ch === undefined ? "a" : ch;
    this.nxt = {};
    this.down = {};
    this.leaf_count = 0;
    this.parent = parent === undefined ? -1 : parent;
    this.link = -1;
    this.exit_link = -1;
  }
}

export class AhoCorasick {
  trie: Array<Node>;
  last:number;

  constructor() {
    this.trie = [];
    this.trie.push(new Node());
    this.last = 0;
  }

  addString = (s: string): void => {
    this.last++;
    console.log(this.last);
    var v = 0;
    for (var i = 0; i < s.length; i++) {
      const ch = s.charAt(i);
      if (this.trie[v].down[ch] === undefined) {
        this.trie[v].down[ch] = this.trie.length;
        this.trie.push(new Node(v, ch));
      }
      v = this.trie[v].down[ch];
    }
    this.trie[v].leaf_count++;
  };

  remString = (s: string): void => {
    this.last--;
    console.log(this.last);
    var v = 0;
    for (var i = 0; i < s.length; i++) {
      const ch = s.charAt(i);
      v = this.trie[v].down[ch];
    }
    this.trie[v].leaf_count--;
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
      } else if (this.trie[v].leaf_count > 0) {
        this.trie[v].exit_link = curr;
      } else {
        this.trie[v].exit_link = this.getExitLink(curr);
      }
    }
    return this.trie[v].exit_link;
  };

  query = (s: string): number => {
    var ans = 0;
    var v = 0;
    var curr_l = 0;
    for (var i = 0; i < s.length; i++) {
      const ch = s.charAt(i);
      v = this.nxt(v, ch);
      ans += this.trie[v].leaf_count;
      curr_l = this.getExitLink(v);
      while (curr_l > 0) {
        ans += this.trie[curr_l].leaf_count;
        curr_l = this.getExitLink(curr_l);
      }
    }
    return ans;
  };
}


var a = new AhoCorasick();
a.addString("zezo");
a.remString("zezo");
