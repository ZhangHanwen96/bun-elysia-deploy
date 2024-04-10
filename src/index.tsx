import { Elysia } from "elysia";
import satori from "satori";
import path from "node:path";
import fs from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import { Poster } from "./components/poster";

__dirname = __dirname || new URL(".", import.meta.url).pathname;

const robotoNormal = Bun.file(
    path.join(__dirname, "../fonts/Roboto/Roboto-Regular.ttf")
);

const app = new Elysia()
    .get("/poster", async (req) => {
        const logo = await fs.readFile(
            path.resolve(__dirname, "./components/logo.svg")
        );
        const product = await fs.readFile(
            path.resolve(__dirname, "./components/product.png")
        );

        const logo64 = logo.toString("base64");
        const product64 = product.toString("base64");

        const arrayBufferlogo = new Uint8Array(logo).buffer;
        const arrayBufferproduct = new Uint8Array(product).buffer;

        const svg = await satori(
            <Poster
                // logo={logo}
                logo={`data:image/svg+xml;base64,${logo64}`}
                product={`data:image/png;base64,${product64}`}
            />,
            {
                height: 1792,
                width: 2304,
                fonts: [
                    {
                        name: "Roboto",
                        data: await robotoNormal.arrayBuffer(),
                        weight: 400,
                        style: "normal",
                    },
                ],
                embedFont: true,
                debug: true,
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
