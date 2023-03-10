export const RandomNumbersArray = (elementsCount: number, maxValue: number): number[] => {
    const response: number[] = []
    for(let i = 0; i < elementsCount; i++) {
        response.push(Math.floor(Math.random() * maxValue) + 1)
    }
    return response
}