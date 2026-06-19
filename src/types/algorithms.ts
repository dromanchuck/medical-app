export interface IAnswer {
  id: number;
  text: string;
  weight: number;
}

export interface IQuestion {
  id: number;
  text: string;
  answers: IAnswer[];
}

interface ILink {
  title: string;
  link: string;
}

export interface ISource {
  id: number;
  text: string;
  links: ILink[];
}

export interface IResult {
  id: number;
  text: string;
  min_range: number;
  max_range: number;
}

export interface IAlgorithm {
  id: number;
  name: string;
  questions: IQuestion[];
  sources: ISource[];
  results: IResult[];
  questions_count: number;
}

export type TAlgorithmParams = IAlgorithm;
