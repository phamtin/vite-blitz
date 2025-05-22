const FlagIcon = (props: React.SVGProps<SVGSVGElement>) => {
	const color = props.fill || "#E35959";
	const width = props.width || "12";
	const height = props.height || "14";

	return (
		<svg
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Flag"
		>
			<title>Flag Icon</title>
			<path
				d="M10.0136 7.21998L9.20026 6.40665C9.00693 6.23998 8.89359 5.99331 8.88693 5.71998C8.87359 5.41998 8.99359 5.11998 9.21359 4.89998L10.0136 4.09998C10.7069 3.40665 10.9669 2.73998 10.7469 2.21331C10.5336 1.69331 9.87359 1.40665 8.90026 1.40665H1.93359V0.833313C1.93359 0.55998 1.70693 0.333313 1.43359 0.333313C1.16026 0.333313 0.933594 0.55998 0.933594 0.833313V13.1666C0.933594 13.44 1.16026 13.6666 1.43359 13.6666C1.70693 13.6666 1.93359 13.44 1.93359 13.1666V9.91331H8.90026C9.86026 9.91331 10.5069 9.61998 10.7269 9.09331C10.9469 8.56665 10.6936 7.90665 10.0136 7.21998Z"
				fill={color}
			/>
		</svg>
	);
};

export { FlagIcon };
