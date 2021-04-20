// task 1
if ("0") {
    alert( 'Привет' );
} // answer : alert will work , all strings except "" will be true

// task 2
let input = prompt('Какое "официальное" название JavaScript?')
input == 'ECMAScript' ? alert('Верно!') :  alert('Не знаете? ECMAScript!')

// task 3
let input = prompt('Введите число')
if(input == 0)
    alert(0)
else if(input > 0)
    alert(1)
else alert(-1)

// task 4
let result, a , b
a + b < 4 ? result = 'Few' : result = 'Many'


// task 5

let message
let login = ''
// if (login == 'Сотрудник') {
//     message = 'Привет';
// } else if (login == 'Директор') {
//     message = 'Здравствуйте';
// } else if (login == '') {
//     message = 'Нет логина';
// } else {
//     message = '';
// }
login == 'Employee' ? message='Hello' : login=='Boss' ? message='Zdraste' : login=='' ? message='No login': message=''

