export const METHOD_TYPE = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
  PATCH: 'PATCH',
} as const;

export const API_ENDPOINT = {
  // 메인
  MAIN: {
    HOME: { url: `/exp/api/v1/home`, method: METHOD_TYPE.GET },
  },


};
