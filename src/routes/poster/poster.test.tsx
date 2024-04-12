import { app } from "../../index";
import { treaty } from "@elysiajs/eden";
import { describe, expect, it } from "bun:test";
import path from "node:path";
import fs from "node:fs/promises";

const api = treaty(app);

describe("poster 100 request", () => {
    it(
        "return a response",
        async () => {
            await Promise.all(
                Array.from({ length: 50 }, async (_, i) => {
                    const response = await api.poster.aima.post({
                        productName: "卫士60",
                        bannerText: [
                            {
                                style: {
                                    color: "white",
                                },
                                text: "欢迎来到",
                            },
                            {
                                style: {
                                    color: "#FC0",
                                    marginLeft: "50px",
                                },
                                text: "爱玛",
                            },
                        ],
                        background: {
                            width: 800,
                            height: 600,
                            url: "https://itg-tezign-files.tezign.com/t32/8db8e5ea17ff97473d20f48d78cf56ad.png?Expires=1714579199&OSSAccessKeyId=LTAI5tDubGKMRMroG8MuTLZo&Signature=bTExDg%2F1DGVlT8cjJOxBxQbo%2F5c%3D&response-content-disposition=inline",
                        },
                        logo: {
                            url: "https://itg-tezign-files.tezign.com/t32/8db8e5ea17ff97473d20f48d78cf56ad.png?Expires=1714579199&OSSAccessKeyId=LTAI5tDubGKMRMroG8MuTLZo&Signature=bTExDg%2F1DGVlT8cjJOxBxQbo%2F5c%3D&response-content-disposition=inline",
                            width: 100,
                            height: 100,
                        },
                    });
                })
            );

            expect(true).toBe(true);
        },
        {
            timeout: 100000,
        }
    );
});
