import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.jsx",
  output: [
    {
      dir: "dist", // 输出目录
      format: "esm", // ES Modules 格式
      preserveModules: true, // 保留模块结构（按需加载）
    },
    {
      file: "dist/index.cjs.js", // CommonJS 格式
      format: "cjs",
    },
  ],
  plugins: [
    resolve(), // 解析第三方依赖
    commonjs(),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"], // 启用 React JSX 转换
      exclude: "node_modules/**",
    }),
    terser(),
  ], // 压缩代码
  external: ["react", "react-dom"], // 排除外部依赖
};
