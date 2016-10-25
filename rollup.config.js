import node from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";


export default {
  entry: 'src/index',
  format: 'umd',
  moduleName: 'flume',
  plugins: [node(), commonjs()]
};
