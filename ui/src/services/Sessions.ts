import instance from "../utils/axios";

const getSessions = async () => {
  return await instance.get("/sessions").then((response) => {
    return response;
  });
};

const getSessionById = async (sessionId: string) => {
  return await instance.get(`/sessions/${sessionId}`).then((response) => {
    return response;
  });
};

const createSession = async (name: string, password: string) => {
  return instance.post(`/sessions`, { name, password }).then((response) => {
    return response;
  });
};

const deleteSession = async (sessionId: string) => {
  return instance.delete(`/sessions/${sessionId}`).then((response) => {
    return response;
  });
};

const createGame = async (type: number, sessionId: string) => {
  return await instance
    .post(`/sessions/${sessionId}/games`, { type })
    .then((response) => {
      return response;
    });
};

const getGames = async (sessionId: string) => {
  return await instance.get(`/sessions/${sessionId}/games`).then((response) => {
    return response;
  });
};

const SessionServices = {
  getSessions: getSessions,
  getSessionById: getSessionById,
  createSession: createSession,
  deleteSession: deleteSession,
  createGame: createGame,
  getGames: getGames,
};

export default SessionServices;
