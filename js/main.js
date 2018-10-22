// variable declaration
let input = ''; // refers to 'result.innerHTML'
let equation; // handle special operators: divide '÷' and multiply 'x'
let result = ''; // obtained after evaluating the equation
let operators = ['×', '÷', '-', '+'];
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let operator = true;
let dot = true;

// function
function clickedHander(e) {
    e.preventDefault();
    let btnVal = e.target.innerHTML;
    // reset all default values 
    if (btnVal === 'AC') {
        input = '';
        dot = true;
        operator = true;
    } else if (btnVal === 'CE') {
        input = input.slice(0, -1);
    } else if (btnVal === '=') {
        equation = input.replace(/×/g, '*').replace(/÷/g, '/'); // replace with the JS operators
        result = Math.round(eval(equation) * 1000000) / 1000000; // attempt to solve the inaccuracy precision (not a perfect solution) 
        input = result + ''; // convert number to string (for the purpose of using indexOf on it later on)
        dot = true;
        // if an operator button is clicked
    } else if (operators.indexOf(btnVal) > -1) {
        if (operator) {
            input += btnVal;
            operator = false
        } else {
            input = input.slice(0, -1) + btnVal;
        }
        dot = true; // after each operator, one dot is allowed
    } else if (btnVal === '.') {
        if (dot) {
            input += btnVal;
            dot = false;
        }
        // if a numeric button is clicked
    } else if (numbers.indexOf(btnVal) > -1) {
        // case one: while having the previous calculation result still shows, continues the next formula:
        // if previous result is followed by an operator, add the value out of the numerical button to the input
        if (result !== '' && operators.indexOf(input[input.length - 1]) > -1) {
            input += btnVal;
            result = '';
             // if a numerical button or dot button is clicked immediately since the previous result, just substitute the input with the button value
        } else 
        if (result !== '') {
            input = btnVal; // replace 
            result = '';
        // case two: result is empty
        } else if(result === ''){
            console.log('empty result');
            input += btnVal;
        }
        operator = true; // after each number, one operator is allowed
    }

    // finally, update the result 
    document.getElementById('res').innerHTML = input;
}



// Event handler 
document.getElementById('btns').addEventListener('click', clickedHander);