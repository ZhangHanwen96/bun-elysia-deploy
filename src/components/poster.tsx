import type { CSSProperties, FC } from "react";

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
				fontFamily: "HanSans, Roboto",
				fontSize: 32,
				fontWeight: 700,
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
				tw="absolute"
				style={{
					position: "absolute",
					left: logo.x + "px" || "10px",
					top: logo.y + "px" || "10px",
				}}
			/>
			<div
				style={{
					color: "white",
					fontSize: 96,
					fontWeight: 700,
					textShadow: "#D4166C 8px 8px",
					position: 'absolute',
					top: 120,
				}}
			>
				{productName}
			</div>
			<div
				style={{
					color: "white",
					display: "flex",
					fontSize: 32,
					padding: "10px 30px",
					background: "#00000080",
					borderRadius: "100px",
					fontWeight: 400,
					position: 'absolute',
					top: 270,
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
