import TestBase from "../../../TestBase";

export default class extends TestBase {
    getDescription() {
        return '"autoescape" tag applies escaping after calling filters, and before calling pre_escape filters';
    }

    getTemplates() {
        return {
            'index.twig': `
{% autoescape 'html' %}

(nl2br is pre_escaped for "html" and declared safe for "html")

1. Pre-escape and don't post-escape
( var|escape|nl2br )
{{ var|nl2br }}

2. Don't double-pre-escape
( var|escape|nl2br )
{{ var|escape|nl2br }}

3. Don't escape safe values
( var|raw|nl2br )
{{ var|raw|nl2br }}

4. Don't escape safe values
( var|escape|nl2br|nl2br )
{{ var|nl2br|nl2br }}

5. Re-escape values that are escaped for an other contexts
( var|escape_something|escape|nl2br )
{{ var|escape_something|nl2br }}

6. Still escape when using filters not declared safe
( var|escape|nl2br|upper|escape )
{{ var|nl2br|upper }}

{% endautoescape %}`
        };
    }

    getExpected() {
        return `

(nl2br is pre_escaped for "html" and declared safe for "html")

1. Pre-escape and don't post-escape
( var|escape|nl2br )
&lt;Fabien&gt;<br />
Twig

2. Don't double-pre-escape
( var|escape|nl2br )
&lt;Fabien&gt;<br />
Twig

3. Don't escape safe values
( var|raw|nl2br )
<Fabien><br />
Twig

4. Don't escape safe values
( var|escape|nl2br|nl2br )
&lt;Fabien&gt;<br /><br />
Twig

5. Re-escape values that are escaped for an other contexts
( var|escape_something|escape|nl2br )
&lt;FABIEN&gt;<br />
TWIG

6. Still escape when using filters not declared safe
( var|escape|nl2br|upper|escape )
&amp;LT;FABIEN&amp;GT;&lt;BR /&gt;
TWIG

`;
    }


    getContext() {
        return {
            var: `<Fabien>\nTwig`
        };
    }
}
