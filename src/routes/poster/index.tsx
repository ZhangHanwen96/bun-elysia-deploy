import Elysia, { t } from "elysia";
import imageSize from "image-size";
import satori from "satori";
import { Poster } from "../../components/poster";
import { Resvg } from "@resvg/resvg-js";
import sharp from 'sharp'
import path from "node:path";
import { logger } from "../../logger";

const fonts = [
	{
		name: "HanSans",
		data: await Bun.file(
			path.join(__dirname, "../../../fonts/HanSans/SourceHanSansCN-Normal.otf"),
		).arrayBuffer(),
		weight: 400,
		style: "normal",
	},
	{
		name: "HanSans",
		data: await Bun.file(
			path.join(__dirname, "../../../fonts/HanSans/SourceHanSansCN-Bold.otf"),
		).arrayBuffer(),
		weight: 700,
		style: "bold",
	},
	{
		name: "HanSans",
		data: await Bun.file(
			path.join(__dirname, "../../../fonts/HanSans/SourceHanSansCN-Heavy.otf"),
		).arrayBuffer(),
		weight: 900,
		style: "heavy",
	},
	{
		name: "Roboto",
		data: await Bun.file(
			path.join(__dirname, "../../../fonts/Roboto/Roboto-Regular.ttf"),
		).arrayBuffer(),
		weight: 400,
		style: "normal",
	},
];

const posterRoute = new Elysia({ prefix: "/poster" }).post(
	"/aima",
	async (ctx) => {
		const { background, logo } = ctx.body;

		const [backgroundArrayBuffer, logoArrayBuffer] = await Promise.all(
			[background.url, logo.url].map((url) => {
				return fetch(url, {
					method: "GET",
				}).then((r) => r.arrayBuffer());
			}),
		);

		const logoDimension = imageSize(Buffer.from(logoArrayBuffer));

		const props = {
			background: {
				url: backgroundArrayBuffer,
				height: background.height,
				width: background.width,
			},
			logo: {
				url: logoArrayBuffer,
				height: logo.height ?? logoDimension.height,
				width: logo.width ?? logoDimension.width,
				x: logo.x ?? 24,
				y: logo.y ?? 24,
			},
		};
		try {
			const svg = await satori(
				<Poster
					{...props}
					productName={ctx.body.productName}
					bannerText={ctx.body.bannerText}
				/>,
				{
					height: props.background.height,
					width: props.background.width,
					fonts: fonts,
					embedFont: true,
				},
			);
			// render svg to png
			const resvg = new Resvg(svg, {
				font: {
					sansSerifFamily: "HanSans, Roboto",

					fontFiles: [
						path.join(
							__dirname,
							"../../../fonts/HanSans/SourceHanSansCN-Normal.otf",
						),
						path.join(
							__dirname,
							"../../../fonts/HanSans/SourceHanSansCN-Bold.otf",
						),
						path.join(
							__dirname,
							"../../../fonts/HanSans/SourceHanSansCN-Heavy.otf",
						),
						path.join(__dirname, "../../../fonts/Roboto/Roboto-Regular.ttf"),
					],
					defaultFontFamily: "HanSans",
					defaultFontSize: 14,
				},
				// fitTo: {
				// 	mode: 'zoom',
				// 	value: 2
				// }
			});
			const pngData = resvg.render();
			const pngBuffer = pngData.asPng();
			// const png = await sharp(pngBuffer).resize({
			// 	width: background.width,
			// 	height: background.height,
			// }).png().toBuffer()
			// const svgBuffer = Buffer.from(svg)
			// const b = await sharp({
			// 	create: {
			// 	  width: background.width,
			// 	  height:  background.height,
			// 	  channels: 4,
			// 	  background: { r: 255, g: 0, b: 0, alpha: 0 }
			// 	}
			//   }).composite([{
			// 	input: svgBuffer,
			// }]).png().toBuffer()
			ctx.set.headers["Content-Type"] = "image/png";
			return pngBuffer;
			ctx.set.headers["Content-Type"] = "image/svg+xml";
			return svg;
		} catch (error) {
			logger.error(error);
			return ctx.error(500, "生成海报失败");
		}
	},
	{
		body: t.Object({
			bannerText: t.Array(
				t.Object({
					style: t.Optional(t.Object({})),
					text: t.String(),
				}),
			),
			background: t.Object({
				url: t.String(),
				width: t.Numeric(),
				height: t.Numeric(),
				style: t.Optional(t.Object({})),
			}),
			logo: t.Object({
				url: t.String(),
				x: t.Optional(t.Numeric()),
				y: t.Optional(t.Numeric()),
				width: t.Optional(t.Numeric()),
				height: t.Optional(t.Numeric()),
				style: t.Optional(t.Object({})),
			}),
			productName: t.String(),
		}),
	},
);


export default posterRoute;
