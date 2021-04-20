// task 1
const user = {}
user.name = "John"
user.surname = "Smith"
user.name = "Pete"
delete user.name

// task 2

const isObjectEmpty = (obj) => {
    for (let key in obj) return false
    return true
}

// task 3
const user = {
    name: "John"
};

// это будет работать?
user.name = "Pete"; // answer: yes,cause field can change, but cant do smth like user = another object

// task 4
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}
let sum = 0
for(let key in salaries){
    sum += salaries.key
}

// task 5
const multiplyNumeric = (obj) => {
    for(let key in obj){
        if(typeof key === 'Number')
           obj[key]*=2
    }
}


