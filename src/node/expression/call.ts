import TwingNodeExpression from "../expression";
import TwingMap from "../../map";
import TwingNode from "../../node";
import TwingErrorSyntax from "../../error/syntax";
import TwingNodeExpressionConstant from "./constant";
import TwingNodeExpressionArray from "./array";
import TwingReflectionParameter from "../../reflection-parameter";
import TwingReflectionMethod from "../../reflection-method";
import TwingCompiler from "../../compiler";
import TwingExtension from "../../extension";

const array_merge = require('locutus/php/array/array_merge');
const snakeCase = require('snake-case');
const capitalize = require('capitalize');

interface TwingNodeExpressionCallReflector {
    r: TwingReflectionMethod;
    callable: Function;
}

abstract class TwingNodeExpressionCall extends TwingNodeExpression {
    private reflector: TwingNodeExpressionCallReflector;

    protected compileCallable(compiler: TwingCompiler) {
        let callable = this.getAttribute('callable');
        let closingParenthesis = false;

        // compiler
        //     .raw('(() => {\n')
        //     .indent()
        //     .write('try {\n')
        //     .indent()
        //     .write('return ')
        // ;

        let [r, callable_] = this.reflectCallable(callable);

        if (r instanceof TwingReflectionMethod && typeof callable_[0] === 'string') {
            if (r.isStatic()) {
                compiler.raw(`${callable_[0]}::${callable_[1]}`);
            }
            else {
                compiler.raw(`this.env.getRuntime('${callable_[0]}').${callable_[1]}`);
            }
        }
        else if (r instanceof TwingReflectionMethod && callable_[0] instanceof TwingExtension) {
            compiler.raw(`this.env.getExtension('${callable_[0].constructor.name}').${callable[1]}`);
        }
        else {
            closingParenthesis = true;

            compiler.raw(`this.env.get${capitalize(this.getAttribute('type'))}('${this.getAttribute('name')}').getCallable()(...`);
        }

        this.compileArguments(compiler);

        if (closingParenthesis) {
            compiler.raw(')');
        }

        // compiler
        //     .raw(';\n')
        //     .outdent()
        //     .write('}\n')
        //     .write('catch (e) {\n')
        //     .indent()
        //     .write('if (e instanceof Twing.TwingError) {\n')
        //     .indent()
        //     .write(`e.setTemplateLine(${this.lineno});\n`)
        //     .outdent()
        //     .write('}\n')
        //     .write('throw e;\n')
        //     .outdent()
        //     .write('}\n')
        //     .outdent()
        //     .write('})()')
        // ;
    }

    protected compileArguments(compiler: TwingCompiler) {
        compiler.raw('[');

        let first = true;

        if (this.hasAttribute('needs_environment') && this.getAttribute('needs_environment')) {
            compiler.raw('this.env');

            first = false;
        }

        if (this.hasAttribute('needs_context') && this.getAttribute('needs_context')) {
            if (!first) {
                compiler.raw(', ');
            }

            compiler.raw('context');

            first = false;
        }

        if (this.hasAttribute('arguments')) {
            for (let argument_ of this.getAttribute('arguments')) {
                if (!first) {
                    compiler.raw(', ');
                }

                compiler.string(argument_);

                first = false;
            }
        }

        if (this.hasNode('node')) {
            if (!first) {
                compiler.raw(', ');
            }

            compiler.subcompile(this.getNode('node'));

            first = false;
        }

        if (this.hasNode('arguments')) {
            let callable = this.getAttribute('callable');
            let arguments_ = this.getArguments(callable, this.getNode('arguments'));

            for (let node of arguments_) {
                if (!first) {
                    compiler.raw(', ');
                }

                compiler.subcompile(node);

                first = false;
            }
        }

        compiler.raw(']');
    }

    protected getArguments(callable: Function = null, argumentsNode: TwingNode): Array<TwingNode> {
        let self = this;
        let callType = this.getAttribute('type');
        let callName = this.getAttribute('name');

        let parameters: TwingMap<string, TwingNode> = new TwingMap();
        let named = false;

        for (let [name, node] of argumentsNode.getNodes()) {
            if (typeof name !== 'number') {
                named = true;
                name = self.normalizeName(name);
            }
            else if (named) {
                throw new TwingErrorSyntax(`Positional arguments cannot be used after named arguments for ${callType} "${callName}".`);
            }

            parameters.set(name, node);
        }

        let isVariadic = this.hasAttribute('is_variadic') && this.getAttribute('is_variadic');

        if (!named && !isVariadic) {
            // console.warn('arguments_', ...parameters.values());

            return [...parameters.values()];
        }

        let message: string;

        if (!callable) {
            if (named) {
                message = `Named arguments are not supported for ${callType} "${callName}".`;
            }
            else {
                message = `Arbitrary positional arguments are not supported for ${callType} "${callName}".`;
            }

            throw new Error(message);
        }

        let callableParameters = this.getCallableParameters(callable, isVariadic);
        let arguments_: Array<TwingNode> = [];

        let names: Array<string> = [];
        let missingArguments: Array<string> = [];
        let optionalArguments: Array<string | TwingNodeExpressionConstant> = [];
        let pos = 0;

        for (let callableParameter of callableParameters) {
            let name = '' + self.normalizeName(callableParameter.getName());

            names.push(name);

            if (parameters.has(name)) {
                if (parameters.has(pos)) {
                    throw new TwingErrorSyntax(`Argument "${name}" is defined twice for ${callType} "${callName}".`);
                }

                if (missingArguments.length) {
                    throw new TwingErrorSyntax(`Argument "${name}" could not be assigned for ${callType} "${callName}(${names.join(', ')})" because it is mapped to an internal PHP function which cannot determine default value for optional argument${missingArguments.length > 1 ? 's' : ''} "${missingArguments.join(', ')}".`);
                }

                arguments_ = array_merge(arguments_, optionalArguments);
                arguments_.push(parameters.get(name));
                parameters.delete(name);
                optionalArguments = [];
            }
            else if (parameters.has(pos)) {
                arguments_ = array_merge(arguments_, optionalArguments);
                arguments_.push(parameters.get(pos));
                parameters.delete(pos);
                optionalArguments = [];
                ++pos;
            }
            else if (callableParameter.isDefaultValueAvailable()) {
                optionalArguments.push(new TwingNodeExpressionConstant(callableParameter.getDefaultValue(), -1));
            }
            else if (callableParameter.isOptional()) {
                if (parameters.size < 1) {
                    break;
                }
                else {
                    missingArguments.push(name);
                }
            }
            else {
                throw new TwingErrorSyntax(`Value for argument "${name}" is required for ${callType} "${callName}".`);
            }
        }

        if (isVariadic) {
            let arbitraryArguments = new TwingNodeExpressionArray(new TwingMap(), -1);
            let resolvedKeys: Array<any> = [];

            for (let [key, value] of parameters) {
                if (Number.isInteger(key)) {
                    arbitraryArguments.addElement(value);
                }
                else {
                    arbitraryArguments.addElement(value, new TwingNodeExpressionConstant(key, -1));
                }

                resolvedKeys.push(key);
            }

            for (let key of resolvedKeys) {
                parameters.delete(key);
            }

            if (arbitraryArguments.count()) {
                arguments_ = array_merge(arguments_, optionalArguments);
                arguments_.push(arbitraryArguments);
            }
        }

        if (parameters.size > 0) {
            let unknownParameter = [...parameters.values()].find(function (parameter) {
                return parameter instanceof TwingNode;
            });

            throw new TwingErrorSyntax(`Unknown argument${parameters.size > 1 ? 's' : ''} "${[...parameters.keys()].join(', ')}" for ${callType} "${callName}(${names.join(', ')})".`, unknownParameter ? unknownParameter.getTemplateLine() : -1, self.getTemplateName());
        }

        return arguments_;
    }

    protected normalizeName(name: string) {
        return snakeCase(name).toLowerCase();
    }

    private getCallableParameters(callable: Function, isVariadic: boolean): Array<TwingReflectionParameter> {
        let r = this.reflectCallable(callable)[0];

        if (!r) {
            return [];
        }

        let parameters = r.getParameters();

        if (this.hasNode('node')) {
            parameters.shift();
        }

        if (this.hasAttribute('needs_environment') && this.getAttribute('needs_environment')) {
            parameters.shift();
        }

        if (this.hasAttribute('needs_context') && this.getAttribute('needs_context')) {
            parameters.shift();
        }

        if (this.hasAttribute('arguments') && this.getAttribute('arguments')) {
            this.getAttribute('arguments').forEach(function () {
                parameters.shift();
            });
        }

        if (isVariadic) {
            let argument_ = parameters[parameters.length - 1];

            if (argument_ && argument_.isArray() && argument_.isDefaultValueAvailable() && argument_.getDefaultValue() === []) {
                parameters.pop();
            }
            else {
                let callableName = r.getName();

                // todo: should we support this?
                // if (r instanceof ReflectionMethod) {
                //     $callableName = $r->getDeclaringClass()->name.'::'.$callableName;
                // }

                throw new Error(`The last parameter of "${callableName}" for ${this.getAttribute('type')} "${this.getAttribute('name')}" must be an array with default value, eg. "array $arg = array()".`);
            }
        }

        return parameters;
    }

    private reflectCallable(callable: Function): Array<any> {
        let r: TwingReflectionMethod;

        r = new TwingReflectionMethod(callable);

        this.reflector = {
            r: r,
            callable: callable
        };

        return [r, callable];
    }
}

export default TwingNodeExpressionCall;

