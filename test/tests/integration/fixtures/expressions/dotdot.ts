import TestBase from "../../TestBase";

export default class extends TestBase {
    getDescription() {
        return 'Twing supports the .. operator';
    }

    getTemplates() {
        return {
            'index.twig': `
{% for i in 0..10 %}{{ i }} {% endfor %}

{% for letter in 'a'..'z' %}{{ letter }} {% endfor %}

{% for letter in 'a'|upper..'z'|upper %}{{ letter }} {% endfor %}

{% for i in foo[0]..foo[1] %}{{ i }} {% endfor %}

{% for i in 0 + 1 .. 10 - 1 %}{{ i }} {% endfor %}`
        };
    }

    getExpected() {
        return `
0 1 2 3 4 5 6 7 8 9 10 
a b c d e f g h i j k l m n o p q r s t u v w x y z 
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 
1 2 3 4 5 6 7 8 9 10 
1 2 3 4 5 6 7 8 9
`;
    }

    getContext() {
        return {
            foo: [1, 10]
        };
    }
}
