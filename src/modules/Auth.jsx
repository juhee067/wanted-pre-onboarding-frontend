const TOKEN_KEY = "accessToken";

// 로컬 스토리지에 access token을 저장하는 함수
export const setAccessToken = (accessToken) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
};

// 로컬 스토리지에서 access token을 가져오는 함수
export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// 로컬 스토리지에서 access token을 삭제하는 함수
export const removeAccessToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
