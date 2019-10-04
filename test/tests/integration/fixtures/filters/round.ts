import TestBase from "../../TestBase";

export default class extends TestBase {
    getDescription() {
        return '"round" filter';
    }

    getTemplates() {
        return {
            'index.twig': `
{{ 2.7|round }}
{{ 2.1|round }}
{{ 2.1234|round(3, 'floor') }}
{{ 2.1|round(0, 'ceil') }}

{{ 21.3|round(-1)}}
{{ 21.3|round(-1, 'ceil')}}
{{ 21.3|round(-1, 'floor')}}`
        };
    }

    getExpected() {
        return `
3
2
2.123
3

20
30
20
`;
    }
}
