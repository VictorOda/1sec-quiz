import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Head from 'next/head';
import Credits from '../src/components/Credits';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Link from '../src/components/Link';
import { motion } from 'framer-motion';

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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <QuizContainer>
        <QuizLogo />
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
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            {db.description}
            {/* <p>{db.description}</p> */}
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}>
               <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Diz aí seu nome pra jogar :)"
                value={name}
              />
              <Button 
                type="submit" 
                disabled={name.length === 0}
                as={motion.button}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.1}
                }}
              >
                JOGAR
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          variants={{
            show: {opacity: 1, y:'0'},
            hidden: {opacity: 0, y:'25%'}
          }}
          initial="hidden"
          animate="show"
        >
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
                    <Widget.ExternalQuiz 
                      as={Link}
                      href={`/quiz/${repoName}.${user}?name=${name}`}
                      disabled={name.length === 0} 
                    >
                      {`${user}/${repoName}`}
                    </Widget.ExternalQuiz>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          variants={{
            show: {opacity: 1, y:'0'},
            hidden: {opacity: 0, y:'25%'}
          }}
          initial="hidden"
          animate="show"
        />
        <Credits 
          as={motion.footer}
          transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
          variants={{
            show: {opacity: 1, y:'0'},
            hidden: {opacity: 0, y:'25%'}
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/VictorOda" />
      
    </QuizBackground>
  );
}