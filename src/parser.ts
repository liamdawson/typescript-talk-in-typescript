import * as marked from 'marked';

export class SourceParser {
    public static get Lexer() {
        const lexer = new marked.Lexer();
        return lexer;
    }

    public static get Renderer() {
        const renderer = new marked.Renderer();
        return renderer;
    }

    public static parse(source: string) {
        return '';
    }
}