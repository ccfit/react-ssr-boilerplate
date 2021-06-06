import axios from "axios";
const path = require("path");
const fs = require("fs");

// const createInstance = (req) => {
//   return {
//     get: (url) => {
//       const dataPath = path.join(process.cwd(), url);
//       const data = fs.readFileSync(`${dataPath}`, "utf8");
//       return Promise.resolve({
//         data: JSON.parse(data),
//       });
//     },
//   };
// };

const createInstance = (req) => {
  let instance = axios.create({
    baseURL: "http://127.0.0.1:5050",
    headers: {
      cookie: req.get("cookie") || "",
    },
  });
  instance.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      return config;
    },
    function (error) {
      // c对请求错误做些什么
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    function (config) {
      // 在发送请求之前做些什么
      console.log(config);
      return config;
    },
    function (error) {
      // c对请求错误做些什么
      return Promise.reject(error);
    }
  );
  return instance;
};

export default createInstance;
