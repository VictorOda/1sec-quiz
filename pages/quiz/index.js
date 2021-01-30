import React from 'react';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import { useRouter } from 'next/router';
import { Howl } from 'howler';
import QuizContainer from '../../src/components/QuizContainer';
import Button from '../../src/components/Button';
import PlayButton from '../../src/components/PlayButton';
import Head from 'next/head';
import AlternativesForm from '../../src/components/AlternativesForm';
import BackLinkArrow from '../../src/components/BackLinkArrow';
import Lottie from 'react-lottie';
import loadingAnim from '../../src/animations/loadingAnim';
import correctAnim from '../../src/animations/correctAnim';
import incorrectAnim from '../../src/animations/incorrectAnim';
import { BsPlay, BsPlayFill} from 'react-icons/bs';
import { motion } from 'framer-motion';

function ResultWidget({ results }) {
  const router = useRouter();
  const name = router.query.name;

  return (
    <Widget
      as={motion.section}
      transition={{ delay: 0, duration: 0.5, ease: "easeOut" }}
      variants={{
        show: {opacity: 1, y:'0'},
        hidden: {opacity: 0, y:'25%'}
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        <BackLinkArrow href="/" />
        RESULTADOS
      </Widget.Header>
      <img
        alt="GameOver"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
        src={db.resultImage}
      />
      <Widget.Content>
        <p>{name}, você acertou {results.reduce((somatoria, resultAtual) => {return resultAtual === true ? somatoria + 1 : somatoria}, 0)} músicas de {results.length}!</p>
        <ul>
          {results.map((result, resultIndex) => (
            <li key={`result__${resultIndex}`}>
              #0{resultIndex+1} - {db.questions[resultIndex].title} <b>{result == true ? 'ACERTOU' : 'ERROU'}</b>
            </li>
          ))}
        </ul>
        <form onSubmit={function (infosDoEvento) {
            // infosDoEvento.preventDefault();
            router.push(`/`);
        }}>
          <Button 
          type="submit" 
          disabled={name.length === 0}
          as={motion.button}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.1}
          }}
          >
          VOLTAR
          </Button>
        </form>
      </Widget.Content>
      
    </Widget>
  );
}

function LoadingWidget() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <Widget
      as={motion.section}
      transition={{ delay: 0, duration: 0.5, ease: "easeOut" }}
      variants={{
        show: {opacity: 1, y:'0'},
        hidden: {opacity: 0, y:'25%'}
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        Carregando quiz...
      </Widget.Header>

      <Widget.Content>
        <Lottie
          options={defaultOptions}
          height={200}
          width={200}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState();
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasSelectedAlternative = selectedAlternative !== undefined;
  const [isPlaying, setIsPlaying] = React.useState(false);
  const sound = new Howl({
    src: question.sound,
    html5: true,
    volume: 0.5,
    autoplay: false,
    preload: true,
    onend: () => {
      setIsPlaying(false);
    }
  });
  const defaultOptionsCorrect = {
    loop: false,
    autoplay: true,
    animationData: correctAnim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const defaultOptionsIncorrect = {
    loop: false,
    autoplay: true,
    animationData: incorrectAnim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <Widget
      as={motion.section}
      transition={{ delay: 0, duration: 0.5, ease: "easeOut" }}
      variants={{
        show: {opacity: 1, y:'0'},
        hidden: {opacity: 0, y:'25%'}
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        <BackLinkArrow href="/" />
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
        <PlayButton 
          onClick={() => {
            if(!isPlaying) {
              sound.play();
              setIsPlaying(true);
            }
          }}
          as={motion.button}
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.1}
          }}
          whileTap={{ scale: 1 }}
        >
          {!isPlaying && <BsPlay size={40} />}
          {isPlaying && <BsPlayFill size={40} />}
        </PlayButton>
        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmitted(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmitted(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmitted && alternativeStatus}
                as={motion.label}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.05, ease: "easeOut"}
                }}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onClick={() => setSelectedAlternative(alternativeIndex) }
                  type="radio"
                  disabled={isQuestionSubmitted}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          {!isQuestionSubmitted &&
            <Button 
              type="submit" 
              disabled={!hasSelectedAlternative}
              as={motion.button}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.05}
              }}
              whileTap={{ scale: 0.95 }}
            >
              Confirmar
            </Button>
          }
          {/* <p>selectedAlternative: {selectedAlternative}</p> */}
          {isQuestionSubmitted && isCorrect && <Lottie options={defaultOptionsCorrect} height={60} width={60} margin-top="20px" />}
          {isQuestionSubmitted &&!isCorrect && <Lottie options={defaultOptionsIncorrect} height={60} width={60} margin-top="20px" />}
        </AlternativesForm>
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
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result
    ]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    // load audio clips
    // db.questions.forEach(question => {
    //   audioClips = [
    //     ...audioClips,
    //     new Howl({
    //       src: question.sound,
    //       html5: true,
    //       volume: 0.5,
    //       autoplay: false,
    //       preload: true,
    //     })
    //   ];
    // });
    
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 2 * 1000);
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

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>1sec Quiz - GAMES</title>
        <meta property="og:title" content={db.title} />
        <meta property="og:description" content={db.description} />
        <meta property="og:image" content={db.bg} />
      </Head>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
