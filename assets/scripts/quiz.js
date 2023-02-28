'use script';

const questions=[
    {
        Id:1,
        question:"日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？",
        selectors:["約28万人","約79万人","約183万人"],
        answerIndex:1,
        quote:"経済産業省 2019年3月 － IT 人材需給に関する調査"
    },
    {
        Id:2,
        question:"既存業界のビジネスと、先進的なテクノロジーを結びつけて<br>生まれた、新しいビジネスのことをなんと言うでしょう?",
        selectors:["INTECH","BIZZTECH","X-TECH"],
        answerIndex:2,
    },
    {   Id:3,
        question:"loTとは何の略でしょうか？",
        selectors:["Internet of Things", "Integrate into Technology" , "Information on Tool"],
        answerIndex:0
    },
    {
        Id:4,
        question: "日本が目指すサイバー空間とフィジカル空間を高度に融合させたシステムによって開かれる未来社会のことをなんと言うでしょうか？",
        selectors: ['Society 5.0', 'CyPhy', 'SDGs'],
        answerIndex:0,
        quote:'Society5.0 - 科学技術政策 - 内閣府'
    },
    {
        Id:5,
        question:'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
        selectors:['Web3.0', 'NFT', 'メタバース'],
        answerIndex:0
    },
    {
        Id:6,
        question:'先進テクノロジー活用企業と出遅れた企業の収益性の差はどれくらいあると言われているでしょうか？',
        selectors:['約2倍', '約5倍', '約11倍'],
        answerIndex:1,
        quote:'Accenture Technology Vision 2021'

    },
]

const quizContainer = document.getElementById("js-quizContainer")
//（引数）、（）＝＞の形がアロー関数
const createQuizHtml = (quizItem, questionNumber) => {

    const answersHtml = quizItem.selectors.map((answer, answerIndex) => `<p class="quiz-choice-common"><button class="p-quiz-box__answer__button js-answer" data-answer="${answerIndex}">${answer}</button></p>`).join('');
   
    const noteHtml = quizItem.quote ? ` <div class="quiz-quote"><i class="u-icon__note"></i>
    <p class="quiz-quote-content">${quizItem.quote}</p></div>`: '' ;

    return `<div class="quiz-question-wrapper js-quiz" data-quiz="${questionNumber}">
    <div class="quiz-question-number">
        <p class="quiz-main">Q${questionNumber + 1 }</p>
    </div>
    <div class="quiz-question">
        <p class="quiz-question-content">${quizItem.question}</p>
    </div>
    <div class="question-image">
        <img class="question-image-common" src="../assets/img/quiz/img-quiz0${quizItem.Id}.png" alt="question1">
    </div>
    <div class="quiz-answer">
        <p class="quiz-answer-content">A</p>
    </div>
    <div class="quiz-choice">
        ${answersHtml}
    </div>
    <div class="quiz-js js-answerBox">
        <div class="quiz-js-wrapper">
            <p class="quiz-js-title js-answerTitle"></p>
            <div class="quiz-js-answer">
                <p class="quiz-js-A">A</p>
                <p class="quiz-js-content js-answerText"></p>
            </div> 
        </div>
    </div>
    ${noteHtml}
</div> `
}

const shuffle = arrays => {
    const array = arrays.slice();
    for (let i = array.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array
  }

const quizArray = shuffle(questions)


quizContainer.innerHTML = quizArray.map((quizItem, index) => {
    return createQuizHtml(quizItem, index)
}).join('');

const allQuiz = document.querySelectorAll(".js-quiz")

const setDisabled = answers => {
    answers.forEach(answer =>{
        answer.disabled = true;
    })
}

const setTitle = (target, isCorrect) => {
    target.innerText = isCorrect ? '正解！' : '不正解...';
  }

const setClassName = (target, isCorrect) => {
    target.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
  }



allQuiz.forEach(quiz => {
    const answers = quiz.querySelectorAll('.js-answer');
    const selectedQuiz = Number(quiz.getAttribute('data-quiz'));
    const answerBox = quiz.querySelector('.js-answerBox');
    const answerTitle = quiz.querySelector('.js-answerTitle');
    const answerText = quiz.querySelector('.js-answerText');

    answers.forEach(answer => {
        answer.addEventListener('click', () => {
          answer.classList.add('is-selected');
          const selectedAnswerNumber = Number(answer.getAttribute('data-answer'));

          setDisabled(answers);

        const correctNumber = quizArray[selectedQuiz].answerIndex
        const isCorrect = correctNumber === selectedAnswerNumber;

        console.log(selectedQuiz)
        console.log(correctNumber)

        answerText.innerText = quizArray[selectedQuiz].selectors[correctNumber];
        setTitle(answerTitle, isCorrect);
        setClassName(answerBox, isCorrect);



        })
    })
})  
