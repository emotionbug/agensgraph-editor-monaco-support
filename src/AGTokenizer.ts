import {InputStream} from 'antlr4'
import {languages} from 'monaco-editor'
import CypherLexer from "cypher-editor-support/dist/_generated/CypherLexer";

class CypherState implements languages.IState {
    clone() {
        return new CypherState()
    }

    equals() {
        return true
    }
}

export class CypherTokensProvider implements languages.TokensProvider {
    getInitialState(): CypherState {
        return new CypherState()
    }

    tokenize(line: string): languages.ILineTokens {
        const lexer = new CypherLexer(new InputStream(line))

        return {
            endState: new CypherState(),
            tokens: lexer
                .getAllTokens()
                .filter((token) => token !== null && token.type !== -1)
                .map((token) => ({
                    scopes:
                        (
                            CypherLexer.symbolicNames[token.type] ??
                            CypherLexer.literalNames[token.type] ??
                            ''
                        ).toLowerCase() + '.cypher',
                    startIndex: token.column
                }))
                .sort((a, b) => (a.startIndex > b.startIndex ? 1 : -1))
        }
    }
}
