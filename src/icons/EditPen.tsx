import React from 'react'

const EditPen: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...restProps }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            aria-hidden="true"
            data-mirrorinrtl="true"
            data-name="Pencil"
            viewBox="0 0 24 24"
            {...restProps}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M19.121 1.707a3 3 0 00-4.242 0l-1.586 1.586-.707.707-11 11A2 2 0 001 16.414V21a2 2 0 002 2h4.586A2 2 0 009 22.414l11-11 .707-.707 1.586-1.586a3 3 0 000-4.242L19.12 1.707zM15.586 7L14 5.414l-11 11V19a2 2 0 012 2h2.586l11-11L17 8.414 6.707 18.707l-1.414-1.414L15.586 7zm.707-3.879a1 1 0 011.414 0l3.172 3.172a1 1 0 010 1.414L20 8.586 15.414 4l.879-.879z"
                clipRule="evenodd"
            ></path>
        </svg>
    )
}

export default EditPen
