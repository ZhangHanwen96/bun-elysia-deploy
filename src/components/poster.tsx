import { FC } from "react";
// 1792 × 2304

type Logo = {
    x?: number;
    y?: number;
    url: string;
    width: number;
    height: number;
};

type Product = {
    url: string;
    width: number;
    height: number;
};

type PosterProps = {
    logo: Logo;
    product: Product;
};

export const Poster: FC<PosterProps> = ({ product, logo }) => {
    return (
        <div
            style={{
                width: `${product.width}px`,
                height: `${product.height}px`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                fontSize: 32,
                fontWeight: 600,
                position: "relative",
            }}
        >
            <img
                src={product.url}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    objectFit: "cover",
                }}
            />
            <img
                src={logo.url}
                width={logo.width + "px"}
                height={logo.height + "px"}
                style={{
                    position: "absolute",
                    left: logo.x + "px" || "10px",
                    top: logo.y + "px" || "10px",
                }}
            />
            <div
                style={{
                    color: "white",
                    fontSize: 100,
                    fontWeight: 600,
                    textShadow: "#D4166C 12px 12px",
                }}
            >
                COMMANDER
            </div>
            <div
                style={{
                    marginTop: 40,
                    color: "white",
                    display: "flex",
                    fontSize: 60,
                    padding: "10px 40px",
                    background: "#00000070",
                    borderRadius: "100px",
                }}
            >
                <span>Hello, World</span>
                <span
                    style={{
                        color: "#FC0",
                        // textShadow: "#FC0 1px 0 10px",
                        marginLeft: "50px",
                    }}
                >
                    AIMA
                </span>
            </div>
        </div>
    );
};
