const server = {
  BASE_URL: 'http://127.0.0.1:8000',

  ROUTES: {
    login: '/api/token/',
    signup: '/api/accounts/signup/',
    random: '/api/recommends/random/',
    mypage: '/api/accounts/mypage/',
    password: '/api/accounts/mypage/password/',
    allCities: '/api/cities/',
    attraction: '/get-attraction/',
    popular: '/api/recommends/popular/',
    review: '/api/reviews/',
  },
};

export default server;
