let currentNumber = '';
let lastNumber = '';
let currentOperator = '';
let result = 0;
let equalsClicked = false;

function onClickAc() {
  resetAll();
}

function onClickDel() {
  const calculationScreen = document.getElementById('calculation');
  const resultScreen = document.getElementById('result');

  if (calculationScreen.innerHTML.length === 1) {
    resetAll();
  } else {
    if (isLastCharOperator()) {
      currentNumber = lastNumber;
      lastNumber = '';
    } else {
      currentNumber = currentNumber.slice(0, currentNumber.length - 1);
    }

    // NOTE: 0 is the position of the first character of a string
    calculationScreen.innerHTML = calculationScreen.innerHTML.slice(0, calculationScreen.innerHTML.length - 1);

    if (!currentNumber) {
      result = 0;
    } else {
      result = makeCalculation();
    }
    resultScreen.innerHTML = result === 0 ? '' : getParsedResult();
  }
}

function onClickNumber(event) {
  const calculationScreen = document.getElementById('calculation');
  const resultScreen = document.getElementById('result');
  const numberClicked = event.target.innerHTML;

  if (equalsClicked) {
    resetAll();
  }

  if (calculationScreen.innerHTML === '0') {
    calculationScreen.innerHTML = numberClicked;
  } else {
    calculationScreen.innerHTML += numberClicked;
  }
  currentNumber += numberClicked;

  if (lastNumber) {
    result = makeCalculation();
    resultScreen.innerHTML = getParsedResult();
  }
}

function onClickOperator(event) {
  const calculationScreen = document.getElementById('calculation');
  const operatorClicked = event.target.innerHTML;

  if (operatorClicked === '-' && isLastCharOperatorDivisionOrMultiplication()) {
    calculationScreen.innerHTML += '-';
    currentNumber = '-';
    return;
  }

  currentOperator = operatorClicked;
  if (!lastNumber && !currentNumber) {
    calculationScreen.innerHTML = operatorClicked;
    currentNumber = '-';
    return;
  }

  if (equalsClicked) {
    calculationScreen.innerHTML = result + operatorClicked;
    lastNumber = result;
    resetResultAndEquals();
  } else if (lastNumber && currentNumber) {
    calculationScreen.innerHTML = getParsedResult() + operatorClicked;
    lastNumber = result;
  } else if (!isLastCharOperator()) {
    calculationScreen.innerHTML += operatorClicked;
    lastNumber = currentNumber;
  } else {
    calculationScreen.innerHTML =
      calculationScreen.innerHTML.slice(0, calculationScreen.innerHTML.length - 1) + operatorClicked;
  }

  currentNumber = '';
}

function onClickComma() {
  const calculationScreen = document.getElementById('calculation');

  if (equalsClicked) {
    resetAll();
    calculationScreen.innerHTML = '0,';
    currentNumber = '0.';
  } else if (!currentNumber.includes('.')) {
    if (currentOperator && !currentNumber) {
      calculationScreen.innerHTML += '0,';
      currentNumber = '0.';
    } else {
      calculationScreen.innerHTML += ',';
      currentNumber += '.';
    }
  }
}

function onClickEquals() {
  if (lastNumber) {
    equalsClicked = true;

    // Change screen sizes
    // Solution changing a class and styles on the css file
    const screen = document.getElementById('screen');
    screen.classList.add('equals-clicked');

    // Solution manually changing all styles
    // const calculationScreen = document.getElementById('calculation');
    // const resultScreen = document.getElementById('result');

    // calculationScreen.style.height = '50px';
    // calculationScreen.style.fontSize = '40px';
    // calculationScreen.style.color = 'lightgray';

    // resultScreen.style.height = '75px';
    // resultScreen.style.fontSize = '60px';
    // resultScreen.style.color = 'white';
  }
}

function makeCalculation() {
  let calc = 0;
  switch (currentOperator) {
    case '÷':
      calc = parseFloat(lastNumber) / parseFloat(currentNumber);
      break;
    case '×':
      calc = parseFloat(lastNumber) * parseFloat(currentNumber);
      break;
    case '-':
      calc = parseFloat(lastNumber) - parseFloat(currentNumber);
      break;
    case '+':
      calc = parseFloat(lastNumber) + parseFloat(currentNumber);
      break;
  }

  return calc || 0;
}

function getParsedResult() {
  /**
   * Using .toString() to remove trailing zero's
   *
   * result.toFixed(8) returns a string,
   * so we parse it into a number(float)
   * and when applying .toString() all the trailing zero's disappear
   */
  return parseFloat(result.toFixed(8)).toString().replace('.', ',');
}

/**
 * Returns true if str is an operator ÷ or ×
 *
 * @param {string} str
 */
function isLastCharOperatorDivisionOrMultiplication() {
  const calculationScreen = document.getElementById('calculation');
  const lastChar = calculationScreen.innerHTML.slice(calculationScreen.innerHTML.length - 1);
  return lastChar === '÷' || lastChar === '×';
}

/**
 * Returns true if last operator is
 *
 * @param {string} str
 */
function isLastCharOperator() {
  const calculationScreen = document.getElementById('calculation');
  const lastChar = calculationScreen.innerHTML.slice(calculationScreen.innerHTML.length - 1);
  const beforeLastChar = calculationScreen.innerHTML.slice(
    calculationScreen.innerHTML.length - 2,
    calculationScreen.innerHTML.length - 1,
  );

  if (beforeLastChar === '÷' || beforeLastChar === '×') {
    return false;
  }

  return lastChar === '÷' || lastChar === '×' || lastChar === '-' || lastChar === '+';
}

function resetAll() {
  const calculationScreen = document.getElementById('calculation');
  calculationScreen.innerHTML = '0';
  currentNumber = '';
  lastNumber = '';
  currentOperator = '';
  resetResultAndEquals();
}

function resetResultAndEquals() {
  const resultScreen = document.getElementById('result');
  resultScreen.innerHTML = '';
  equalsClicked = false;
  result = 0;

  // Change screen sizes
  // Solution changing a class and styles on the css file
  const screen = document.getElementById('screen');
  screen.classList.remove('equals-clicked');

  // Solution manually changing all styles
  // const calculationScreen = document.getElementById('calculation');
  // const resultScreen = document.getElementById('result');

  // calculationScreen.style.height = '75px';
  // calculationScreen.style.fontSize = '60px';
  // calculationScreen.style.color = 'white';

  // resultScreen.style.height = '50px';
  // resultScreen.style.fontSize = '40px';
  // resultScreen.style.color = 'lightgray';
}
