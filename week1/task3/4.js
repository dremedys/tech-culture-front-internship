// method 1
function truncateSentence(s, k){
    return s.split(' ').slice(0,k).join(' ')
}

// method 2
function truncateSentence2(s, k){
    let res = ''
    let count = 0
    for(let i = 0 ; i < s.length; i++){
        if(s[i] == ' ')
            count++
        res += s[i]
        if(count == k)
            return  res
    }
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
readline.question('Enter sentence then comma and number: ', input => {
    let s = input.split(',')[0],
        k = input.split(',')[1]
    console.log(truncateSentence(s,k))
    readline.close()
})
