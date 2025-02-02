export const animations = {
    fadeSlideUp: (show: boolean) => ({
        from: { opacity: 0, transform: 'translate(0px, 20px)' },
        opacity: show ? 1 : 0,
        transform: show ? 'translate(0px, 0px)' : 'translate(0px, 20px)',
    }),
    fadeSlideLeft: (show: boolean) => ({
        from: { opacity: 0, transform: 'translate(20px, 0px)' },
        opacity: show ? 1 : 0,
        transform: show ? 'translate(0px, 0px)' : 'translate(20px, 0px)',
    }),
}
