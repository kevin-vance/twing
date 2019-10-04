import * as tape from "tape";
import {merge} from "../../../../../../../../src/lib/extension/core/filters/merge";

tape('merge', (test) => {
    try {
        merge(null, new Map());

        test.fail();
    } catch (e) {
        test.same(e.message, 'The merge filter only works with arrays or "Traversable", got "null" as first argument.');
    }

    try {
        merge(new Map(), null);

        test.fail();
    } catch (e) {
        test.same(e.message, 'The merge filter only works with arrays or "Traversable", got "null" as second argument.');
    }

    try {
        merge(undefined, new Map());

        test.fail();
    } catch (e) {
        test.same(e.message, 'The merge filter only works with arrays or "Traversable", got "undefined" as first argument.');
    }

    try {
        merge(new Map(), undefined);

        test.fail();
    } catch (e) {
        test.same(e.message, 'The merge filter only works with arrays or "Traversable", got "undefined" as second argument.');
    }

    try {
        merge('a' as any, new Map());

        test.fail();
    } catch (e) {
        test.same(e.message, 'The merge filter only works with arrays or "Traversable", got "string" as first argument.');
    }

    try {
        merge(new Map(), 'a' as any);

        test.fail();
    } catch (e) {
        test.same(e.message, 'The merge filter only works with arrays or "Traversable", got "string" as second argument.');
    }

    test.same(merge(new Map([[0, 'a']]), new Map([[0, 'b']])), new Map([[0, 'a'], [1, 'b']]));

    test.end();
});
