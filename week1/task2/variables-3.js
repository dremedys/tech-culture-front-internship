const birthday = '18.04.1982';

const age = someCode(birthday);

const BIRTHDAY = '18.04.1982'; // использовать заглавные буквы?
//answer: yes, it is never changed value - bday

const AGE = someCode(BIRTHDAY); // а здесь?
// no, age may change depending on function
