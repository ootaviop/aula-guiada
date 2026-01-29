import "./App.css";
import Page from "./components/Page";
import PageBody from "./components/PageBody";
import PageHeader from "./components/PageHeader";
import BackBtn from "./components/BackBtn";
import CourseInfo from "./components/CourseInfo";
import Conclusion from "./components/Conclusion";
import VideoSection from "./components/VideoSection";
import './styles/variables.css';
import type { VideoOptionsProps } from "./types/types";


function App() {

   const videoOptions: VideoOptionsProps = {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: "/src/assets/videos/aula.mp4",
          type: "video/mp4",
          id: "lessonVideo",
        },
        {
          src: "/src/assets/videos/q1.mp4",
          type: "video/mp4",
          id: "question1",
          insertTime: 11.9,
        },
        {
          src: "/src/assets/videos/q2.mp4",
          type: "video/mp4",
          id: "question2",
          insertTime: 23,
        },
        {
          src: "/src/assets/videos/q3.mp4",
          type: "video/mp4",
          id: "question3",
          insertTime: 32,
        },
      ],
    };

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
          <VideoSection options={videoOptions} />
        </PageBody>
      </Page>
    </>
  );
}

export default App;
