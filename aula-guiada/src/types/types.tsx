export type VideoOptionsProps = {
  autoplay: boolean;
  controls: boolean;
  responsive: boolean;
  fluid: boolean;
  sources: {
    src: string;
    type: string;
    id?: string;
    insertTime?: number;
  }[];
};

export type VideoSourceProps = {
  src: string;
  type: string;
  id?: string;
  insertTime?: number;
};

export type VideoStateProps = {
  isPlaying: string;
};

export type QuestionProps = {
  id: string;
  insertTime: number;
};