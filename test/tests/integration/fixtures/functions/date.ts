import TestBase from "../../TestBase";
const Luxon = require('luxon');

export default class extends TestBase {
    getDescription() {
        return '"date" function';
    }

    getTemplates() {
        return {
            'index.twig': `{# see https://github.com/twigphp/Twig/issues/2667 #}
{#{{ date().format('r') == date('now').format('r') ? 'OK' : 'KO' }}#}
{{ date(date1) == date('2010-10-04 13:45') ? 'OK' : 'KO' }}
{{ date(date2) == date('2010-10-04 13:45') ? 'OK' : 'KO' }}
{{ date(date3) == date('2010-10-04 13:45') ? 'OK' : 'KO' }}
{{ date(date4) == date('2010-10-04 13:45') ? 'OK' : 'KO' }}
{{ date(date5) == date('1964-01-02 03:04') ? 'OK' : 'KO' }}
{{ date() > date('-1day') ? 'OK' : 'KO' }}
{# named arguments #}
{{ date(date, "America/New_York")|date('d/m/Y H:i:s P', false) }}
{{ date(timezone="America/New_York", date=date)|date('d/m/Y H:i:s P', false) }}`
        };
    }

    getExpected() {
        return `
OK
OK
OK
OK
OK
OK
04/10/2010 09:45:00 -04:00
04/10/2010 09:45:00 -04:00
`;
    }

    getContext() {
        Luxon.Settings.defaultZoneName = 'UTC';

        return {
            date: Luxon.DateTime.fromObject({year: 2010, month: 10, day: 4, hour: 13, minute: 45}),
            date1: Luxon.DateTime.fromObject({year: 2010, month: 10, day: 4, hour: 13, minute: 45}),
            date2: Luxon.DateTime.fromObject({year: 2010, month: 10, day: 4, hour: 13, minute: 45}),
            date3: '2010-10-04 13:45',
            date4: 1286199900, // DateTime::createFromFormat('Y-m-d H:i', '2010-10-04 13:45', new DateTimeZone('UTC'))->getTimestamp() -- A unixtimestamp is always GMT
            date5: -189291360, // DateTime::createFromFormat('Y-m-d H:i', '1964-01-02 03:04', new DateTimeZone('UTC'))->getTimestamp()
        }
    }
}
