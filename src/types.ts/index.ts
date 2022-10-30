declare module '*.less';
declare module '*.module.less' { const style: Record<string, string>; export default style; }
declare module '*.module.css' { const style: Record<string, string>; export = style; }