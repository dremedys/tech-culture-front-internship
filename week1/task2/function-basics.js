// 1
function checkAge(age) {
    if (age > 18) {
        return true;
    } else {
        // ...
        return confirm('Родители разрешили?');
    }
}
function checkAge2(age) {
    if (age > 18) {
        return true;
    }
    // ...
    return confirm('Родители разрешили?');
}
// answer: functions are the same



//2
function checkAge(age) {
    if (age > 18) {
        return true;
    } else {
        return confirm('Родители разрешили?');
    }
}
// with ?
function checkAge1(age){
    return  age > 18 ? true  : confirm('Родители разрешили?')
}
//with  ||
function checkAge2(age){
    return age > 18 || confirm('Родители разрешили?');
}
