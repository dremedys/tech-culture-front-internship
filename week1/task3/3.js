// method 1
function restoreString(s, indices){
    let res = ''
    for(let ind of indices){
        res += s[ind]
    }
    return res
}

// method 2

const restoreString2 = (s, indices) => s.split('').reduce((res, l, i) => {
    res[indices[i]] = l
    return res
}, []).join('')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

//input must be like 'leet 2,0,1,3'

readline.question(`Enter text: `, input => {
    let s = input.split(' ')[0],
        k = input.slice(Array.from(input).indexOf(' ')+1).split(',')
    console.log(restoreString(s,k))
    readline.close()
})

