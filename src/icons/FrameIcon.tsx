import React, { SVGAttributes } from 'react'

export interface IconTProps extends SVGAttributes<SVGSVGElement> {}

const FrameIcon: React.FC<IconTProps> = ({ ...props }) => {
    return (
        <svg {...props}>
            <rect
                rx={32}
                className="stroke-2 fill-none"
                stroke="url(#gradient-half)"
            />
        </svg>
    )
}

export default FrameIcon
