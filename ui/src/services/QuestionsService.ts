import axios from "axios";
import { Questions } from "../interfaces/Interfaces";

const easyURL =
  "https://opentdb.com/api.php?amount=6&difficulty=easy&type=multiple";
const medURL =
  "https://opentdb.com/api.php?amount=6&difficulty=medium&type=multiple";
const hardURL =
  "https://opentdb.com/api.php?amount=6&difficulty=hard&type=multiple";

const fetchQuestions = async () => {
  try {
    const token = await axios.get(
      "https://opentdb.com/api_token.php?command=request"
    );
    console.log(token);
    const easyResponse = await axios.get(
      `${easyURL}&token=${token.data.token}`
    );
    const medResponse = await axios.get(`${medURL}&token=${token.data.token}`);
    const hardResponse = await axios.get(
      `${hardURL}&token=${token.data.token}`
    );

    const easyQuestions: Questions[] = mapResultsToQuestions(
      easyResponse.data.results
    );
    const medQuestions: Questions[] = mapResultsToQuestions(
      medResponse.data.results
    );
    const hardQuestions: Questions[] = mapResultsToQuestions(
      hardResponse.data.results
    );

    const questions: Questions[] = [
      ...easyQuestions,
      ...medQuestions,
      ...hardQuestions,
    ];
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

const mapResultsToQuestions = (results: any[]) => {
  return results.map((result: any) => {
    const decodedIncorrectAnswers = result.incorrect_answers.map(
      (answer: string) => decodeHtmlEntities(answer)
    );
    return {
      category: result.category,
      difficulty: result.difficulty,
      question: decodeHtmlEntities(result.question),
      correctAnswer: decodeHtmlEntities(result.correct_answer),
      incorrectAnswers: decodedIncorrectAnswers,
      options: shuffle([...result.incorrect_answers, result.correct_answer]),
    };
  });
};

const decodeHtmlEntities = (text: string): string => {
  const entities: { [key: string]: string } = {
    "&quot;": '"',
    "&#039;": "'",
    "&ldquo;": "“",
    "&rdquo;": "”",
    "&rsquo;": "’",
    "&Uuml;": "Ü",
    "&amp;": "&",
  };

  return text.replace(
    /&quot;|&#039;|&ldquo;|&rdquo;|&Uuml;|&amp;|&rsquo;/g,
    (entity) => entities[entity]
  );
};

const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const QuestionService = {
  fetchQuestions: fetchQuestions,
};

export default QuestionService;
