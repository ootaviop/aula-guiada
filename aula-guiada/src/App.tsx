
import './App.css'

import Title from './components/title'
import Paragraph from './components/Paragraph'
import Page from './components/Page'
import Content from './components/Content'
import VideoAula from './components/VideoAula'
import Destaque from './components/Destaque'

function App() {


  return (
    <>
      <Page>
        <Content>

          <Title
            level={2}
            text='Competências e Estrutura Organizacional da SEE/MG'
          />

          <Paragraph
            text='O segundo tópico apresenta para o Mentorado(a) o decreto que estabelece as competências gerais e específicas da SEE e sua estrutura organizacional. O Decreto nº 48.709, de 26 de outubro de 2023, '
          />

          <Paragraph
            text='Neste tópico, o foco principal está nos artigos 2º, 3º e 4º do decreto. Para que vocês o entendam bem e possam apoiar os seus grupos, recomendamos que escutem o podcast que aprofunda o tema e aborda, especialmente, o artigo 2º do Decreto 48.709/23. Essa é a segunda tarefa do(a) Mentorado(a) durante seu processo formativo.'
          />

          <Paragraph
            text='O segundo tópico apresenta para o Mentorado(a) o decreto que estabelece as competências gerais e específicas da SEE e sua estrutura organizacional. O Decreto nº 48.709, de 26 de outubro de 2023, '
          />

          <Paragraph
            text='Neste tópico, o foco principal está nos artigos 2º, 3º e 4º do decreto. Para que vocês o entendam bem e possam apoiar os seus grupos, recomendamos que escutem o podcast que aprofunda o tema e aborda, especialmente, o artigo 2º do Decreto 48.709/23. Essa é a segunda tarefa do(a) Mentorado(a) durante seu processo formativo.'
          />

          <Paragraph
            text='Além de estar disponível para o(a) Mentorado(a), colocamos o mesmo recurso aqui no espaço de vocês. Explorem, naveguem e conheçam cada detalhe dessa estrutura organizacional. Vocês também fazem parte dela e conhecê-la é fundamental para que compreendam a importância do papel de vocês neste projeto.'
          />

          <Destaque 
          text='Outro ponto de estudo do Mentorado(a) será conhecer a engrenagem da estrutura organizacional da SEE/MG. Em seu espaço, ele(a) encontrará um organograma interativo que apresenta a divisão da SEE/MG e cada setor, cargo e subsecretaria. O recurso disponível permite a ampliação para melhor visualização do conteúdo.' 
          type='Atenção'
>

          </Destaque>
        </Content>

        <VideoAula>

        </VideoAula>
      </Page>
    </>
  )
}

export default App
