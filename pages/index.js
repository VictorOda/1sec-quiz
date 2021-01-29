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
import Input from '../src/components/Input'
import Button from '../src/components/Button'
import QuizContainer from '../src/components/QuizContainer'

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  console.log('router: ' + JSON.stringify(router));
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
               <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Diz aí seu nome pra jogar :)"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                JOGAR
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>Mais quizes sobre games!</p>
            <ul>
              {db.external.map((url) => {
                const prepareUrl = url
                    .replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.vercel.app', '');

                const [repoName, user] = prepareUrl.split('.');
                return (
                  <li key={url}>
                    <Widget.Topic href={`/quiz/${repoName}.${user}?name=${name}`}>
                      {`${user}/${repoName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
        <Credits />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/VictorOda" />
      
    </QuizBackground>
  );
}