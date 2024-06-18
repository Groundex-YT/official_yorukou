import React, { SVGAttributes } from 'react'

export interface IconProps extends SVGAttributes<SVGSVGElement> {}

const PlayIcon: React.FC<IconProps> = ({ ...restProps }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        {...restProps}
    >
        <path
            d="M17.4635 8.73744C19.6416 10.2426 19.6416 14.0072 17.4635 15.5135L10.1094 20.5947C7.93331 22.101 5.20831 20.2187 5.20831 17.2083V7.0416C5.20831 4.03119 7.93123 2.14785 10.1104 3.6541L17.4635 8.73744Z"
            stroke="#F1F5F9"
            strokeWidth="1.5"
        />
    </svg>
)

export default PlayIcon
