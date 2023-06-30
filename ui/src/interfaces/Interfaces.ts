export interface Questions {
  category: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  options: (string | null)[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
