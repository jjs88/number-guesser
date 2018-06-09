(function () {

  let winningNumber = 10;
  const range = {
    low: 1,
    high:100
  }

  const min = document.querySelector('.min');
  const max = document.querySelector('.max')
  const guessInput = document.querySelector('.input__text');
  const guessBtn = document.querySelector('.guess-btn');
  const resetBtn = document.querySelector('.reset-btn');
  const clearBtn = document.querySelector('.clear-btn');
  const error = document.querySelector('.error');
  let guessNumber = document.querySelector('.guess-number');
  let action = document.querySelector('.action');
  const last = document.querySelector('.last');
  let guessCnt = 0;
  let guessVal = '';
  let inPlay = true;
  clearBtn.disabled = true;

  guessInput.addEventListener('input', () => {
    if(guessInput.value) {
      clearBtn.disabled = false;
      return;
    }
    clearBtn.disabled = true;
    error.classList.add('hide');
    return;
  });

  clearBtn.addEventListener('click', () => {
    guessInput.value = '';
    clearBtn.disabled = true;
    error.classList.add('hide');
    return;
  });

  resetBtn.addEventListener('click', () => {
    resetGame();
  });

  guessBtn.addEventListener('click', () => {
    if(guessInput.value === '') {
      return; //no input val so exit
    }

    if(!isNumberValid(guessInput.value) || !isInRange(guessInput.value)) {
      error.classList.remove('hide');
      return; //return from event. input is out of range or invalid
    }

    if(min.value && max.value && inPlay === true) {
      setRange();
      winningNumber = getRandomInt()
      console.log(winningNumber, range);
      inPlay = false; //set to false. can't change values again until winner or reset
    }

    if(last.innerHTML = 'Winner Number!') {
      last.innerHTML = 'Your last guess was';
    }

    /////////////////////////////////////
    //validation successful - game starts
    ///////////////////////////////////

    displayResultText(guessInput.value);

    guessCnt++;

    if(guessCnt > 0) {
      action.classList.remove('hide');
      last.classList.remove('hide');
      guessNumber.classList.remove('hide');
      guessNumber.innerHTML = guessInput.value;
      resetBtn.classList.remove('hide');
    }

  });


  function isNumberValid(input) {
    const regex = /[0-9]/g;
    return regex.test(input);
  }

  function isInRange(input) {
    return (parseInt(input) >= range.low && 
            parseInt(input) <= range.high) ? true:false;
  }

  function displayResultText(input) {
    guessVal = parseInt(input);

    if(guessVal === winningNumber) {
      action.innerHTML = 'Boom'
      last.innerHTML = 'Winner Number!'
      inPlay = true; //reset flag once player wins
      resetRange();

    } else if(guessVal > winningNumber) {
      action.innerHTML = 'That is too high';
    } else { 
      action.innerHTML = 'That is too low';
    }
  }

  function resetGame() {
    action.classList.add('hide');
    last.classList.add('hide');
    guessNumber.classList.add('hide');
    resetBtn.classList.add('hide');
    guessInput.value = '';
    error.classList.add('hide');
    resetRange();
    inPlay = true;
  }

  function setRange() {
    range.low = parseInt(min.value);
    range.high = parseInt(max.value);
  }

  function resetRange() {
    min.value = '';
    max.value = '';
    range.low = 1;
    range.high = 100;
    winningNumber = 10;
  }

  function getRandomInt() {
    // console.log(range.high, range.low);
    return Math.floor(Math.random() * (range.high - range.low + 1)) + range.low;
  }

})();