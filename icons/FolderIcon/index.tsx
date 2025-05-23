import type { PresetColorKey } from "antd/es/theme/internal";
import { GRADIENT_MAPPING } from "styles/color-mapping";

type Props = {
	width?: string;
	height?: string;
	color?: PresetColorKey;
};

const FolderIcon = (props: Props) => {
	const w = props.width || "65";
	const h = props.height || "52";
	const preset: PresetColorKey = "blue";
	let startColor = "#B691F2";
	let endColor = "#6F3AC6";

	if (preset) {
		startColor = GRADIENT_MAPPING[preset].startColor;
		endColor = GRADIENT_MAPPING[preset].endColor;
	}

	return (
		<svg
			width={w}
			height={h}
			viewBox={`0 0 ${w} ${h}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Icon Folder</title>
			<path
				d="M60.3504 11.5751V20.6501H5.15039V4.45015C5.15039 2.17515 7.18789 0.337646 9.70039 0.337646H22.6754C24.2004 0.337646 25.6379 1.03765 26.4754 2.18765L29.1879 5.90015C29.9004 6.87515 31.1004 7.46265 32.3879 7.46265H55.7879C58.3129 7.46265 60.3504 9.30015 60.3504 11.5751Z"
				fill="url(#paint0_linear_7690_9968)"
			/>
			<path
				d="M12.9004 12.0249H52.6004C53.7754 12.0249 54.7254 12.9749 54.7254 14.1499V23.4124C54.7254 24.5874 53.7754 25.5374 52.6004 25.5374H12.9004C11.7254 25.5374 10.7754 24.5874 10.7754 23.4124V14.1499C10.7754 12.9749 11.7254 12.0249 12.9004 12.0249Z"
				fill="white"
			/>
			<path
				d="M57.3747 51.6624H8.12466C6.29966 51.6624 4.72466 50.3874 4.33716 48.5999L0.837157 22.9249C0.387157 20.8374 1.72466 18.7749 3.81216 18.3249C4.07466 18.2624 4.34966 18.2374 4.62466 18.2374H60.8747C63.0122 18.2374 64.7497 19.9749 64.7497 22.1124C64.7497 22.3874 64.7247 22.6499 64.6622 22.9249L61.1622 48.5999C60.7747 50.3874 59.1997 51.6624 57.3747 51.6624Z"
				fill="url(#paint1_linear_7690_9968)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_7690_9968"
					x1="32.7501"
					y1="0.193334"
					x2="32.7501"
					y2="20.2476"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0.363391" stop-color={startColor} />
					<stop offset="1" stop-color={endColor} />
				</linearGradient>

				<linearGradient
					id="paint1_linear_7690_9968"
					x1="32.7495"
					y1="18"
					x2="32.7495"
					y2="51"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0.363391" stop-color={startColor} />
					<stop offset="1" stop-color={endColor} />
				</linearGradient>
			</defs>
		</svg>
	);
};

export { FolderIcon };
