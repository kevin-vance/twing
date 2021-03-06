import TestBase from "../../../TestBase";

export default class extends TestBase {
    getDescription() {
        return '"autoescape" tag handles filters preserving the safety';
    }

    getTemplates() {
        return {
            'index.twig': `
{% autoescape 'html' %}

(preserves_safety is preserving safety for "html")

1. Unsafe values are still unsafe
( var|preserves_safety|escape )
{{ var|preserves_safety }}

2. Safe values are still safe
( var|escape|preserves_safety )
{{ var|escape|preserves_safety }}

3. Re-escape values that are escaped for an other contexts
( var|escape_something|preserves_safety|escape )
{{ var|escape_something|preserves_safety }}

4. Still escape when using filters not declared safe
( var|escape|preserves_safety|replace({'FABIEN': 'FABPOT'})|escape )
{{ var|escape|preserves_safety|replace({'FABIEN': 'FABPOT'}) }}

{% endautoescape %}`
        };
    }

    getExpected() {
        return `

(preserves_safety is preserving safety for "html")

1. Unsafe values are still unsafe
( var|preserves_safety|escape )
&lt;FABIEN&gt;
TWIG

2. Safe values are still safe
( var|escape|preserves_safety )
&LT;FABIEN&GT;
TWIG

3. Re-escape values that are escaped for an other contexts
( var|escape_something|preserves_safety|escape )
&lt;FABIEN&gt;
TWIG

4. Still escape when using filters not declared safe
( var|escape|preserves_safety|replace({'FABIEN': 'FABPOT'})|escape )
&amp;LT;FABPOT&amp;GT;
TWIG

`;
    }


    getContext() {
        return {
            var: `<Fabien>\nTwig`
        };
    }
}
