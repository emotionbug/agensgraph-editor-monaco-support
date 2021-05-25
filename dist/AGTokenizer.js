"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CypherTokensProvider = void 0;
const antlr4_1 = require("antlr4");
const CypherLexer_1 = __importDefault(require("cypher-editor-support/src/_generated/CypherLexer"));
class CypherState {
    clone() {
        return new CypherState();
    }
    equals() {
        return true;
    }
}
class CypherTokensProvider {
    getInitialState() {
        return new CypherState();
    }
    tokenize(line) {
        const lexer = new CypherLexer_1.default(new antlr4_1.InputStream(line));
        return {
            endState: new CypherState(),
            tokens: lexer
                .getAllTokens()
                .filter((token) => token !== null && token.type !== -1)
                .map((token) => {
                var _a, _b;
                return ({
                    scopes: ((_b = (_a = CypherLexer_1.default.symbolicNames[token.type]) !== null && _a !== void 0 ? _a : CypherLexer_1.default.literalNames[token.type]) !== null && _b !== void 0 ? _b : '').toLowerCase() + '.cypher',
                    startIndex: token.column
                });
            })
                .sort((a, b) => (a.startIndex > b.startIndex ? 1 : -1))
        };
    }
}
exports.CypherTokensProvider = CypherTokensProvider;
