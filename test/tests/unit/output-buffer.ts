import {Test} from "tape";
import TwingOutputBuffer from "../../../src/output-buffer";

const tap = require('tap');

let reset = () => {
    while (TwingOutputBuffer.obGetLevel()) {
        TwingOutputBuffer.obEndFlush();
    }

    TwingOutputBuffer.obStart();
    TwingOutputBuffer.echo('foo');
    TwingOutputBuffer.obStart();
    TwingOutputBuffer.echo('bar');
    TwingOutputBuffer.obStart();
    TwingOutputBuffer.echo('oof');
};

tap.test('TwingOutputBuffer', function (test: Test) {
    test.test('obStart', function (test: Test) {
        TwingOutputBuffer.obStart();

        test.equal(TwingOutputBuffer.obGetLevel(), 1, 'obGetLevel() should return 1');

        TwingOutputBuffer.obStart();

        test.equal(TwingOutputBuffer.obGetLevel(), 2, 'obGetLevel() should return 2');
        test.end();
    });

    test.test('obEndFlush', function (test: Test) {
        reset();
        TwingOutputBuffer.obEndFlush();

        test.equal(TwingOutputBuffer.obGetLevel(), 2, 'obGetLevel() should return 2');
        test.same(TwingOutputBuffer.obGetContents(), 'baroof', `obGetContents() should return 'baroof'`);

        test.end();
    });

    test.test('obFlush', function (test: Test) {
        reset();
        TwingOutputBuffer.obFlush();

        test.same(TwingOutputBuffer.obGetContents(), '', `obGetContents() should return ''`);
        test.end();
    });

    test.test('obGetFlush', function (test: Test) {
        reset();

        test.same(TwingOutputBuffer.obGetFlush(), 'oof', `obGetFlush() should return 'oof'`);
        test.same(TwingOutputBuffer.obGetContents(), 'baroof', `obGetContents() should return 'baroof'`);

        test.end();
    });

    test.test('obClean', function (test: Test) {
        reset();
        TwingOutputBuffer.obClean();

        test.equal(TwingOutputBuffer.obGetLevel(), 3, 'obGetLevel() should return 3');
        test.same(TwingOutputBuffer.obGetContents(), '', `obGetContents() should return ''`);
        test.end();
    });


    test.test('obGetClean', function (test: Test) {
        reset();

        test.same(TwingOutputBuffer.obGetClean(), 'oof', `obGetClean() should return 'oof'`);

        test.end();
    });

    test.test('obEndClean', function (test: Test) {
        reset();

        test.true(TwingOutputBuffer.obEndClean(), `obEndClean() should return trusty`);
        test.equal(TwingOutputBuffer.obGetLevel(), 2, 'obGetLevel() should return 2');
        test.same(TwingOutputBuffer.obGetContents(), 'bar', `obGetContents() should return 'bar'`);

        test.end();
    });

    test.end();
});
