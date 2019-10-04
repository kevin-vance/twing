import TestBase from "../../TestBase";

export default class extends TestBase {
    getDescription() {
        return '"url_encode" filter';
    }

    getTemplates() {
        return {
            'index.twig': `
{{ {foo: "bar", number: 3, "spéßi%l": "e%c0d@d", "spa ce": ""}|url_encode }}
{{ {foo: "bar", number: 3, "spéßi%l": "e%c0d@d", "spa ce": ""}|url_encode|raw }}
{{ {}|url_encode|default("default") }}
{{ 'spéßi%le%c0d@dspa ce'|url_encode }}`
        };
    }

    getExpected() {
        return `
foo=bar&amp;number=3&amp;sp%C3%A9%C3%9Fi%25l=e%25c0d%40d&amp;spa%20ce=
foo=bar&number=3&sp%C3%A9%C3%9Fi%25l=e%25c0d%40d&spa%20ce=
default
sp%C3%A9%C3%9Fi%25le%25c0d%40dspa%20ce
`;
    }
}
