import React from 'react'
import { IconProps } from './PlayIcon'

const SubtitleIcon: React.FC<IconProps> = ({ ...resProps }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            {...resProps}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1 3a1 1 0 011-1h20a1 1 0 011 1v14a1 1 0 01-1 1h-3v3a1 1 0 01-1.555.832L11.697 18H2a1 1 0 01-1-1V3zm2 1v12h9.303l.252.168L17 19.13V16h4V4H3zm7 5H5V7h5v2zm9 2h-5v2h5v-2zm-7 2H5v-2h7v2zm7-6h-7v2h7V7z"
                clipRule="evenodd"
            ></path>
        </svg>
    )
}

export default SubtitleIcon
