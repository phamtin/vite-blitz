import { Red } from "styles/colors"

const DotIcon = ({ color }: { color: string }) => {
  return (
    <svg
      aria-hidden="true"
      width="10"
      height="10"
      viewBox="0 0 8 8"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginTop: 5 }}
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  )
}

export default DotIcon
