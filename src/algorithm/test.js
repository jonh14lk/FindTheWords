"use strict";
exports.__esModule = true;
exports.AhoCorasick = exports.Node = void 0;
var Node = /** @class */ (function () {
    function Node(parent, ch) {
        this.me = ch == undefined ? "a" : ch;
        this.nxt = {};
        this.down = {};
        this.leaf_count = 0;
        this.parent = parent == undefined ? -1 : parent;
        this.link = -1;
        this.exit_link = -1;
    }
    return Node;
}());
exports.Node = Node;
var AhoCorasick = /** @class */ (function () {
    function AhoCorasick() {
        var _this = this;
        this.addString = function (s) {
            var v = 0;
            for (var i = 0; i < s.length; i++) {
                var ch = s.charAt(i);
                if (_this.trie[v].down[ch] === undefined) {
                    _this.trie[v].down[ch] = _this.trie.length;
                    _this.trie.push(new Node(v, ch));
                }
                v = _this.trie[v].down[ch];
            }
            _this.trie[v].leaf_count++;
        };
        this.remString = function (s) {
            var v = 0;
            for (var i = 0; i < s.length; i++) {
                var ch = s.charAt(i);
                v = _this.trie[v].down[ch];
            }
            _this.trie[v].leaf_count--;
        };
        this.getLink = function (v) {
            if (_this.trie[v].link === -1) {
                if (v === 0 || _this.trie[v].parent === 0) {
                    _this.trie[v].link = 0;
                }
                else {
                    _this.trie[v].link = _this.nxt(_this.getLink(_this.trie[v].parent), _this.trie[v].me);
                }
            }
            return _this.trie[v].link;
        };
        this.nxt = function (v, ch) {
            if (_this.trie[v].nxt[ch] === undefined) {
                if (_this.trie[v].down[ch] !== undefined) {
                    _this.trie[v].nxt[ch] = _this.trie[v].down[ch];
                }
                else {
                    _this.trie[v].nxt[ch] = v === 0 ? 0 : _this.nxt(_this.getLink(v), ch);
                }
            }
            return _this.trie[v].nxt[ch];
        };
        this.getExitLink = function (v) {
            if (_this.trie[v].exit_link === -1) {
                var curr = _this.getLink(v);
                if (v === 0 || curr === 0) {
                    _this.trie[v].exit_link = 0;
                }
                else if (_this.trie[v].leaf_count > 0) {
                    _this.trie[v].exit_link = curr;
                }
                else {
                    _this.trie[v].exit_link = _this.getExitLink(curr);
                }
            }
            return _this.trie[v].exit_link;
        };
        this.query = function (s) {
            var ans = 0;
            var v = 0;
            var curr_l = 0;
            for (var i = 0; i < s.length; i++) {
                var ch = s.charAt(i);
                v = _this.nxt(v, ch);
                ans += _this.trie[v].leaf_count;
                curr_l = _this.getExitLink(v);
                while (curr_l > 0) {
                    ans += _this.trie[curr_l].leaf_count;
                    curr_l = _this.getExitLink(curr_l);
                }
            }
            return ans;
        };
        this.trie = [];
        this.trie.push(new Node());
    }
    return AhoCorasick;
}());
exports.AhoCorasick = AhoCorasick;
var a = new AhoCorasick();
a.addString("zezo");
a.remString(" zezo");
