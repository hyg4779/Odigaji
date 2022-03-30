const server = {
  BASE_URL: 'https://3.38.250.117:8080',

  ROUTES: {
    login: '/api/token/',
    signup: '/api/accounts/signup/',
    random: '/api/rec/random',
    mypage: '/api/accounts/mypage/',
    password: '/api/accounts/mypage/password/',
    cities: '/api/cities/',
    attraction: '/get-attraction/',
  },
};

export default server;
