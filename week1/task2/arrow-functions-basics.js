// function ask(question, yes, no) {
//     if (confirm(question)) yes()
//     else no();
// }
//
// ask(
//     "Вы согласны?",
//     function() { alert("Вы согласились."); },
//     function() { alert("Вы отменили выполнение."); }
// );
const myAsk = (question, yes, no) => {
    if(confirm(question)) yes()
    else no()
}
myAsk(
    "Soglasny?",
    () => {alert('yes you do')},
    () => {alert('no you dont')}
)
