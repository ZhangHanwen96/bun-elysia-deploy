import { Elysia, t } from "elysia";
import satori from "satori";
import path from "node:path";
import fs from "node:fs/promises";
import { staticPlugin } from "@elysiajs/static";
import { serverTiming } from "@elysiajs/server-timing";
import { cors } from "@elysiajs/cors";
import { logger } from "./logger";
import { Resvg } from "@resvg/resvg-js";
import { imageSize } from "image-size";
import { Poster } from "./components/poster";
import swagger from "@elysiajs/swagger";
import posterRoute from "./routes/poster";
import express from "express";
import request from "request";
import corsex from "cors";
import {createProxyMiddleware} from 'http-proxy-middleware'


const expressApp = express();

expressApp.use(corsex());
// hello world
expressApp.get('/hello', (req, res) => {
	res.send('Hello World')
})
const PC_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
expressApp.use(
	createProxyMiddleware({
	  target: 'https://open.douyin.com',
	  changeOrigin: true,

	//   agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.77 Mobile/15E148 Safari/604.1",
	  secure: false,
	headers: {
		"User-Agent": PC_agent
	}
	}),
  );
expressApp.listen(Bun.env.PORT || 3000, () => {
	console.log(Bun.env.PORT || 3000)
})

// __dirname = __dirname || new URL(".", import.meta.url).pathname;

// const robotoNormal = Bun.file(
// 	path.join(__dirname, "../fonts/Roboto/Roboto-Regular.ttf"),
// );

// const app = new Elysia()
// 	.use(serverTiming())
// 	.use(swagger())
// 	.use(staticPlugin({}))
// 	.use(cors())
// 	.use(posterRoute)
// 	.use(
// 		logger.into({
// 			autoLogging: true,
// 		}),
// 	)
// 	.post(
// 		"/poster-workflow",
// 		(ctx) => {
// 			return {
// 				result: ctx.body.background,
// 			};
// 		},
// 		{
// 			body: t.Object({
// 				background: t.String(),
// 			}),
// 		},
// 	)
// 	.get('/douyin-proxy', async (ctx) => {
// 		const pathname = ctx.path
// 		const test = 'https://open.douyin.com/platform/oauth/connect/?client_key=awnlfrew744ocj8h&response_type=code&scope=user_info,video.data.bind&redirect_uri=https://vms-service.test.tezign.com/videomixer-server/tiktok/public/auth-callback&state=eyJ0b2tlbiI6ImM1NDU0MDI2NDZhMzRlN2U5NTRkY2FmMDU0ODE4MzhkIiwidGVuYW50SWQiOiJ0MTUiLCJwdWJsaXNoRGF0ZSI6MTcxMzgwMTYwMDAwMH0&verifyFp=verify_lv29rotm_DOBpPCG3_M53R_4Ncu_8Nnl_PTaA97HDr9Kf&fp=verify_lv29rotm_DOBpPCG3_M53R_4Ncu_8Nnl_PTaA97HDr9Kf'
// 		const targetSite = pathname.replace('/douyin-proxy/', '');
// 		logger.info(`Proxying request to ${targetSite}`);
// 		return fetch(test, {
// 			method: 'get',
// 			headers: {
// 				...ctx.headers,
// 				// ios iphone chrome
// 				"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.77 Mobile/15E148 Safari/604.1",
// 			},
// 		});
// 	}, {
// 		query: t.Object({
// 			url: t.String()
// 		})
// 	})
// 	.get(
// 		"/poster",
// 		async (req) => {
// 			const logoBuffer = await fs.readFile(
// 				path.resolve(__dirname, "./components/logo.svg"),
// 			);
// 			const pUrl = req.query.background;

// 			const productImage = await fetch(pUrl, {
// 				method: "GET",
// 			}).then((r) => r.arrayBuffer());

// 			const logo64 = logoBuffer.toString("base64");

// 			const logoDimension = imageSize(logoBuffer);
// 			const pDimension = imageSize(Buffer.from(productImage));

// 			const product = {
// 				// url: `data:image/png;base64,${product64}`,
// 				url: productImage,
// 				height: pDimension.height,
// 				width: pDimension.width,
// 			};

// 			const logo = {
// 				url: `data:image/svg+xml;base64,${logo64}`,
// 				// url: productImage,
// 				height: logoDimension.height,
// 				width: logoDimension.width,
// 				x: 24,
// 				y: 24,
// 			};

// 			try {
// 				const svg = await satori(
// 					<Poster
// 						// logo={logo}
// 						logo={logo}
// 						product={product}
// 					/>,
// 					{
// 						height: product.height,
// 						width: product.width,
// 						fonts: [
// 							{
// 								name: "Roboto",
// 								data: await robotoNormal.arrayBuffer(),
// 								weight: 400,
// 								style: "normal",
// 							},
// 						],
// 						embedFont: true,
// 						// debug: true,
// 					},
// 				);
// 				// render png
// 				const resvg = new Resvg(svg, {
// 					background: "rgba(238, 235, 230, 0)",
// 				});
// 				const pngData = resvg.render();
// 				const pngBuffer = pngData.asPng();
// 				req.set.headers["Content-Type"] = "image/png";
// 				return pngBuffer;
// 			} catch (error) {
// 				req.log.error(error);
// 				req.set.status = 500;
// 			}
// 		},
// 		{
// 			query: t.Object({
// 				background: t.String(),
// 				logo: t.Optional(t.String()),
// 			}),
// 		},
// 	)
// 	.get("/jsx", async (set) => {
// 		const svg = await satori(<App />, {
// 			width: 800,
// 			height: 344,
// 			fonts: [
// 				{
// 					name: "Roboto",
// 					data: await robotoNormal.arrayBuffer(),
// 					weight: 400,
// 					style: "normal",
// 				},
// 			],
// 			embedFont: true,
// 		});
// 		set.set.headers["Content-Type"] = "image/svg+xml";
// 		return svg;
// 	})
// 	.get('/from-template', async (ctx) => {
		
// 	})
// 	.get("/", () => "Hello There")
// 	.get("/ping", () => "pong")
// 	.listen(Bun.env.PORT || 3000);

// export { app };

// function App() {
// 	return (
// 		<div tw="flex flex-col w-full h-full items-center justify-center bg-white">
// 			<div tw="bg-gray-50 flex w-full">
// 				<div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
// 					<h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
// 						<span>Ready to dive in?</span>
// 						<span tw="text-indigo-600" className="">
// 							Start your free trial today.
// 						</span>
// 					</h2>
// 					<div tw="mt-8 flex md:mt-0">
// 						<div tw="flex rounded-md shadow">
// 							<a tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">
// 								Get started
// 							</a>
// 						</div>
// 						<div tw="ml-3 flex rounded-md shadow">
// 							<a tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">
// 								Learn more
// 							</a>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// console.log(
// 	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
// );
