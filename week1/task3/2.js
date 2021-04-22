// method 1
const maximumWealth  = (accounts) =>{
    Math.max(...accounts.map(account => account.reduce((a, b) => a + b, 0)))
}

//method 2  ice cream method
function maximumWealth_2(accounts){
    let currentMax = 0
    for(let account of accounts){
        let sum = 0

        for(let money of account)
            sum += money
        if(sum > currentMax)
            currentMax = sum
    }
    return currentMax
}

