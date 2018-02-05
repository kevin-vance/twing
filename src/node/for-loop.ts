import TwingNode from "../node";
import TwingMap from "../map";
import TwingCompiler from "../compiler";

class TwingNodeForLoop extends TwingNode {
    constructor(lineno: number, tag: string = null) {
        let attributes = new TwingMap();

        attributes.set('with_loop', false);
        attributes.set('ifexpr', false);
        attributes.set('else', false);

        super(new TwingMap(), attributes, lineno, tag);
    }

    compile(compiler: TwingCompiler) {
        if (this.getAttribute('else')) {
            compiler.write("context.set('_iterated',  true);\n");
        }

        if (this.getAttribute('with_loop')) {
            compiler
                .write("(() => {\n")
                .indent()
                .write("let loop = context.get('loop');\n")
                .write("loop.set('index0', loop.get('index0') + 1);\n")
                .write("loop.set('index', loop.get('index') + 1);\n")
                .write("loop.set('first', false);\n")
            ;

            if (!this.getAttribute('ifexpr')) {
                compiler
                    .write("if (loop.has('length')) {\n")
                    .indent()
                    .write("loop.set('revindex0', loop.get('revindex0') - 1);\n")
                    .write("loop.set('revindex', loop.get('revindex') - 1);\n")
                    .write("loop.set('last', loop.get('revindex0') === 0);\n")
                    .outdent()
                    .write("}\n")
                ;
            }

            compiler
                .outdent()
                .write("})();\n")
            ;
        }
    }
}

export default TwingNodeForLoop;