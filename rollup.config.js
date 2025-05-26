import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import resolve, { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import del from "rollup-plugin-delete";

export default {
  input: "src/index.tsx",
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

    typescript({
      tsconfig: "./tsconfig.json", // 指定 tsconfig
      declaration: true, // 生成 .d.ts 文件
      declarationDir: "dist/types", // 声明文件目录
    }),

    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"], // 启用 React JSX 转换
      exclude: "node_modules/**",
    }),
    terser(),
  ],
  external: (id) => /node_modules/.test(id),
};
