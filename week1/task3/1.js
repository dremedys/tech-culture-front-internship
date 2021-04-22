// method 1 - for loop
function solve(nums){
    let runningSum = nums
    sum = runningSum[0]
    for(let i = 1 ; i < runningSum.length ; i++){
        runningSum[i] += runningSum[i-1]
    }
    return runningSum
}

// method 2
function solve_2(nums){
    let sum = 0
    return  nums.map((num) => sum += num)
}


