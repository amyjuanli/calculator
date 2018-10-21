// variable declaration
let result = document.getElementById('res');
let input = '';
let equation; // handle special operators: divide '÷' and multiply 'x'
let operators = ['×', '÷', '-', '+']; 
let operator = true;


// function
function clickedHander(e) {
    e.preventDefault();
    let btnVal = e.target.innerHTML;
    if (btnVal === 'AC') {
        input = '';
    } else if (btnVal === 'DEL') {
        input = input.slice(0, -1);
    } else if (btnVal === '=') {
        equation = input.replace(/×/g, '*').replace(/÷/g, '/');
        // input = Math.round(eval(equation)*1000000)/1000000;
        input = eval(equation);
    } else if (operators.indexOf(btnVal) > -1) {
       if(operator) {
           input += btnVal;
           operator = false
        } else {
            input = input.slice(0, -1) + btnVal;
        }
    } else {
        input += e.target.innerHTML;
    }
    result.innerHTML = input; // update the result 
}



// Event handler 
document.getElementById('btns').addEventListener('click', clickedHander);