export interface VideoSource {
  src: string;
  type: string;
}

export interface Story {
  title: string;
  source: VideoSource[];
}
