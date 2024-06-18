import React, { PropsWithChildren } from 'react'

interface MultiStepLayoutProps extends PropsWithChildren {}

const MultiStepLayout: React.FC<MultiStepLayoutProps> = ({ children }) => {
    const childrenArray = React.Children.toArray(children)

    return <div>MultiStepLayout</div>
}

export default MultiStepLayout
