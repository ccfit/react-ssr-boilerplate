import express from "express";
import proxy from "express-http-proxy";
import { matchRoutes } from "react-router-config";
import { render } from "./utils";
import { getStore } from "../store";
import routes from "../Routes";
const path = require("path");
const app = express();
app.use(express.static("dist"));
app.use("/api", express.static("api"));
// app.use(
//   "/api",
//   proxy("http://127.0.0.1", {
//     proxyReqPathResolver: function (req) {
//       console.log(req.url);
//       return "/api/" + req.url;
//     },
//   })
// );

app.get("*", function (req, res) {
  const store = getStore(req);
  // 根据路由的路径，来往store里面加数据
  const matchedRoutes = matchRoutes(routes, req.path);
  // 让matchRoutes里面所有的组件，对应的loadData方法执行一次
  const promises = [];

  matchedRoutes.forEach((item) => {
    if (item.route.loadData) {
      const promise = new Promise((resolve, reject) => {
        item.route
          .loadData(store)
          .then(resolve)
          .catch((e) => {
            console.log(`store 预获取失败`, e);
          });
      });
      promises.push(promise);
    }
  });
  Promise.all(promises)
    .then(() => {
      const context = { css: [] };
      const html = render(store, routes, req, context);
      if (context.action === "REPLACE") {
        res.redirect(301, context.url);
      } else if (context.NOT_FOUND) {
        res.status(404);
        res.send(html);
      } else {
        res.send(html);
      }
    })
    .catch((e) => {
      console.log("error", e);
    });
});

app.listen(5050);
