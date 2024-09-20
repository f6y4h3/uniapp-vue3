const moduleFills = import.meta.glob("./modules/*.ts", { eager: true });
const env = import.meta.env.MODE;
const config = Object.keys(moduleFills).reduce(
  (modules: { [key: string]: any }, path) => {
    const moduleName: string = path.replace(/^\.\/modules\/(.*)\.ts$/, "$1");
    const value: { [key: string]: any } = moduleFills[path] as {
      [key: string]: any;
    };
    modules[moduleName] = value?.default;
    return modules;
  },
  {}
);
export default config[env];
