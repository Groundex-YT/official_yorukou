import React, { SVGAttributes } from 'react'

export interface IconTProps extends SVGAttributes<SVGSVGElement> {}

const ListIcon: React.FC<IconTProps> = ({ ...restProps }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="none"
            viewBox="0 0 24 24"
            {...restProps}
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19 19.267V7.845c0-2.204-1.575-4.1-3.76-4.53a16.8 16.8 0 00-6.48 0C6.576 3.745 5 5.641 5 7.845v11.422c0 1.337 1.468 2.169 2.634 1.493l3.187-1.844a2.357 2.357 0 012.358 0l3.187 1.844c1.166.675 2.634-.156 2.634-1.493z"
            ></path>
        </svg>
    )
}

export default ListIcon
