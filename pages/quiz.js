import React from 'react'
import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import GitHubCorner from '../src/components/GitHubCorner'
import { useRouter } from 'next/router'
import { Howl } from 'howler'
import Credits from '../src/components/Credits'
import QuizContainer from '../src/components/QuizContainer'
import Button from '../src/components/Button'


const audioClips = [
  {sound: "https://ia903104.us.archive.org/25/items/smb1music/1%20-%20Running%20About.mp3", label: "Super Mario - Running About"},
  {sound: "https://ia803104.us.archive.org/25/items/smb1music/11%20-%20Level%20Complete.mp3", label: "Super Mario - Level Complete"},
  {sound: "http://docs.google.com/uc?export=open&id=1f-iYZVSZJyieF-seFOwDLx7884qYBlWi", label: "Google Drive"}
]

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  let sound = new Howl({
    src: question.sound,
    html5: true,
    volume: 0.5,
    autoplay: false,
    preload: true,
    onend: () => {
      isPlaying = false;
    }
  });
  let isPlaying = false;
  const SoundPlay = (src) => {
    if (!isPlaying) {
      sound = new Howl({
        src,
        html5: true,
        volume: 0.5,
        autoplay: false,
        preload: true,
        onend: () => {
          isPlaying = false;
        }
      })
      sound.play();
      isPlaying = true;
    }
    else {
      sound.stop();
      isPlaying = false;
    }
  }

  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          {`Música ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <Button onClick={() => SoundPlay(question.sound)}>Play</Button>
        <form
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            onSubmit();
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
              >
                <input
                  // style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }
  
  const router = useRouter();
  const name = router.query.name;

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>{name}, você acertou X questões, parabéns!</div>}
        <Credits />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/VictorOda" />
    </QuizBackground>
  );
}
