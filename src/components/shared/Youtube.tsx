import React, { useCallback, useState } from 'react'
import YTPlayer, { YouTubeProps } from 'react-youtube'

interface YTPlayerPros extends YouTubeProps {}

const Youtube: React.FC<YTPlayerPros> = ({ ...restProps }) => {
    const [mute, setMute] = useState<number>(1)

    // const ToggleMute = useCallback(() => {

    // }, [setMute])

    const opts = {
        playerVars: {
            autoplay: 1,
            mute: mute,
            modestbranding: 1,
            controls: 0,
        },
        // height: '1080',
        // width: '1920',
    }

    return <YTPlayer {...restProps} opts={opts} />
}

export default Youtube
