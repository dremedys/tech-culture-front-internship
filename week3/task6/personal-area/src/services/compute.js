const difference = (prev, cur) => {
    if(prev > cur ){
        return - (100*(prev-cur))/cur
    }
    else if(prev < cur){
        return  (100*(prev-cur))/prev
    }

    return null
}
// example: divideDigits(12345678) = 12 345 678
const divideDigits = (number) => {
    number = number.toString()
    let res = ''
    let left = number.length
    while(left >= 3){
        res += number.substring(left-1, left-4) + ' '
        left -= 3
    }
    while(left > 0){
        res += number[--left]
    }
    return res.split("").reverse().join("");
}
const sum = (arr, key)  => {
    let sum = 0;
    for(let el of arr){
        sum += el[key]
    }
    return sum
}
export {difference, divideDigits,sum}
