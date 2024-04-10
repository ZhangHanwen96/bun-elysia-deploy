import { Elysia } from "elysia";
import satori from "satori";
import path from "node:path";
import fs from "node:fs/promises";
import { logger } from "@bogeychan/elysia-logger";
import { Resvg } from "@resvg/resvg-js";
import { imageSize } from "image-size";
import { Poster } from "./components/poster";
import filetype, { fileTypeFromBuffer } from "file-type";

__dirname = __dirname || new URL(".", import.meta.url).pathname;

const robotoNormal = Bun.file(
    path.join(__dirname, "../fonts/Roboto/Roboto-Regular.ttf")
);

const app = new Elysia()
    .use(
        logger({
            stream: console,
            autoLogging: true,
        })
    )
    .get("/poster", async (req) => {
        const logoBuffer = await fs.readFile(
            path.resolve(__dirname, "./components/logo.svg")
        );
        const productBuffer = await fs.readFile(
            path.resolve(__dirname, "./components/product.png")
        );

        const logoType = await fileTypeFromBuffer(logoBuffer);
        const pType = await fileTypeFromBuffer(productBuffer);

        const logo64 = logoBuffer.toString("base64");
        const product64 = productBuffer.toString("base64");

        const logoDimension = imageSize(logoBuffer);
        const pDimension = imageSize(productBuffer);

        const product = {
            url: `data:image/png;base64,${product64}`,
            height: pDimension.height,
            width: pDimension.width,
        };

        const logo = {
            url: `data:image/svg+xml;base64,${logo64}`,
            height: logoDimension.height,
            width: logoDimension.width,
            x: 24,
            y: 24,
        };

        req.log.info(logoDimension);

        try {
            const svg = await satori(
                <Poster
                    // logo={logo}
                    logo={logo}
                    product={product}
                />,
                {
                    height: product.height,
                    width: product.width,
                    fonts: [
                        {
                            name: "Roboto",
                            data: await robotoNormal.arrayBuffer(),
                            weight: 400,
                            style: "normal",
                        },
                    ],
                    embedFont: true,
                    // debug: true,
                }
            );
            // render png
            const resvg = new Resvg(svg, {
                background: "rgba(238, 235, 230, 0)",
            });
            const pngData = resvg.render();
            const pngBuffer = pngData.asPng();
            req.set.headers["Content-Type"] = "image/png";
            return pngBuffer;
        } catch (error) {
            req.log.error(error);
            req.set.status = 500;
        }
    })
    .get("/jsx", async (set) => {
        const svg = await satori(<App />, {
            width: 800,
            height: 344,
            fonts: [
                {
                    name: "Roboto",
                    data: await robotoNormal.arrayBuffer(),
                    weight: 400,
                    style: "normal",
                },
            ],
            embedFont: true,
        });
        set.set.headers["Content-Type"] = "image/svg+xml";
        return svg;
    })
    .get("/", () => "Hello Elysia")
    .listen(3000);

function App() {
    return (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
            <div tw="bg-gray-50 flex w-full">
                <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
                    <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                        <span>Ready to dive in?</span>
                        <span tw="text-indigo-600">
                            Start your free trial today.
                        </span>
                    </h2>
                    <div tw="mt-8 flex md:mt-0">
                        <div tw="flex rounded-md shadow">
                            <a tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">
                                Get started
                            </a>
                        </div>
                        <div tw="ml-3 flex rounded-md shadow">
                            <a tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">
                                Learn more
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
