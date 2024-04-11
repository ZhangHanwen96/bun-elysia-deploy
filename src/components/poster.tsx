import { CSSProperties, FC } from "react";
// 1792 × 2304

type Logo = {
    x?: number;
    y?: number;
    url: string;
    width: number;
    height: number;
};

type Background = {
    url: string;
    width: number;
    height: number;
};

type BannerText = {
    text: string;
    style?: CSSProperties;
};

type PosterProps = {
    logo: Logo;
    background: Background;
    bannerText: BannerText[];
    productName: string;
};

export const Poster: FC<PosterProps> = ({
    background,
    logo,
    bannerText,
    productName,
}) => {
    console.log("bannerText", bannerText);
    return (
        <div
            style={{
                width: `${background.width}px`,
                height: `${background.height}px`,
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
                src={background.url}
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
                    textShadow: "#D4166C 8px 8px",
                }}
            >
                {productName}
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
                {bannerText.map(({ style, text }, index) => {
                    return (
                        <span style={style} key={index}>
                            {text}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};
