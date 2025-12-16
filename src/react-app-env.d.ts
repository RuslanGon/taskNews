declare namespace NodeJS {
    interface ProcessEnv {
      readonly REACT_APP_NEWS_API_TOKEN: string;
    }
  }
  
  declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  