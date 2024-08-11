import 'cookie';
import 'kleur/colors';
import { parse } from 'devalue';
import { D as DEFAULT_404_COMPONENT } from './astro/server_Cp-G_wo0.mjs';
import 'clsx';
import { escape } from 'html-escaper';
import { compile } from 'path-to-regexp';

const ACTION_QUERY_PARAMS = {
  actionName: "_astroAction",
  actionPayload: "_astroActionPayload",
  actionRedirect: "_astroActionRedirect"
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
const statusToCodeMap = Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);
class ActionError extends Error {
  type = "AstroActionError";
  code = "INTERNAL_SERVER_ERROR";
  status = 500;
  constructor(params) {
    super(params.message);
    this.code = params.code;
    this.status = ActionError.codeToStatus(params.code);
    if (params.stack) {
      this.stack = params.stack;
    }
  }
  static codeToStatus(code) {
    return codeToStatusMap[code];
  }
  static statusToCode(status) {
    return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
  }
  static fromJson(body) {
    if (isInputError(body)) {
      return new ActionInputError(body.issues);
    }
    if (isActionError(body)) {
      return new ActionError(body);
    }
    return new ActionError({
      code: "INTERNAL_SERVER_ERROR"
    });
  }
}
function isActionError(error) {
  return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
  return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
class ActionInputError extends ActionError {
  type = "AstroActionInputError";
  // We don't expose all ZodError properties.
  // Not all properties will serialize from server to client,
  // and we don't want to import the full ZodError object into the client.
  issues;
  fields;
  constructor(issues) {
    super({
      message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
      code: "BAD_REQUEST"
    });
    this.issues = issues;
    this.fields = {};
    for (const issue of issues) {
      if (issue.path.length > 0) {
        const key = issue.path[0].toString();
        this.fields[key] ??= [];
        this.fields[key]?.push(issue.message);
      }
    }
  }
}
function getActionQueryString(name) {
  const searchParams = new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name });
  return `?${searchParams.toString()}`;
}
function deserializeActionResult(res) {
  if (res.type === "error") {
    return { error: ActionError.fromJson(JSON.parse(res.body)), data: void 0 };
  }
  if (res.type === "empty") {
    return { data: void 0, error: void 0 };
  }
  return {
    data: parse(res.body, {
      URL: (href) => new URL(href)
    }),
    error: void 0
  };
}

function template({
  title,
  pathname,
  statusCode = 404,
  tabTitle,
  body
}) {
  return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>${tabTitle}</title>
		<style>
			:root {
				--gray-10: hsl(258, 7%, 10%);
				--gray-20: hsl(258, 7%, 20%);
				--gray-30: hsl(258, 7%, 30%);
				--gray-40: hsl(258, 7%, 40%);
				--gray-50: hsl(258, 7%, 50%);
				--gray-60: hsl(258, 7%, 60%);
				--gray-70: hsl(258, 7%, 70%);
				--gray-80: hsl(258, 7%, 80%);
				--gray-90: hsl(258, 7%, 90%);
				--black: #13151A;
				--accent-light: #E0CCFA;
			}

			* {
				box-sizing: border-box;
			}

			html {
				background: var(--black);
				color-scheme: dark;
				accent-color: var(--accent-light);
			}

			body {
				background-color: var(--gray-10);
				color: var(--gray-80);
				font-family: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;
				line-height: 1.5;
				margin: 0;
			}

			a {
				color: var(--accent-light);
			}

			.center {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100vh;
				width: 100vw;
			}

			h1 {
				margin-bottom: 8px;
				color: white;
				font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
				font-weight: 700;
				margin-top: 1rem;
				margin-bottom: 0;
			}

			.statusCode {
				color: var(--accent-light);
			}

			.astro-icon {
				height: 124px;
				width: 124px;
			}

			pre, code {
				padding: 2px 8px;
				background: rgba(0,0,0, 0.25);
				border: 1px solid rgba(255,255,255, 0.25);
				border-radius: 4px;
				font-size: 1.2em;
				margin-top: 0;
				max-width: 60em;
			}
		</style>
	</head>
	<body>
		<main class="center">
			<svg class="astro-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="80" viewBox="0 0 64 80" fill="none"> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="white"/> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="url(#paint0_linear_738_686)"/> <path d="M0 51.6401C0 51.6401 10.6488 46.4654 21.3274 46.4654L29.3786 21.6102C29.6801 20.4082 30.5602 19.5913 31.5538 19.5913C32.5474 19.5913 33.4275 20.4082 33.7289 21.6102L41.7802 46.4654C54.4274 46.4654 63.1076 51.6401 63.1076 51.6401C63.1076 51.6401 45.0197 2.48776 44.9843 2.38914C44.4652 0.935933 43.5888 0 42.4073 0H20.7022C19.5206 0 18.6796 0.935933 18.1251 2.38914C18.086 2.4859 0 51.6401 0 51.6401Z" fill="white"/> <defs> <linearGradient id="paint0_linear_738_686" x1="31.554" y1="75.4423" x2="39.7462" y2="48.376" gradientUnits="userSpaceOnUse"> <stop stop-color="#D83333"/> <stop offset="1" stop-color="#F041FF"/> </linearGradient> </defs> </svg>
			<h1>${statusCode ? `<span class="statusCode">${statusCode}: </span> ` : ""}<span class="statusMessage">${title}</span></h1>
			${body || `
				<pre>Path: ${escape(pathname)}</pre>
			`}
			</main>
	</body>
</html>`;
}

const DEFAULT_404_ROUTE = {
  component: DEFAULT_404_COMPONENT,
  generate: () => "",
  params: [],
  pattern: /\/404/,
  prerender: false,
  pathname: "/404",
  segments: [[{ content: "404", dynamic: false, spread: false }]],
  type: "page",
  route: "/404",
  fallbackRoutes: [],
  isIndex: false
};
function ensure404Route(manifest) {
  if (!manifest.routes.some((route) => route.route === "/404")) {
    manifest.routes.push(DEFAULT_404_ROUTE);
  }
  return manifest;
}
async function default404Page({ pathname }) {
  return new Response(
    template({
      statusCode: 404,
      title: "Not found",
      tabTitle: "404: Not Found",
      pathname
    }),
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
default404Page.isAstroComponentFactory = true;
const default404Instance = {
  default: default404Page
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Justo/Desktop/sinergia_valores_s.a/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BaUUwzE3.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BIxaxwLd.js"},{"type":"external","value":"/_astro/page.BaUUwzE3.js"}],"styles":[{"type":"external","src":"/_astro/index.GPoMvfZi.css"},{"type":"inline","content":".scrollbar-hide:where(.astro-ouamjn2i)::-webkit-scrollbar{display:none}.scrollbar-hide:where(.astro-ouamjn2i){-ms-overflow-style:none;scrollbar-width:none}html.lenis,html.lenis body{height:auto}.lenis:where(.astro-ouamjn2i).lenis-smooth{scroll-behavior:auto!important}.lenis:where(.astro-ouamjn2i).lenis-smooth :where(.astro-ouamjn2i)[data-lenis-prevent]{overscroll-behavior:contain}.lenis:where(.astro-ouamjn2i).lenis-stopped{overflow:hidden}.lenis:where(.astro-ouamjn2i).lenis-scrolling iframe:where(.astro-ouamjn2i){pointer-events:none}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BaUUwzE3.js"}],"styles":[],"routeData":{"route":"/api/sendemail.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/sendEmail\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"sendEmail.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/sendEmail.json.ts","pathname":"/api/sendEmail.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Cz3XtaDU.js"},{"type":"external","value":"/_astro/page.BaUUwzE3.js"}],"styles":[{"type":"external","src":"/_astro/index.GPoMvfZi.css"},{"type":"inline","content":".scrollbar-hide:where(.astro-ouamjn2i)::-webkit-scrollbar{display:none}.scrollbar-hide:where(.astro-ouamjn2i){-ms-overflow-style:none;scrollbar-width:none}html.lenis,html.lenis body{height:auto}.lenis:where(.astro-ouamjn2i).lenis-smooth{scroll-behavior:auto!important}.lenis:where(.astro-ouamjn2i).lenis-smooth :where(.astro-ouamjn2i)[data-lenis-prevent]{overscroll-behavior:contain}.lenis:where(.astro-ouamjn2i).lenis-stopped{overflow:hidden}.lenis:where(.astro-ouamjn2i).lenis-scrolling iframe:where(.astro-ouamjn2i){pointer-events:none}\n"}],"routeData":{"route":"/arrepentimiento","isIndex":false,"type":"page","pattern":"^\\/arrepentimiento\\/?$","segments":[[{"content":"arrepentimiento","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/arrepentimiento.astro","pathname":"/arrepentimiento","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Cz3XtaDU.js"},{"type":"external","value":"/_astro/page.BaUUwzE3.js"}],"styles":[{"type":"external","src":"/_astro/index.GPoMvfZi.css"},{"type":"inline","content":".scrollbar-hide:where(.astro-ouamjn2i)::-webkit-scrollbar{display:none}.scrollbar-hide:where(.astro-ouamjn2i){-ms-overflow-style:none;scrollbar-width:none}html.lenis,html.lenis body{height:auto}.lenis:where(.astro-ouamjn2i).lenis-smooth{scroll-behavior:auto!important}.lenis:where(.astro-ouamjn2i).lenis-smooth :where(.astro-ouamjn2i)[data-lenis-prevent]{overscroll-behavior:contain}.lenis:where(.astro-ouamjn2i).lenis-stopped{overflow:hidden}.lenis:where(.astro-ouamjn2i).lenis-scrolling iframe:where(.astro-ouamjn2i){pointer-events:none}\n"}],"routeData":{"route":"/ayuda","isIndex":false,"type":"page","pattern":"^\\/ayuda\\/?$","segments":[[{"content":"ayuda","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ayuda.astro","pathname":"/ayuda","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Cz3XtaDU.js"},{"type":"external","value":"/_astro/page.BaUUwzE3.js"}],"styles":[{"type":"external","src":"/_astro/index.GPoMvfZi.css"},{"type":"inline","content":".scrollbar-hide:where(.astro-ouamjn2i)::-webkit-scrollbar{display:none}.scrollbar-hide:where(.astro-ouamjn2i){-ms-overflow-style:none;scrollbar-width:none}html.lenis,html.lenis body{height:auto}.lenis:where(.astro-ouamjn2i).lenis-smooth{scroll-behavior:auto!important}.lenis:where(.astro-ouamjn2i).lenis-smooth :where(.astro-ouamjn2i)[data-lenis-prevent]{overscroll-behavior:contain}.lenis:where(.astro-ouamjn2i).lenis-stopped{overflow:hidden}.lenis:where(.astro-ouamjn2i).lenis-scrolling iframe:where(.astro-ouamjn2i){pointer-events:none}\n"}],"routeData":{"route":"/calculadora","isIndex":false,"type":"page","pattern":"^\\/calculadora\\/?$","segments":[[{"content":"calculadora","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/calculadora.astro","pathname":"/calculadora","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Cz3XtaDU.js"},{"type":"external","value":"/_astro/page.BaUUwzE3.js"}],"styles":[{"type":"external","src":"/_astro/index.GPoMvfZi.css"},{"type":"external","src":"/_astro/contacto.BTGsrsBX.css"},{"type":"inline","content":".scrollbar-hide:where(.astro-ouamjn2i)::-webkit-scrollbar{display:none}.scrollbar-hide:where(.astro-ouamjn2i){-ms-overflow-style:none;scrollbar-width:none}html.lenis,html.lenis body{height:auto}.lenis:where(.astro-ouamjn2i).lenis-smooth{scroll-behavior:auto!important}.lenis:where(.astro-ouamjn2i).lenis-smooth :where(.astro-ouamjn2i)[data-lenis-prevent]{overscroll-behavior:contain}.lenis:where(.astro-ouamjn2i).lenis-stopped{overflow:hidden}.lenis:where(.astro-ouamjn2i).lenis-scrolling iframe:where(.astro-ouamjn2i){pointer-events:none}\n"}],"routeData":{"route":"/contacto","isIndex":false,"type":"page","pattern":"^\\/contacto\\/?$","segments":[[{"content":"contacto","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contacto.astro","pathname":"/contacto","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BaUUwzE3.js"}],"styles":[],"routeData":{"route":"/favicon.ico","isIndex":false,"type":"endpoint","pattern":"^\\/favicon\\.ico\\/?$","segments":[[{"content":"favicon.ico","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/favicon.ico.ts","pathname":"/favicon.ico","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BaUUwzE3.js"}],"styles":[],"routeData":{"route":"/manifest.json","isIndex":false,"type":"endpoint","pattern":"^\\/manifest\\.json\\/?$","segments":[[{"content":"manifest.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/manifest.json.ts","pathname":"/manifest.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Cz3XtaDU.js"},{"type":"external","value":"/_astro/page.BaUUwzE3.js"}],"styles":[{"type":"external","src":"/_astro/index.GPoMvfZi.css"},{"type":"inline","content":".scrollbar-hide:where(.astro-ouamjn2i)::-webkit-scrollbar{display:none}.scrollbar-hide:where(.astro-ouamjn2i){-ms-overflow-style:none;scrollbar-width:none}html.lenis,html.lenis body{height:auto}.lenis:where(.astro-ouamjn2i).lenis-smooth{scroll-behavior:auto!important}.lenis:where(.astro-ouamjn2i).lenis-smooth :where(.astro-ouamjn2i)[data-lenis-prevent]{overscroll-behavior:contain}.lenis:where(.astro-ouamjn2i).lenis-stopped{overflow:hidden}.lenis:where(.astro-ouamjn2i).lenis-scrolling iframe:where(.astro-ouamjn2i){pointer-events:none}\n"}],"routeData":{"route":"/nosotros","isIndex":false,"type":"page","pattern":"^\\/nosotros\\/?$","segments":[[{"content":"nosotros","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nosotros.astro","pathname":"/nosotros","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BaUUwzE3.js"}],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Cz3XtaDU.js"},{"type":"external","value":"/_astro/page.BaUUwzE3.js"}],"styles":[{"type":"external","src":"/_astro/index.GPoMvfZi.css"},{"type":"external","src":"/_astro/contacto.BTGsrsBX.css"},{"type":"inline","content":".scrollbar-hide:where(.astro-ouamjn2i)::-webkit-scrollbar{display:none}.scrollbar-hide:where(.astro-ouamjn2i){-ms-overflow-style:none;scrollbar-width:none}html.lenis,html.lenis body{height:auto}.lenis:where(.astro-ouamjn2i).lenis-smooth{scroll-behavior:auto!important}.lenis:where(.astro-ouamjn2i).lenis-smooth :where(.astro-ouamjn2i)[data-lenis-prevent]{overscroll-behavior:contain}.lenis:where(.astro-ouamjn2i).lenis-stopped{overflow:hidden}.lenis:where(.astro-ouamjn2i).lenis-scrolling iframe:where(.astro-ouamjn2i){pointer-events:none}\n"}],"routeData":{"route":"/solicitud","isIndex":false,"type":"page","pattern":"^\\/solicitud\\/?$","segments":[[{"content":"solicitud","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/solicitud.astro","pathname":"/solicitud","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Cz3XtaDU.js"},{"type":"external","value":"/_astro/page.BaUUwzE3.js"}],"styles":[{"type":"external","src":"/_astro/index.GPoMvfZi.css"},{"type":"inline","content":".scrollbar-hide:where(.astro-ouamjn2i)::-webkit-scrollbar{display:none}.scrollbar-hide:where(.astro-ouamjn2i){-ms-overflow-style:none;scrollbar-width:none}html.lenis,html.lenis body{height:auto}.lenis:where(.astro-ouamjn2i).lenis-smooth{scroll-behavior:auto!important}.lenis:where(.astro-ouamjn2i).lenis-smooth :where(.astro-ouamjn2i)[data-lenis-prevent]{overscroll-behavior:contain}.lenis:where(.astro-ouamjn2i).lenis-stopped{overflow:hidden}.lenis:where(.astro-ouamjn2i).lenis-scrolling iframe:where(.astro-ouamjn2i){pointer-events:none}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://sinergiavalores.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/arrepentimiento.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/ayuda.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/calculadora.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/contacto.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/nosotros.astro",{"propagation":"none","containsHead":true}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/solicitud.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/starlight/utils/routing.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/starlight/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:node_modules/@astrojs/starlight/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/starlight/utils/navigation.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/starlight/components/SidebarSublist.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/starlight/components/Sidebar.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:starlight/components/Sidebar",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/starlight/components/Page.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/starlight/utils/route-data.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/starlight/utils/translations.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/starlight/internal.ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro-expressive-code/preprocess-config",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/astro-expressive-code/components/renderer.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/astro-expressive-code/components/Code.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/astro-expressive-code/components/index.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/starlight/components.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/starlight/components/Footer.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:starlight/components/Footer",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/advanced/technical-specifications.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/advanced/technical-specifications.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/custom-solutions.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/custom-solutions.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/project-planning.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/project-planning.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/safety.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/safety.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/service-overview.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/service-overview.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/first-project-checklist.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/first-project-checklist.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/getting-started.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/getting-started.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/intro.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/intro.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/welcome-to-docs.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/welcome-to-docs.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/first-project-checklist.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/first-project-checklist.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/getting-started.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/getting-started.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/intro.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/intro.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/welcome-to-docs.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/welcome-to-docs.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/first-project-checklist.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/first-project-checklist.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/getting-started.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/getting-started.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/intro.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/intro.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/welcome-to-docs.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/welcome-to-docs.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/first-project-checklist.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/first-project-checklist.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/getting-started.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/getting-started.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/intro.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/intro.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/welcome-to-docs.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/welcome-to-docs.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/first-project-checklist.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/first-project-checklist.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/getting-started.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/getting-started.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/intro.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/intro.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/first-project-checklist.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/first-project-checklist.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/getting-started.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/getting-started.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/intro.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/intro.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/welcome-to-docs.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/welcome-to-docs.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/welcome-to-docs.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/welcome-to-docs.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/first-project-checklist.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/first-project-checklist.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/getting-started.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/getting-started.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/intro.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/intro.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/welcome-to-docs.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/welcome-to-docs.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/starlight/user-components/Aside.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/starlight/user-components/FileTree.astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/api/sendEmail.json@_@ts":"pages/api/sendemail.json.astro.mjs","\u0000@astro-page:src/pages/arrepentimiento@_@astro":"pages/arrepentimiento.astro.mjs","\u0000@astro-page:src/pages/ayuda@_@astro":"pages/ayuda.astro.mjs","\u0000@astro-page:src/pages/calculadora@_@astro":"pages/calculadora.astro.mjs","\u0000@astro-page:src/pages/contacto@_@astro":"pages/contacto.astro.mjs","\u0000@astro-page:src/pages/favicon.ico@_@ts":"pages/favicon.ico.astro.mjs","\u0000@astro-page:src/pages/manifest.json@_@ts":"pages/manifest.json.astro.mjs","\u0000@astro-page:src/pages/nosotros@_@astro":"pages/nosotros.astro.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"pages/robots.txt.astro.mjs","\u0000@astro-page:src/pages/solicitud@_@astro":"pages/solicitud.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/@astrojs/starlight/index@_@astro":"pages/_---slug_.astro.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/en/post-1.md?astroContentCollectionEntry=true":"chunks/post-1_ZwZ9OSq4.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/en/post-2.md?astroContentCollectionEntry=true":"chunks/post-2_DTuhLIJS.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/en/post-3.md?astroContentCollectionEntry=true":"chunks/post-3_D1C-7aos.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/fr/post-1.md?astroContentCollectionEntry=true":"chunks/post-1_BynYHpHR.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/fr/post-2.md?astroContentCollectionEntry=true":"chunks/post-2_BgEr28yM.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/fr/post-3.md?astroContentCollectionEntry=true":"chunks/post-3_BHAQYJSm.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/advanced/technical-specifications.mdx?astroContentCollectionEntry=true":"chunks/technical-specifications_H8RA_rrS.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/custom-solutions.mdx?astroContentCollectionEntry=true":"chunks/custom-solutions_CspUNSx-.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/project-planning.mdx?astroContentCollectionEntry=true":"chunks/project-planning_D66q999n.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/safety.mdx?astroContentCollectionEntry=true":"chunks/safety_C-e2NqIw.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/service-overview.mdx?astroContentCollectionEntry=true":"chunks/service-overview_D02H7grR.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/first-project-checklist.mdx?astroContentCollectionEntry=true":"chunks/first-project-checklist_dy_QRnT2.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/getting-started.mdx?astroContentCollectionEntry=true":"chunks/getting-started_DaOdedxp.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/intro.mdx?astroContentCollectionEntry=true":"chunks/intro_D4NgIZmn.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/welcome-to-docs.mdx?astroContentCollectionEntry=true":"chunks/welcome-to-docs_Dl6sminH.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/first-project-checklist.mdx?astroContentCollectionEntry=true":"chunks/first-project-checklist_CJOfDpwG.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/getting-started.mdx?astroContentCollectionEntry=true":"chunks/getting-started_u7Tob6nz.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/intro.mdx?astroContentCollectionEntry=true":"chunks/intro_1tbHOBQS.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/welcome-to-docs.mdx?astroContentCollectionEntry=true":"chunks/welcome-to-docs_D9q4fSLk.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/first-project-checklist.mdx?astroContentCollectionEntry=true":"chunks/first-project-checklist_BoZ1aMTC.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/getting-started.mdx?astroContentCollectionEntry=true":"chunks/getting-started_B9wBtvI5.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/intro.mdx?astroContentCollectionEntry=true":"chunks/intro_CEj-dGoW.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/welcome-to-docs.mdx?astroContentCollectionEntry=true":"chunks/welcome-to-docs_roEbu2y0.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/first-project-checklist.mdx?astroContentCollectionEntry=true":"chunks/first-project-checklist_I-qOa5LC.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/getting-started.mdx?astroContentCollectionEntry=true":"chunks/getting-started_Lq8RjMSK.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/intro.mdx?astroContentCollectionEntry=true":"chunks/intro_SLNwd5gI.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/welcome-to-docs.mdx?astroContentCollectionEntry=true":"chunks/welcome-to-docs_BSm6P9j_.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/first-project-checklist.mdx?astroContentCollectionEntry=true":"chunks/first-project-checklist_B_NzrLaJ.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/getting-started.mdx?astroContentCollectionEntry=true":"chunks/getting-started_DxUiVndD.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/intro.mdx?astroContentCollectionEntry=true":"chunks/intro_fK1u7Y5e.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/first-project-checklist.mdx?astroContentCollectionEntry=true":"chunks/first-project-checklist_Ckdodjvv.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/getting-started.mdx?astroContentCollectionEntry=true":"chunks/getting-started_B5XJjTYR.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/intro.mdx?astroContentCollectionEntry=true":"chunks/intro_D5_QQSqY.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/welcome-to-docs.mdx?astroContentCollectionEntry=true":"chunks/welcome-to-docs_AT7AOQpa.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/welcome-to-docs.mdx?astroContentCollectionEntry=true":"chunks/welcome-to-docs_BWrOBPIz.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/first-project-checklist.mdx?astroContentCollectionEntry=true":"chunks/first-project-checklist_B10OqGnv.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/getting-started.mdx?astroContentCollectionEntry=true":"chunks/getting-started_CLZ0HxcH.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/intro.mdx?astroContentCollectionEntry=true":"chunks/intro_CZhrFWN-.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/welcome-to-docs.mdx?astroContentCollectionEntry=true":"chunks/welcome-to-docs_ByAi9CKk.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/insights/insight-1.md?astroContentCollectionEntry=true":"chunks/insight-1_BcFRkhAV.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/insights/insight-2.md?astroContentCollectionEntry=true":"chunks/insight-2_MoIlNjcQ.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/insights/insight-3.md?astroContentCollectionEntry=true":"chunks/insight-3_Ccptz6Gv.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/products/a765.md?astroContentCollectionEntry=true":"chunks/a765_BuEoN7g3.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/products/b203.md?astroContentCollectionEntry=true":"chunks/b203_tf921yCt.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/products/f303.md?astroContentCollectionEntry=true":"chunks/f303_DAZKUyn5.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/products/t845.md?astroContentCollectionEntry=true":"chunks/t845_JYFn5xjj.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/en/post-1.md?astroPropagatedAssets":"chunks/post-1_B_E8X3C9.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/en/post-2.md?astroPropagatedAssets":"chunks/post-2_rYchIX1b.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/en/post-3.md?astroPropagatedAssets":"chunks/post-3_WWr0siX_.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/fr/post-1.md?astroPropagatedAssets":"chunks/post-1_D6MNuEzA.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/fr/post-2.md?astroPropagatedAssets":"chunks/post-2_D3rhA7e9.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/fr/post-3.md?astroPropagatedAssets":"chunks/post-3_BLCDHDUq.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/advanced/technical-specifications.mdx?astroPropagatedAssets":"chunks/technical-specifications_C65hlYcp.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/custom-solutions.mdx?astroPropagatedAssets":"chunks/custom-solutions_C6GtgeY7.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/project-planning.mdx?astroPropagatedAssets":"chunks/project-planning_B-jD21Tv.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/safety.mdx?astroPropagatedAssets":"chunks/safety_sqc968uS.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/service-overview.mdx?astroPropagatedAssets":"chunks/service-overview_BRtYnev1.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/first-project-checklist.mdx?astroPropagatedAssets":"chunks/first-project-checklist_e0JX_d5I.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/getting-started.mdx?astroPropagatedAssets":"chunks/getting-started_CwCFFjFG.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/intro.mdx?astroPropagatedAssets":"chunks/intro_BNX7oOWD.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/welcome-to-docs.mdx?astroPropagatedAssets":"chunks/welcome-to-docs_DPsWO8Zr.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/first-project-checklist.mdx?astroPropagatedAssets":"chunks/first-project-checklist_DdE_0zPA.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/getting-started.mdx?astroPropagatedAssets":"chunks/getting-started_BdOgsa74.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/intro.mdx?astroPropagatedAssets":"chunks/intro_C-DOijIu.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/welcome-to-docs.mdx?astroPropagatedAssets":"chunks/welcome-to-docs_B7ecEzcM.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/first-project-checklist.mdx?astroPropagatedAssets":"chunks/first-project-checklist_C8RB5ZTZ.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/getting-started.mdx?astroPropagatedAssets":"chunks/getting-started_BqOthf-y.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/intro.mdx?astroPropagatedAssets":"chunks/intro_B5hfrl3d.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/welcome-to-docs.mdx?astroPropagatedAssets":"chunks/welcome-to-docs_DxS-GZCZ.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/first-project-checklist.mdx?astroPropagatedAssets":"chunks/first-project-checklist_e2nGzdeJ.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/getting-started.mdx?astroPropagatedAssets":"chunks/getting-started_BJiD2YMR.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/intro.mdx?astroPropagatedAssets":"chunks/intro_DGPD5dQC.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/welcome-to-docs.mdx?astroPropagatedAssets":"chunks/welcome-to-docs_B6i9m3gf.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/first-project-checklist.mdx?astroPropagatedAssets":"chunks/first-project-checklist_CvJL_CNE.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/getting-started.mdx?astroPropagatedAssets":"chunks/getting-started_DPBXVbHD.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/intro.mdx?astroPropagatedAssets":"chunks/intro_g0I1MPWN.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/first-project-checklist.mdx?astroPropagatedAssets":"chunks/first-project-checklist_BQzt-C_U.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/getting-started.mdx?astroPropagatedAssets":"chunks/getting-started_ffz9nirq.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/intro.mdx?astroPropagatedAssets":"chunks/intro_yli0FP3m.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/welcome-to-docs.mdx?astroPropagatedAssets":"chunks/welcome-to-docs_D6QUgHPg.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/welcome-to-docs.mdx?astroPropagatedAssets":"chunks/welcome-to-docs_DImhQGzA.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/first-project-checklist.mdx?astroPropagatedAssets":"chunks/first-project-checklist_DtmRtP9l.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/getting-started.mdx?astroPropagatedAssets":"chunks/getting-started_DAfyqHAx.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/intro.mdx?astroPropagatedAssets":"chunks/intro_DMzjei9h.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/welcome-to-docs.mdx?astroPropagatedAssets":"chunks/welcome-to-docs_B74Dcdi6.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/insights/insight-1.md?astroPropagatedAssets":"chunks/insight-1_knkOaGM5.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/insights/insight-2.md?astroPropagatedAssets":"chunks/insight-2_BnYHypCA.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/insights/insight-3.md?astroPropagatedAssets":"chunks/insight-3_C34mcJjF.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/products/a765.md?astroPropagatedAssets":"chunks/a765_DMkyfBxN.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/products/b203.md?astroPropagatedAssets":"chunks/b203_CgBSepSK.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/products/f303.md?astroPropagatedAssets":"chunks/f303_m5vdDoa0.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/products/t845.md?astroPropagatedAssets":"chunks/t845_CfdB2845.mjs","\u0000virtual:astro-expressive-code/config":"chunks/config_R4f2hUCY.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/astro-expressive-code/dist/index.js":"chunks/index_DaVK51eC.mjs","\u0000virtual:astro-expressive-code/preprocess-config":"chunks/preprocess-config_BKbPww9W.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/en/post-1.md":"chunks/post-1_C6h_txf3.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/en/post-2.md":"chunks/post-2_F0QSBlru.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/en/post-3.md":"chunks/post-3_VgLh7qlE.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/fr/post-1.md":"chunks/post-1_Cy368I7G.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/fr/post-2.md":"chunks/post-2_C9urAt2i.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/blog/fr/post-3.md":"chunks/post-3_C9A9as8x.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/advanced/technical-specifications.mdx":"chunks/technical-specifications_Drc5sbij.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/custom-solutions.mdx":"chunks/custom-solutions_ChA_tTqF.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/project-planning.mdx":"chunks/project-planning_BJzVlig8.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/safety.mdx":"chunks/safety_BVoSL8N5.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/construction/service-overview.mdx":"chunks/service-overview_RGg-V_Yw.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/first-project-checklist.mdx":"chunks/first-project-checklist_B4EXSWAu.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/getting-started.mdx":"chunks/getting-started_RtCgF5dV.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/guides/intro.mdx":"chunks/intro_DQQ-C_3i.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/de/welcome-to-docs.mdx":"chunks/welcome-to-docs_CBI0JvOc.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/first-project-checklist.mdx":"chunks/first-project-checklist_BmnbuOEg.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/getting-started.mdx":"chunks/getting-started_CnNwFc8D.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/guides/intro.mdx":"chunks/intro_Ckus8Mns.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/es/welcome-to-docs.mdx":"chunks/welcome-to-docs_CfadYpln.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/first-project-checklist.mdx":"chunks/first-project-checklist_uFvUjYJB.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/getting-started.mdx":"chunks/getting-started_pXkYd-wV.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/guides/intro.mdx":"chunks/intro_CXwty___.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fa/welcome-to-docs.mdx":"chunks/welcome-to-docs_C3Z4dnot.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/first-project-checklist.mdx":"chunks/first-project-checklist_DGc0htN9.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/getting-started.mdx":"chunks/getting-started_BrQaW-S_.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/guides/intro.mdx":"chunks/intro_CJcjmQQn.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/fr/welcome-to-docs.mdx":"chunks/welcome-to-docs_DvgkBxRw.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/first-project-checklist.mdx":"chunks/first-project-checklist_mCHHIqBL.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/getting-started.mdx":"chunks/getting-started_BOMUh1nz.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/guides/intro.mdx":"chunks/intro_D0pqO9mG.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/first-project-checklist.mdx":"chunks/first-project-checklist_B4I0ipTt.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/getting-started.mdx":"chunks/getting-started_iTuL7knc.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/guides/intro.mdx":"chunks/intro_Ctk9hN90.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/ja/welcome-to-docs.mdx":"chunks/welcome-to-docs_Dnxg7qUk.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/welcome-to-docs.mdx":"chunks/welcome-to-docs_CrUwYQgh.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/first-project-checklist.mdx":"chunks/first-project-checklist_SEI1b5Bm.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/getting-started.mdx":"chunks/getting-started_BzJ8Ipiy.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/guides/intro.mdx":"chunks/intro_9CrXXiqJ.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/docs/zh-cn/welcome-to-docs.mdx":"chunks/welcome-to-docs_C_95VZ07.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/insights/insight-1.md":"chunks/insight-1_M2QFhA_H.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/insights/insight-2.md":"chunks/insight-2_BFuHIfUl.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/insights/insight-3.md":"chunks/insight-3_CrnL8LvW.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/products/a765.md":"chunks/a765_BAdNH5I0.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/products/b203.md":"chunks/b203_DZK3h7tq.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/products/f303.md":"chunks/f303_D7it9_i4.mjs","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/content/products/t845.md":"chunks/t845_FdJTFvYL.mjs","\u0000virtual:astro-expressive-code/ec-config":"chunks/ec-config_CzTTOeiV.mjs","\u0000@astrojs-manifest":"manifest_C-ZxEzHG.mjs","astro:scripts/page.js":"_astro/page.BaUUwzE3.js","react-toastify":"_astro/_astro-entry_react-toastify.CGPWo9rT.js","C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/SolicitudForm":"_astro/SolicitudForm.BN1b8-4B.js","/astro/hoisted.js?q=1":"_astro/hoisted.Cz3XtaDU.js","@components/sections/EmailContactForm.tsx":"_astro/EmailContactForm.BuKEcLpU.js","C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@astrojs/starlight/user-components/Tabs.astro?astro&type=script&index=0&lang.ts":"_astro/Tabs.astro_astro_type_script_index_0_lang.CCIyraCc.js","/astro/hoisted.js?q=0":"_astro/hoisted.BIxaxwLd.js","@/components/sections/CalcuSectionReact":"_astro/CalcuSectionReact.BV17VycH.js","/astro/hoisted.js?q=2":"_astro/hoisted.DZPI4Gh-.js","C:/Users/Justo/Desktop/sinergia_valores_s.a/node_modules/@pagefind/default-ui/npm_dist/mjs/ui-core.mjs":"_astro/ui-core.CaPAmNga.js","@astrojs/react/client.js":"_astro/client.VBMNy0j7.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/ec.j8ofn.css","/_astro/ec.8zarh.js","/_astro/icon.CvGbDubJ.png","/_astro/icon-maskable.C1A7b-dw.png","/_astro/imagen_llaves.D9k9b_Oq.png","/_astro/alquilerseguro.DVBEvO-7.png","/_astro/calculatingcosts.B8bVM3_A.png","/_astro/parejita.DbwJsrwX.png","/_astro/social.CWnIx2-K.png","/_astro/favico.C-VzaCvi.png","/_astro/Gotham-Black-Regular.D1YdJo6g.ttf","/_astro/Nunito-Regular.BzIFT1ox.ttf","/_astro/jacob.BfQgWSmi.avif","/_astro/post-1.BI8NM3Uo.avif","/_astro/anna.DKqT6LjU.avif","/_astro/post-3.DBR9zkA_.avif","/_astro/brad.DxbZHamT.avif","/_astro/post-2.D_u0v5R3.avif","/_astro/screwfast_hero.QOwUlt3O.svg","/_astro/screwfast_hero_dark.WKWP9b8L.svg","/_astro/insight-3.CLIJrwtZ.avif","/_astro/product-image-2.BcjkuUps.avif","/_astro/blueprint-2.DSItIwt1.avif","/_astro/blueprint-1.C3as_WJM.avif","/_astro/insight-1.BPZxcJVp.avif","/_astro/product-image-3.BNT8XmJo.avif","/_astro/product-image-main-3.CZjWzLDc.avif","/_astro/product-image-main-2.CcfjfBQ9.avif","/_astro/product-image-4.D9xSELbd.avif","/_astro/product-image-main-4.Bkgr1GB5.avif","/_astro/product-image-1.Dqz5fi0L.avif","/_astro/insight-2.ePExg0Pg.avif","/_astro/product-image-main-1.DocbQbk7.avif","/_astro/contacto.BTGsrsBX.css","/_astro/index.CtTFcuSz.css","/_astro/index.GPoMvfZi.css","/banner-pattern.svg","/fonts/Nunito-Italic-VariableFont_wght.ttf","/fonts/Nunito-VariableFont_wght.ttf","/_astro/CalcuSectionReact.BV17VycH.js","/_astro/client.VBMNy0j7.js","/_astro/EmailContactForm.BuKEcLpU.js","/_astro/hoisted.BIxaxwLd.js","/_astro/hoisted.Cz3XtaDU.js","/_astro/hoisted.DZPI4Gh-.js","/_astro/index.CZNXKH1e.js","/_astro/index.DlAYGZ0P.js","/_astro/jsx-runtime.Cw0dS1eS.js","/_astro/page.BaUUwzE3.js","/_astro/SolicitudForm.BN1b8-4B.js","/_astro/Tabs.astro_astro_type_script_index_0_lang.CCIyraCc.js","/_astro/ui-core.CaPAmNga.js","/_astro/_astro-entry_react-toastify.CGPWo9rT.js","/_astro/_astro-entry_react-toastify.KtSEaBH6.js","/fonts/static/Nunito-Black.ttf","/fonts/static/Nunito-BlackItalic.ttf","/fonts/static/Nunito-Bold.ttf","/fonts/static/Nunito-BoldItalic.ttf","/fonts/static/Nunito-ExtraBold.ttf","/fonts/static/Nunito-ExtraBoldItalic.ttf","/fonts/static/Nunito-ExtraLight.ttf","/fonts/static/Nunito-ExtraLightItalic.ttf","/fonts/static/Nunito-Italic.ttf","/fonts/static/Nunito-Light.ttf","/fonts/static/Nunito-LightItalic.ttf","/fonts/static/Nunito-Medium.ttf","/fonts/static/Nunito-MediumItalic.ttf","/fonts/static/Nunito-SemiBold.ttf","/fonts/static/Nunito-SemiBoldItalic.ttf","/scripts/vendor/clipboard.min.js","/scripts/vendor/gsap/gsap.min.js","/scripts/vendor/gsap/ScrollTrigger.min.js","/scripts/vendor/lenis/lenis.js","/scripts/vendor/preline/accordion/index.d.ts","/scripts/vendor/preline/accordion/index.js","/scripts/vendor/preline/accordion/LICENSE","/scripts/vendor/preline/accordion/package.json","/scripts/vendor/preline/collapse/index.d.ts","/scripts/vendor/preline/collapse/index.js","/scripts/vendor/preline/collapse/LICENSE","/scripts/vendor/preline/collapse/package.json","/scripts/vendor/preline/dropdown/index.d.ts","/scripts/vendor/preline/dropdown/index.js","/scripts/vendor/preline/dropdown/LICENSE","/scripts/vendor/preline/dropdown/package.json","/scripts/vendor/preline/tabs/index.d.ts","/scripts/vendor/preline/tabs/index.js","/scripts/vendor/preline/tabs/LICENSE","/scripts/vendor/preline/tabs/package.json","/scripts/vendor/preline/overlay/index.d.ts","/scripts/vendor/preline/overlay/index.js","/scripts/vendor/preline/overlay/LICENSE","/scripts/vendor/preline/overlay/package.json","/_astro/page.BaUUwzE3.js"],"i18n":{"strategy":"pathname-prefix-other-locales","locales":[{"codes":["es"],"path":"es"},{"codes":["es"],"path":"es"}],"defaultLocale":"es","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"experimentalEnvGetSecretEnabled":false});

export { DEFAULT_404_ROUTE as D, default404Instance as a, deserializeActionResult as d, ensure404Route as e, getActionQueryString as g, manifest as m };
