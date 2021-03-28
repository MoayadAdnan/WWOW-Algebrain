const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is 22 + 38?', //beginner
    answers: [
      { text: '61', correct: false },
      { text: '60', correct: true },
      { text: '59', correct: false },
      { text: '58', correct: false }
    ]
  },
  {
    question: 'What is 56 - 32?',
    answers: [
      { text: '24', correct: true },
      { text: '25', correct: false },
      { text: '20', correct: false },
      { text: '30', correct: false },
    ]
  },
  {
    question: 'What is 147 + 198?',
    answers: [
      { text: '340', correct: false },
      { text: '350', correct: false },
      { text: '348', correct: false },
      { text: '345', correct: true }
    ]
  },
  {
    question: 'What is 8 x 6?', //novice
    answers: [
      { text: '49', correct: true },
      { text: '44', correct: false },
      { text: '56', correct: false },
      { text: '68', correct: false }
    ]
  },
  {
    question: 'What is 56 ÷ 7?',
    answers: [
      { text: '4', correct: false },
      { text: '8', correct: true },
      { text: '3', correct: false },
      { text: '6', correct: false },
    ]
  },
  {
    question: 'What is 7 x 13?',
    answers: [
      { text: '96', correct: false },
      { text: '99', correct: false },
      { text: '91', correct: true },
      { text: '90', correct: false }
    ]
  },
  {
    question: 'What is 1/7 - 4/9?', //competent
    answers: [
      { text: '-19/63', correct: true },
      { text: '19/63', correct: false },
      { text: '-1/2', correct: false },
      { text: '18/24', correct: false }
    ]
  },
  {
    question: 'What is ⅘ + ⅔?',
    answers: [
      { text: '20/14', correct: false },
      { text: '22/15', correct: true },
      { text: '1/4', correct: false },
      { text: '2/3', correct: false }
    ]
  },
  {
    question: 'What is ½ ÷ ½?',
    answers: [
      { text: '1/4', correct: false },
      { text: '1', correct: true }
    ]
  },
  {
    question: 'What is 20% of 830?', //proficient
    answers: [
      { text: '133', correct: false },
      { text: '120', correct: false },
      { text: '160', correct: false },
      { text: '166', correct: true }
    ]
  },
  {
    question: 'What is 3% of 220?',
    answers: [
      { text: '7.76', correct: false },
      { text: '2.5', correct: false },
      { text: '6.6', correct: true },
      { text: '5', correct: false }
    ]
  },
  {
    question: 'What is the percentage of 120/900?',
    answers: [
      { text: '13.3%', correct: true },
      { text: '16.9%', correct: false },
      { text: '18%', correct: false },
      { text: '30%', correct: false }
    ]
  },
  {
    question: 'Simplify x6/x5', //expert
    answers: [
      { text: 'x', correct: true },
      { text: '-x', correct: false }
    ]
  },
  {
    question: 'Simplify (x-y)^2/x*y(x+y)/(x^2+9)',
    answers: [
      { text: '(x-y)^2 * (x^2+9)/ xy(x+y)', correct: true },
      { text: 'x+3x+7', correct: false }
    ]
  },
  {
    question: 'Solve 5x - 3 = 4x + 33', //master
    answers: [
      { text: '22', correct: false },
      { text: '32', correct: false },
      { text: '36', correct: true },
      { text: '47', correct: false }
    ]
  },
  {
    question: 'Solve 2m + 5 = 4m + 11',
    answers: [
      { text: '4', correct: false },
      { text: '1', correct: false },
      { text: '-2', correct: false },
      { text: '-3', correct: true }
    ]
  },
  {
    question: 'Solve x − 7y = − 11 and 5x + 2y = − 18', //grandmaster
    answers: [
      { text: '(-4,1)', correct: true },
      { text: '(1,-4)', correct: false },
      { text: '(2,4)', correct: false },
      { text: '(4,2)', correct: false }
    ]
  },
  {
    question: 'Solve 3x+4(x−3)=3(2y−3)−3y and 3y+2(x−4)=5(y+2)−28',
    answers: [
      { text: '(7,4)', correct: false },
      { text: '(-2,1)', correct: false },
      { text: '(3,2)', correct: false },
      { text: '(-4,1)', correct: true }
    ]
  }
]