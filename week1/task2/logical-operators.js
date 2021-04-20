// 1
alert( null || 2 || undefined );
// output: true

// 2
alert( alert(1) || 2 || alert(3) );
// output: 1 , 2

// 3
alert( 1 && null && 2 );
// null

// 4
alert( alert(1) && alert(2) );
// 1 , undefined

//5
alert( null || 2 && 3 || 4 );
// ans: 3

//6
let age;
if(age >= 14 && age <=90){}

// 7
let age;
if(!(age >= 14 && age <=90)){} // method 1
if(age <= 14 || age > 90) {} // method 2

//8
if (-1 || 0) alert( 'first' );  // true
if (-1 && 0) alert( 'second' );  // false
if (null || -1 && 1) alert( 'third' ); // true

//9

let name = prompt("Кто там?")
if (name === 'Админ') {

    let pass = prompt('Пароль?');

    if (pass === 'Я главный')
        alert('Здравствуйте!')
    else if (pass === '' || pass == null)
        alert('Отменено')
    else
        alert( 'Неверный пароль' )
}

else if (name === '' || name === null)
    alert( 'Отменено' )
else
    alert( "Я вас не знаю" )




