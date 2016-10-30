import node from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import uglify from 'rollup-plugin-uglify';


export default {
  entry: 'index',
  format: 'umd',
  moduleName: 'flume',
  plugins: [
    node(),
    commonjs(),
    process.env.NODE_ENV === 'production' && uglify({compress: {unsafe: true}})
  ]
};
