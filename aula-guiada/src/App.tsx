import "./App.css";
import Page from "./components/Page";
import PageBody from "./components/PageBody";
import PageHeader from "./components/PageHeader";
import BackBtn from "./components/BackBtn";
import CourseInfo from "./components/CourseInfo";
import Conclusion from "./components/Conclusion";
import VideoSection from "./components/VideoSection";
import TextSection from "./components/TextSection";
import './styles/variables.css';

function App() {
  return (
    <>
      <Page>
        <PageHeader>
          <div className="left">
          <BackBtn />
          <CourseInfo title="Segurança no Trabalho: Uso Correto de EPIs" />
          </div>
          <Conclusion />
        </PageHeader>

        <PageBody >
          <VideoSection />
          <TextSection />
        </PageBody>
      </Page>
    </>
  );
}

export default App;
