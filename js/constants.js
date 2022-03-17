const SAVE_QUIZ_ID      = 1;
const SAVE_TOKEN        = 2;
const SAVE_USER_ID      = 3;
const UPDATE_QUIZ       = 4;
const GRADE_BOOKS       = 5;

const POST_METHOD       = 'POST';
const GET_METHOD        = 'GET';
const JSON_TYPE         = 'JSON';

const BASE_URL          = 'https://api.edmodo.com';
const CLOUD_URL         = 'https://edmodo.cloud/api';
const AUTO_DO_URL       =  CLOUD_URL + '/quiz/take';
const UPDATE_URL        =  CLOUD_URL + '/quiz/update';
const CHECK_LICENSE_URL =  CLOUD_URL + '/license/check';
const GRADES_URL        =  BASE_URL  + '/grades/quiz:{param}?request_origin=react-web-app'
const GRADE_BOOKS_URL   =  BASE_URL  + '/gradebooks/exams'
