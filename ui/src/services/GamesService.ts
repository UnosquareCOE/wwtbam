import instance from "../utils/axios";

const getGame = async (gameId: string) => {
  return await instance.get(`/games/${gameId}`).then((response) => {
    return response;
  });
};

const createGame = async (type: number, sessionId: string) => {
  return await instance
    .post(`/games/${sessionId}`, { type })
    .then((response) => {
      return response;
    });
};

const GamesService = {
  getGame: getGame,
  createGame: createGame,
};

export default GamesService;
