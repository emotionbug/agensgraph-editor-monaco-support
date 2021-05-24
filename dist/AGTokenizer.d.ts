import { languages } from 'monaco-editor';
declare class CypherState implements languages.IState {
    clone(): CypherState;
    equals(): boolean;
}
export declare class CypherTokensProvider implements languages.TokensProvider {
    getInitialState(): CypherState;
    tokenize(line: string): languages.ILineTokens;
}
export {};
