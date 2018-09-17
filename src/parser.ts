// import * as marked from 'marked';
import * as Remarkable from 'remarkable';
import * as Commonmark from 'remarkable/lib/configs/commonmark';

export class SourceTransformer {
    private md: Remarkable;
    private mdConfig: Remarkable.Options;

    constructor() {
        this.mdConfig = Commonmark;
        this.md = new Remarkable(this.mdConfig);

        // tslint:disable-next-line:no-console
        console.log(this.md);
    }

    public parse(src: string) {
        const tokens = this.md.parse(src, {});

        const tokenPages = tokens.reduce((collection, next) => {
            if(next.type === 'hr') {
                collection.push([]);
            } else {
                collection[collection.length - 1].push(next);
            }

            return collection;
        }, [[]] as Remarkable.Token[][]);

        return tokenPages.map(innerTokens => this.md.renderer.render(innerTokens, this.mdConfig, {}));
    }
}
