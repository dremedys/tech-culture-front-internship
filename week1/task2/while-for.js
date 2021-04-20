// task 1
let i = 3;

while (i) {
    alert( i-- );
}
//answer: cycle1: i=3=true, alerted 3, i = 2
//cycle2: i=2=true, alerted 2, i =1
//cycle3: i=1=true, alerted 1, i =0
//i=0=false, no alert, last alert is 1


//task2
let i = 0;
while (++i < 5) alert( i ); //alerts: 1, 2,3,4

let i = 0;
while (i++ < 5) alert( i ); //alerts 1,2,3,4,5

//task3
for (let i = 0; i < 5; i++) alert( i ); // alerts: 1,2,3,4
for (let i = 0; i < 5; ++i) alert( i ); //same

// task 4
for(let i = 2; i<= 10; i = i +2){
    alert(i)
}

//task5
for (let i = 0; i < 3; i++) {
    alert( `number ${i}!` );
}
let i =0
while(i<3){
    alert( `number ${i}!` )
    i++
}

// task 6
let num;

do {
    num = prompt("Введите число, большее 100?", 0);
} while (num <= 100 && num);

// task 7
isPrime = (n) => {
    for(let i = 0 ; i < Math.sqrt(n); i++){
        if(n % i ===0) return false
    }
    return true
}
let n = 10
for(let i = 0 ; i  < n ; i++){
    if(isPrime(i)){
        alert(i)
    }
}
