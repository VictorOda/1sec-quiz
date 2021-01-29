import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizPage from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
    return (
        <ThemeProvider theme={dbExterno.theme}>
            <QuizPage db={dbExterno} />
        </ThemeProvider>
    );
}

export async function getServerSideProps(context) {
    // const dbExterno = await fetch('https://aluraquiz-css.omariosouto.vercel.app/api/db')
    const dbExterno = await fetch('https://'+context.query.id+'.vercel.app/api/db')
        .then((respostaDoServer) => {
            if(respostaDoServer.ok) {
                return respostaDoServer.json();
            }
            throw new Error('Falha em pegar os dados');
        })
        .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
        .catch((err) => {
            console.error(err);
        });
    console.log('dbExterno: ', dbExterno);
    console.log('Infos que o Next dá para nós: ', context.query.id);

    return {
        props: {
            dbExterno
        }
    };
}