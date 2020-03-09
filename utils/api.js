const HOST_URI = 'http://192.168.1.20:8888';


const GOOD_DETAIL = '/good/goodDetail';
const GOOD_LIST = '/good/goodList';


const WX_LOGIN = '/user/wechatLogin';
const LOGIN = '/user/login';

function getGoodDetail(goodId) {
  return `${HOST_URI}${GOOD_DETAIL}?goodId=${goodId}`;
}

function getGoodList(type) {
  return `${HOST_URI}${GOOD_LIST}?type=${type}`;
}


function wxLogin() {
  return `${HOST_URI}${WX_LOGIN}`;
}
function Login() {
  return `${HOST_URI}${LOGIN}`;
}

module.exports.Login = Login;
module.exports.wxLogin = wxLogin;

module.exports.getGoodDetail = getGoodDetail;
module.exports.getGoodList = getGoodList;