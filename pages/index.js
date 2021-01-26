import styled from 'styled-components'
import { useRouter } from 'next/router'
import db from '../db.json';
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Head from 'next/head'
import Credits from '../src/components/Credits'

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export const NameInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 20px 0px;
  border-radius: ${db.theme.borderRadius};
  background-color: ${db.theme.colors.mainBg};
  border: 2px solid ${db.theme.colors.primary};
  font-size: 16px;
  padding: 0 0 0 10px;
  color: white;
  ::placeholder {
    color: ${db.theme.colors.primary};
  }
`;

export const QuizButton = styled.button`
  background-color: ${db.theme.colors.secondary};
  border: none;
  border-radius: ${db.theme.borderRadius};
  font-size: 20px;
  width: 100%;
  height: 40px;
  color: ${db.theme.colors.contrastText};
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

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
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            {db.description}
            {/* <p>{db.description}</p> */}
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fazendo uma submissão por meio do react');
            }}>
              <NameInput 
                onChange={function(infosDoEvento) {
                  setName(infosDoEvento.target.value);
                }}
                placeholder="Diz aí seu nome para jogar :)" />
              <QuizButton type="submit" disabled={name.length === 0}>
                JOGAR
              </QuizButton>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
        <Credits />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/VictorOda" />
      
    </QuizBackground>
  );
}