import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, Route, Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";

export const render = (store, routes, req, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <Switch>{renderRoutes(routes)}</Switch>
      </StaticRouter>
    </Provider>
  );
  const helmet = Helmet.renderStatic();
  let cssStr = context.css.length
    ? context.css
        .map((ele) => {
          return `<style  type="text/css">${ele}</style>`;
        })
        .join("\n")
    : "";
  return `
			<html>
				<head>
					${helmet.title.toString()}
          ${helmet.meta.toString()}
					${cssStr}
				</head>
				<body>
					<div id="root">${content}</div>
					<script>
						window.context = {
							state: ${JSON.stringify(store.getState())}
						}
					</script>
					<script src='/index.js'></script>
				</body>
			</html>
	  `;
};
