const server = {
  BASE_URL: 'https://j6b103.p.ssafy.io:8000',

  ROUTES: {
    login: '/api/token/',
    signup: '/api/accounts/signup/',
    random: '/api/recommends/random/',
    mypage: '/api/accounts/mypage/',
    password: '/api/accounts/mypage/password/',
    allCities: '/api/cities/',
    attraction: '/get-attraction/',
    writeReview: '/api/reviews/',
    getReview: '/api/reviews/',
    reviewInfo: 'review_info/',
    comment: '/api/reviews/comment/',
    popular: '/api/recommends/popular/',
    review: '/api/reviews/',
  },
};

export default server;
