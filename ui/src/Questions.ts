const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    correctAnswer: "Paris",
    difficulty: "Easy",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correctAnswer: "Leonardo da Vinci",
    difficulty: "Easy",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    difficulty: "Easy",
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Brain"],
    correctAnswer: "Skin",
    difficulty: "Easy",
  },
  {
    question: "Which scientist is known for the theory of general relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Stephen Hawking",
    ],
    correctAnswer: "Albert Einstein",
    difficulty: "Medium",
  },
  {
    question: "In which year did World War I end?",
    options: ["1917", "1918", "1919", "1920"],
    correctAnswer: "1918",
    difficulty: "Medium",
  },
  {
    question: "What is the chemical symbol for the element gold?",
    options: ["Au", "Ag", "Fe", "Hg"],
    correctAnswer: "Au",
    difficulty: "Medium",
  },
  {
    question: "Who wrote the novel 'To Kill a Mockingbird'?",
    options: [
      "Harper Lee",
      "F. Scott Fitzgerald",
      "Mark Twain",
      "John Steinbeck",
    ],
    correctAnswer: "Harper Lee",
    difficulty: "Medium",
  },
  {
    question: "Which country hosted the 2014 FIFA World Cup?",
    options: ["Brazil", "Germany", "Russia", "South Africa"],
    correctAnswer: "Brazil",
    difficulty: "Hard",
  },
  {
    question: "What is the longest river in the world?",
    options: [
      "Amazon River",
      "Nile River",
      "Yangtze River",
      "Mississippi River",
    ],
    correctAnswer: "Nile River",
    difficulty: "Hard",
  },
  {
    question: "Who is the author of the book '1984'?",
    options: [
      "George Orwell",
      "Ray Bradbury",
      "Aldous Huxley",
      "Ernest Hemingway",
    ],
    correctAnswer: "George Orwell",
    difficulty: "Hard",
  },
  {
    question: "Which composer wrote the 'Moonlight Sonata'?",
    options: [
      "Johann Sebastian Bach",
      "Ludwig van Beethoven",
      "Wolfgang Amadeus Mozart",
      "Frederic Chopin",
    ],
    correctAnswer: "Ludwig van Beethoven",
    difficulty: "Hard",
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "Nauru", "San Marino"],
    correctAnswer: "Vatican City",
    difficulty: "Very Hard",
  },
  {
    question: "Who composed the 'Ride of the Valkyries'?",
    options: [
      "Richard Wagner",
      "Ludwig van Beethoven",
      "Johann Strauss II",
      "Giuseppe Verdi",
    ],
    correctAnswer: "Richard Wagner",
    difficulty: "Very Hard",
  },
  {
    question: "Which philosopher wrote the book 'Thus Spoke Zarathustra'?",
    options: ["Friedrich Nietzsche", "Immanuel Kant", "Socrates", "Plato"],
    correctAnswer: "Friedrich Nietzsche",
    difficulty: "Very Hard",
  },
  {
    question: "What is the largest species of shark?",
    options: [
      "Great White Shark",
      "Whale Shark",
      "Tiger Shark",
      "Hammerhead Shark",
    ],
    correctAnswer: "Whale Shark",
    difficulty: "Very Hard",
  },
];

const fastestFingerQuestions = [
  {
    id: 1,
    question:
      "Arrange the following actors in chronological order based on their birth year",
    options: [
      { id: 1, text: "Brad Pitt" },
      { id: 2, text: "Will Smith" },
      { id: 3, text: "Leonardo DiCaprio" },
      { id: 4, text: "Paul Mescal" },
    ],
    correctOrder: [1, 2, 3, 4],
  },
  {
    id: 2,
    question:
      "Arrange the following books in order of their publication, from oldest to newest",
    options: [
      { id: 1, text: `"To Kill a Mockingbird" by Harper Lee` },
      { id: 2, text: `"1984" by George Orwell` },
      {
        id: 3,
        text: `"Harry Potter and the Sorcerer's Stone" by J.K. Rowling`,
      },
      { id: 4, text: `"The Great Gatsby" by F. Scott Fitzgerald` },
    ],
    correctOrder: [4, 2, 1, 3],
  },
  {
    id: 3,
    question:
      "Arrange the following programming languages in order of their release year, from oldest to newest",
    options: [
      { id: 1, text: "Python" },
      { id: 2, text: "C++" },
      { id: 3, text: "Java" },
      { id: 4, text: "Javascript" },
    ],
    correctOrder: [2, 3, 4, 1],
  },
  {
    id: 4,
    question:
      "Arrange the following musical instruments from the lowest pitch to the highest",
    options: [
      { id: 1, text: "Trombone" },
      { id: 2, text: "Tuba" },
      { id: 3, text: "Flute" },
      { id: 4, text: "Trumpet" },
    ],
    correctOrder: [2, 1, 4, 3],
  },
];

export { questions, fastestFingerQuestions };
