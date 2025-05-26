import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import resolve, { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import del from "rollup-plugin-delete";
import cleaner from "rollup-plugin-cleaner";

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

    // 构建前清空输出目录
    del({ targets: "dist/*" }),

    // 正确配置 node-resolve 插件
    nodeResolve({
      // 禁止将依赖复制到输出目录
      moduleDirectories: ["node_modules"],
      preferBuiltins: true,
    }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"], // 启用 React JSX 转换
      exclude: "node_modules/**",
    }),
    terser(),
    cleaner({
      targets: ["dist/node_modules", "dist/_virtual"],
    }),
  ], // 压缩代码
  // external: ["react", "react-dom"], // 排除外部依赖
  external: (id) => /node_modules/.test(id),
};
