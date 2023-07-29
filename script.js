const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null ;
let waitingForSecondValue =  false;


uptadeDisplay();

function uptadeDisplay (){
    display.value = displayValue;
}

keys.addEventListener('click', function(e){
    const element = e.target;

    if(!element.matches('button')) return;

    if(element.classList.contains('operator')) {
        // console.log('operator', element.value);
        handleOperator(element.value);
        uptadeDisplay();
        return;
    }
    
    if(element.classList.contains('decimal')) {
        //console.log('operator', element.value);
        inputDecimal();
        uptadeDisplay();
        return;
    }

    if(element.classList.contains('clear')) {
        // console.log('operator', element.value);
        clear();
        uptadeDisplay();
        return;
    }

    //console.log('number', element.value);
    inputNumber(element.value);
    uptadeDisplay();
});

function handleOperator(nextOperator){
    const value = parseFloat(displayValue); 
    if(operator && waitingForSecondValue){
        operator = nextOperator;
        return;
    }
        if(firstValue === null){
            firstValue = value;
        }else if(operator){
            const result = calculate(firstValue, value, operator);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstValue = result;
        }
    
    
    waitingForSecondValue = true;
    operator = nextOperator;
    console.log(displayValue, firstValue, operator, waitingForSecondValue);

    
};

function inputNumber(num){
    if(waitingForSecondValue){
        displayValue = num;
        waitingForSecondValue = false;
    }else{
        displayValue = displayValue=== '0' ? num: displayValue + num;
    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator){
    if(operator === '+'){
        return first + second;
    } else if(operator === '-'){
        return first - second;
    } else if (operator === '*'){
        return first * second;
    } else if (operator  === '/'){
        return first / second;
    }
    return second;
}

function inputDecimal(){
    if(!displayValue.includes('.')){
        displayValue += '.';
    };
   
}
function clear(){
    displayValue = '0';
}