import * as md from 'markdown-it';
import * as CommonmarkPreset from 'markdown-it/lib/presets/commonmark';
import * as Prism from 'prismjs';

import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/remove-initial-line-feed/prism-remove-initial-line-feed';
import 'prismjs/plugins/show-language/prism-show-language';

export class SourceTransformer {
    private md: md.MarkdownIt;
    private mdConfig: md.Options;

    constructor() {
        this.mdConfig = {
            ...CommonmarkPreset,
            highlight: this.highlight.bind(this),
            langPrefix: 'language-',
        };
        this.md = new md(this.mdConfig);
    }

    public parse(src: string) {
        const tokens = this.md.parse(src, {});

        const tokenPages = tokens.reduce((collection, next) => {
            if (next.type === 'hr') {
                collection.push([]);
            } else {
                collection[collection.length - 1].push(next);
            }

            return collection;
        }, [[]] as md.Token[][]);

        return tokenPages.map(innerTokens => this.md.renderer.render(innerTokens, this.mdConfig, {}));
    }

    private highlight(str: string, lang: string) {
        const language = lang && Prism.languages[lang];

        if (language) {
            try {
                return `<pre class="language-${lang}"><code>${Prism.highlight(str, language)}</code></pre>`;
            } catch (__) {
                // fall back to default render
            }
        }

        return '<pre class="language-prose"><code>' + this.md.utils.escapeHtml(str) + '</code></pre>';
    }
}
