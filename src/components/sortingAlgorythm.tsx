
type SortResult = {
    numbers: number[],
    succeed: boolean,
    numbersSwapped: boolean
}
export function bubbleSort(numbers: number[]):SortResult {
    let response: SortResult = {
        numbers: numbers,
        succeed: false,
        numbersSwapped: false
    }    
    for (let i = 0; i < numbers.length-1; i++) {
        if(numbers[i] > numbers[i+1]) {
            let temp = numbers[i];
            numbers[i] = numbers[i+1];
            numbers[i+1] = temp;
            return response;
        }
        
    }
    response.succeed = true;
    return response
}