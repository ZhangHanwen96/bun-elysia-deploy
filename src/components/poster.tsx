import { FC } from "react";
// 1792 × 2304

export const Poster: FC<{
    product: string;
    logo: string;
}> = ({ product, logo }) => {
    return (
        <div
            style={{
                height: 1792,
                width: 2304,
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
                src={product}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    objectFit: "cover",
                }}
            />
            <img
                src={logo}
                width="48"
                height="48"
                style={{
                    position: "absolute",
                    left: "10px",
                    top: "10px",
                }}
            />
            <div
                style={{
                    color: "white",
                    fontSize: 72,
                    fontWeight: 600,
                    textShadow: "#D4166C 4px 4px",
                }}
            >
                指挥官
            </div>
            <div
                style={{
                    marginTop: 40,
                    color: "white",
                    textShadow: "#FC0 1px 0 10px",
                    display: "flex",
                    zIndex: 1,
                    padding: "5px 30px",
                    background: "#00000070",
                    borderRadius: "100px",
                }}
            >
                <span>Hello, World</span>
                <span
                    style={{
                        color: "white",
                        textShadow: "#FC0 1px 0 10px",
                        marginLeft: "10px",
                    }}
                >
                    AIMA
                </span>
            </div>
        </div>
    );
};
