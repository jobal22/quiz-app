/* function responsible for starting quiz when button's clicked. */
function startQuiz() {
    $('#start').on('click', function(event){
      renderAQuestion();
    }
    );
  }
  
  /* Displays question number and score obtained */
  function updateQuestionAndScore() {
    const html = $(`<ul>
        <li id="js-answered">Question Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li>
        <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
      </ul>`);
    $(".question-and-score").html(html);
  }
  
  /* Displays the options for the current question */
  function updateOptions()
  {
    let question = STORE.questions[STORE.currentQuestion];
    for(let i=0; i<question.options.length; i++)
    {
      $('.js-options').append(`
          <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"> 
          <label for="option${i+1}"> ${question.options[i]}</label> <br/>
          <span id="js-r${i+1}"></span>
      `);
    }
    
  }
  
  /*displays the question*/
  function renderAQuestion() {
    let question = STORE.questions[STORE.currentQuestion];
    updateQuestionAndScore();
    const questionHtml = $(`
    <div>
      <form id="js-questions" class="question-form">
        
        <fieldset>
          <div class="row question">
            <div class="fluent">
              <legend> ${question.question}</legend>
            </div>
          </div>
  
          <div class="row options">
            <div class="fluent">
              <div class="js-options"> </div>
          </div>
        </div>
      
  
        <div class="rowOne">
          <div class="moveForward">
            <button type = "submit" id="answer" tabindex="5">Submit</button>
            <button type = "button" id="next-question" tabindex="6"> Next >></button>
          </div>
        </div>
      </fieldset>
      </form>
    </div>`);
  $("main").html(questionHtml);
  updateOptions();
  $("#next-question").hide();
  }
  
  /* displays results and restart quiz button */
  function displayResults() {
    let resultHtml = $(
      `<div class="results">
        <form id="js-restart-quiz">
          <fieldset>
            <div class="rowOne">
              <div class="fluent">
                <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
              </div>
            </div>
          
            <div class="rowOne">
              <div class="fluent">
                <p>Remember to tell every person: </br>God loves you. He died on the cross 
                for your sin, and He rose from the grave on the third day. If you turn from 
                your sins, trust in Him, and confess Him as Lord, then you will be saved. 
                Do you want to trust in Jesus today?</p>
              </div>
            </div>

            <div class="rowOne">
              <div class="moveForward">
                <button type="button" id="restart"> Restart Quiz </button>
              </div>
            </div>
          </fieldset>
      </form>
      </div>`);
      STORE.currentQuestion = 0;
      STORE.score = 0;
    $("main").html(resultHtml);
  }
  
  /* checks whether it reached the end of questions list */
  function handleQuestions() {
    $('body').on('click','#next-question', (event) => {
      STORE.currentQuestion === STORE.questions.length?displayResults() : renderAQuestion();
    });
  }
  
  
  /*checks whether the chosen option is right or wrong and displays respective message*/ 
  function handleSelectOption() {
    $('body').on("submit",'#js-questions', function(event) {
      event.preventDefault();
      let currentQues = STORE.questions[STORE.currentQuestion];
      let selectedOption = $("input[name=options]:checked").val();
      if (!selectedOption) {
        alert("Choose an option");
        return;
      } 
      let id_num = currentQues.options.findIndex(i => i === selectedOption);
      let id = "#js-r" + ++id_num;
      $('span').removeClass("right-answer wrong-answer");
      if(selectedOption === currentQues.answer) {
        STORE.score++; 
        $(`${id}`).append(`This is the correct answer!!!<br/>`);
        $(`${id}`).addClass("right-answer");
      }
      else {
        $(`${id}`).append(`This answeris incorrect <br/> The answer is "${currentQues.answer}"<br/>`);
        $(`${id}`).addClass("wrong-answer");
      }
  
      STORE.currentQuestion++;
      $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
      $('#answer').hide();
      $("input[type=radio]").attr('disabled', true);
      $('#next-question').show();
    });
  }
  
  function restartQuiz() {
    $('body').on('click','#restart', (event) => {
      renderAQuestion();
    });
  }
  
  function handleQuizApp() {
    startQuiz();
    handleQuestions();
    handleSelectOption();
    restartQuiz();
  }
  
  $(handleQuizApp);