const Twing = require('../../../lib/twing');

const tap = require('tap');
const path = require('path');

tap.test('Twing library', function (test) {
    let exports = {
        abs: './twing/helper/abs',
        compare: './twing/helper/compare',
        compareArray: './twing/helper/compare-to-array',
        compareNumber: './twing/helper/compare-to-number',
        compareString: './twing/helper/compare-to-string',
        compareToBoolean: './twing/helper/compare-to-boolean',
        compareToDateTime: './twing/helper/compare-to-date-time',
        compareToNull: './twing/helper/compare-to-null',
        defined: './twing/helper/defined',
        escape: './twing/helper/escape',
        formatDateInterval: './twing/helper/format-date-interval',
        formatDateTime: './twing/helper/format-date-time',
        getContextProxy: './twing/helper/get-context-proxy',
        iconv: './twing/helper/iconv',
        isCountable: './twing/helper/is-countable',
        isTraversable: './twing/helper/is-traversable',
        iteratorToArray: './twing/helper/iterator-to-array',
        iteratorToHash: './twing/helper/iterator-to-hash',
        iteratorToMap: './twing/helper/iterator-to-map',
        jsonEncode: './twing/helper/json-encode',
        max: './twing/helper/max',
        min: './twing/helper/min',
        range: './twing/helper/range',
        regexParser: './twing/helper/regex-parser',
        relativeDate: './twing/helper/relative-date',
        twingArrayBatch: './twing/extension/core',
        twingArrayMerge: './twing/extension/core',
        TwingBaseNodeVisitor: './twing/base-node-visitor',
        TwingCacheFilesystem: './twing/cache/filesystem',
        TwingCacheNull: './twing/cache/null',
        twingCapitalizeStringFilter: './twing/extension/core',
        TwingCompiler: './twing/compiler',
        twingConstant: './twing/extension/core',
        twingConvertEncoding: './twing/extension/core',
        twingCycle: './twing/extension/core',
        twingDateConverter: './twing/extension/core',
        twingDateFormatFilter: './twing/extension/core',
        twingDateModifyFilter: './twing/extension/core',
        twingDefaultFilter: './twing/extension/core',
        twingEnsureTraversable: './twing/extension/core',
        TwingEnvironment: './twing/environment',
        TwingError: './twing/error',
        TwingErrorLoader: './twing/error/loader',
        TwingErrorRuntime: './twing/error/runtime',
        TwingErrorSyntax: './twing/error/syntax',
        twingEscapeFilter: './twing/extension/core',
        twingEscapeFilterIsSafe: './twing/extension/core',
        TwingExpressionParser: './twing/expression-parser',
        TwingExtension: './twing/extension',
        TwingExtensionCore: './twing/extension/core',
        TwingExtensionDebug: './twing/extension/debug',
        TwingExtensionEscaper: './twing/extension/escaper',
        TwingExtensionOptimizer: './twing/extension/optimizer',
        TwingExtensionProfiler: './twing/extension/profiler',
        TwingExtensionSandbox: './twing/extension/sandbox',
        TwingExtensionSet: './twing/extension-set',
        TwingExtensionStaging: './twing/extension/staging',
        TwingExtensionStringLoader: './twing/extension/string-loader',
        TwingFileExtensionEscapingStrategy: './twing/file-extension-escaping-strategy',
        TwingFilter: './twing/filter',
        twingFirst: './twing/extension/core',
        TwingFunction: './twing/function',
        twingGetAttribute: './twing/extension/core',
        twingInFilter: './twing/extension/core',
        twingJoinFilter: './twing/extension/core',
        twingLast: './twing/extension/core',
        twingLengthFilter: './twing/extension/core',
        TwingLexer: './twing/lexer',
        TwingLoaderArray: './twing/loader/array',
        TwingLoaderChain: './twing/loader/chain',
        TwingLoaderFilesystem: './twing/loader/filesystem',
        twingLowerFilter: './twing/extension/core',
        TwingMap: './twing/map',
        TwingMarkup: './twing/markup',
        TwingNode: './twing/node',
        TwingNodeAutoEscape: './twing/node/auto-escape',
        TwingNodeBlock: './twing/node/block',
        TwingNodeBlockReference: './twing/node/block-reference',
        TwingNodeBody: './twing/node/body',
        TwingNodeCheckSecurity: './twing/node/check-security',
        TwingNodeDo: './twing/node/do',
        TwingNodeEmbed: './twing/node/embed',
        TwingNodeExpression: './twing/node/expression',
        TwingNodeExpressionArray: './twing/node/expression/array',
        TwingNodeExpressionAssignName: './twing/node/expression/assign-name',
        TwingNodeExpressionBinary: './twing/node/expression/binary',
        TwingNodeExpressionBinaryAdd: './twing/node/expression/binary/add',
        TwingNodeExpressionBinaryAnd: './twing/node/expression/binary/and',
        TwingNodeExpressionBinaryBitwiseAnd: './twing/node/expression/binary/bitwise-and',
        TwingNodeExpressionBinaryBitwiseOr: './twing/node/expression/binary/bitwise-or',
        TwingNodeExpressionBinaryBitwiseXor: './twing/node/expression/binary/bitwise-xor',
        TwingNodeExpressionBinaryConcat: './twing/node/expression/binary/concat',
        TwingNodeExpressionBinaryDiv: './twing/node/expression/binary/div',
        TwingNodeExpressionBinaryEndsWith: './twing/node/expression/binary/ends-with',
        TwingNodeExpressionBinaryEqual: './twing/node/expression/binary/equal',
        TwingNodeExpressionBinaryFloorDiv: './twing/node/expression/binary/floor-div',
        TwingNodeExpressionBinaryGreater: './twing/node/expression/binary/greater',
        TwingNodeExpressionBinaryGreaterEqual: './twing/node/expression/binary/greater-equal',
        TwingNodeExpressionBinaryIn: './twing/node/expression/binary/in',
        TwingNodeExpressionBinaryLess: './twing/node/expression/binary/less',
        TwingNodeExpressionBinaryLessEqual: './twing/node/expression/binary/less-equal',
        TwingNodeExpressionBinaryMatches: './twing/node/expression/binary/matches',
        TwingNodeExpressionBinaryMod: './twing/node/expression/binary/mod',
        TwingNodeExpressionBinaryMul: './twing/node/expression/binary/mul',
        TwingNodeExpressionBinaryNotEqual: './twing/node/expression/binary/not-equal',
        TwingNodeExpressionBinaryNotIn: './twing/node/expression/binary/not-in',
        TwingNodeExpressionBinaryOr: './twing/node/expression/binary/or',
        TwingNodeExpressionBinaryPower: './twing/node/expression/binary/power',
        TwingNodeExpressionBinaryRange: './twing/node/expression/binary/range',
        TwingNodeExpressionBinaryStartsWith: './twing/node/expression/binary/starts-with',
        TwingNodeExpressionBinarySub: './twing/node/expression/binary/sub',
        TwingNodeExpressionBlockReference: './twing/node/expression/block-reference',
        TwingNodeExpressionCall: './twing/node/expression/call',
        TwingNodeExpressionConditional: './twing/node/expression/conditional',
        TwingNodeExpressionConstant: './twing/node/expression/constant',
        TwingNodeExpressionFilter: './twing/node/expression/filter',
        TwingNodeExpressionFilterDefault: './twing/node/expression/filter/default',
        TwingNodeExpressionFunction: './twing/node/expression/function',
        TwingNodeExpressionGetAttr: './twing/node/expression/get-attr',
        TwingNodeExpressionHash: './twing/node/expression/hash',
        TwingNodeExpressionMethodCall: './twing/node/expression/method-call',
        TwingNodeExpressionName: './twing/node/expression/name',
        TwingNodeExpressionNullCoalesce: './twing/node/expression/null-coalesce',
        TwingNodeExpressionParent: './twing/node/expression/parent',
        TwingNodeExpressionTest: './twing/node/expression/test',
        TwingNodeExpressionTestConstant: './twing/node/expression/test/constant',
        TwingNodeExpressionTestDefined: './twing/node/expression/test/defined',
        TwingNodeExpressionTestDivisibleBy: './twing/node/expression/test/divisible-by',
        TwingNodeExpressionTestEven: './twing/node/expression/test/even',
        TwingNodeExpressionTestNull: './twing/node/expression/test/null',
        TwingNodeExpressionTestOdd: './twing/node/expression/test/odd',
        TwingNodeExpressionTestSameAs: './twing/node/expression/test/same-as',
        TwingNodeExpressionUnary: './twing/node/expression/unary',
        TwingNodeExpressionUnaryNeg: './twing/node/expression/unary/neg',
        TwingNodeExpressionUnaryNot: './twing/node/expression/unary/not',
        TwingNodeExpressionUnaryPos: './twing/node/expression/unary/pos',
        TwingNodeFlush: './twing/node/flush',
        TwingNodeFor: './twing/node/for',
        TwingNodeForLoop: './twing/node/for-loop',
        TwingNodeIf: './twing/node/if',
        TwingNodeImport: './twing/node/import',
        TwingNodeInclude: './twing/node/include',
        TwingNodeMacro: './twing/node/macro',
        TwingNodeModule: './twing/node/module',
        TwingNodePrint: './twing/node/print',
        TwingNodeSandbox: './twing/node/sandbox',
        TwingNodeSandboxedPrint: './twing/node/sandboxed-print',
        TwingNodeSet: './twing/node/set',
        TwingNodeSpaceless: './twing/node/spaceless',
        TwingNodeText: './twing/node/text',
        TwingNodeTraverser: './twing/node-traverser',
        TwingNodeVisitorEscaper: './twing/node-visitor/escaper',
        TwingNodeVisitorOptimizer: './twing/node-visitor/optimizer',
        TwingNodeVisitorSafeAnalysis: './twing/node-visitor/safe-analysis',
        TwingNodeVisitorSandbox: './twing/node-visitor/sandbox',
        TwingNodeWith: './twing/node/with',
        twingNumberFormatFilter: './twing/extension/core',
        TwingOutputBuffering: './twing/output-buffering',
        TwingOutputHandler: './twing/output-buffering',
        TwingParser: './twing/parser',
        TwingProfilerDumperBase: './twing/profiler/dumper/base',
        TwingProfilerDumperBlackfire: './twing/profiler/dumper/blackfire',
        TwingProfilerDumperHtml: './twing/profiler/dumper/html',
        TwingProfilerDumperText: './twing/profiler/dumper/text',
        TwingProfilerNodeEnterProfile: './twing/profiler/node/enter-profile',
        TwingProfilerNodeLeaveProfile: './twing/profiler/node/leave-profile',
        TwingProfilerNodeVisitorProfiler: './twing/profiler/node-visitor/profiler',
        TwingProfilerProfile: './twing/profiler/profile',
        twingRandom: './twing/extension/core',
        twingRawFilter: './twing/extension/escaper',
        TwingReflectionMethod: './twing/reflection-method',
        TwingReflectionParameter: './twing/reflection-parameter',
        twingReplaceFilter: './twing/extension/core',
        twingReverseFilter: './twing/extension/core',
        twingRound: './twing/extension/core',
        TwingRuntimeLoaderInterface: './twing/runtime-loader-interface',
        TwingSandboxSecurityError: './twing/sandbox/security-error',
        TwingSandboxSecurityNotAllowedFilterError: './twing/sandbox/security-not-allowed-filter-error',
        TwingSandboxSecurityNotAllowedFunctionError: './twing/sandbox/security-not-allowed-function-error',
        TwingSandboxSecurityNotAllowedTagError: './twing/sandbox/security-not-allowed-tag-error',
        TwingSandboxSecurityPolicy: './twing/sandbox/security-policy',
        twingSlice: './twing/extension/core',
        twingSortFilter: './twing/extension/core',
        twingSource: './twing/extension/core',
        TwingSource: './twing/source',
        twingSplitFilter: './twing/extension/core',
        TwingTemplate: './twing/template',
        twingTemplateFromString: './twing/extension/string-loader',
        TwingTemplateWrapper: './twing/template-wrapper',
        TwingTest: './twing/test',
        twingTestEmpty: './twing/extension/core',
        twingTestIterable: './twing/extension/core',
        twingTitleStringFilter: './twing/extension/core',
        TwingTokenParser: './twing/token-parser',
        TwingTokenParserAutoEscape: './twing/token-parser/auto-escape',
        TwingTokenParserBlock: './twing/token-parser/block',
        TwingTokenParserDo: './twing/token-parser/do',
        TwingTokenParserEmbed: './twing/token-parser/embed',
        TwingTokenParserExtends: './twing/token-parser/extends',
        TwingTokenParserFilter: './twing/token-parser/filter',
        TwingTokenParserFlush: './twing/token-parser/flush',
        TwingTokenParserFor: './twing/token-parser/for',
        TwingTokenParserFrom: './twing/token-parser/from',
        TwingTokenParserIf: './twing/token-parser/if',
        TwingTokenParserImport: './twing/token-parser/import',
        TwingTokenParserInclude: './twing/token-parser/include',
        TwingTokenParserMacro: './twing/token-parser/macro',
        TwingTokenParserSandbox: './twing/token-parser/sandbox',
        TwingTokenParserSet: './twing/token-parser/set',
        TwingTokenParserSpaceless: './twing/token-parser/spaceless',
        TwingTokenParserUse: './twing/token-parser/use',
        TwingTokenParserWith: './twing/token-parser/with',
        TwingTokenStream: './twing/token-stream',
        twingTrimFilter: './twing/extension/core',
        twingUpperFilter: './twing/extension/core',
        twingUrlencodeFilter: './twing/extension/core',
        twingVarDump: './twing/extension/debug',
        varDump: './twing/helper/var-dump'
    };

    for (let key in exports) {
        let fileName = exports[key];

        let exportedSymbol = require(path.resolve('lib', fileName))[key];

        test.same(exportedSymbol, Twing[key], `${key} is exported`);
    }

    test.end();
});