export const debounce = (func: Function, wait: number) => {
    let timeout: any

    return (...args: any[]) => {
        const later = () => {
            timeout = null
            func(...args)
        }

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export const convertMeanScore = (meanScore: number, of: number): number => {
    return (of / 100) * meanScore
}
