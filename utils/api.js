// const HOST_URI = 'http://192.168.1.20:8888';
// const HOST_URI = 'http://hello.shenzhuo.vip:10468';
const HOST_URI = 'https://wshop.utools.club';


const GOOD_DETAIL = '/good/goodDetail';
const GOOD_LIST = '/good/goodList';
const SEARCH = '/good/search';
const GET_GOOD_COMMENT = '/good/get_good_comment';


const WX_LOGIN = '/user/wechatLogin';
const LOGIN = '/user/login';
const REGISTER = '/user/register';
const ADD_ADDRESS = '/user/add_address';
const FIND_ADDRESS = '/user/find_address';
const GET_ADDRESS_LIST = '/user/get_address_list';
const DELETE_ADDRESS = '/user/delete_address';
const SET_DEFAULT_ADDRESS = '/user/set_default_address';
const SUBMIT_ORDER = '/user/submit_order';
const CHECK_USER_ACCOUNT = '/user/check_user_account';
const PAY_FOR_ORDER = '/user/pay_for_order';
const GET_ORDER_LIST = '/user/get_order_list';
const GET_ORDER_DETAIL = '/user/get_order_detail';
const DELIVERY = '/user/delivery';
const CANCEL_ORDER = '/user/cancel_order';
const CONFIRM_RECEIVING = '/user/confirm_receiving';
const ORDER_EVALUATE = '/user/order_evaluate';
const COLLECT_GOOD = '/user/collect_good';
const GET_COLLECTION_LIST = '/user/get_collection_list';
const CANCEL_COLLECT = '/user/cancel_collect';
const SAVE_HISTORY_SEARCH = '/user/save_history_search';
const DELETE_HISTORY = '/user/delete_history';
const RECHARGE = '/user/recharge';
const CHECK_USER_NAME = '/user/check_user_name';


const GET_HISTORY = '/user/get_history';

function getGoodDetail(goodId) {
  return `${HOST_URI}${GOOD_DETAIL}?goodId=${goodId}`;
}

function getGoodList(type) {
  return `${HOST_URI}${GOOD_LIST}?type=${type}`;
}
function search(value) {
  return `${HOST_URI}${SEARCH}?value=${value}`;
}
function getGoodComment(goodId) {
  return `${HOST_URI}${GET_GOOD_COMMENT}?goodId=${goodId}`;
}


function wxLogin() {
  return `${HOST_URI}${WX_LOGIN}`;
}
function Login() {
  return `${HOST_URI}${LOGIN}`;
}
function register() {
  return `${HOST_URI}${REGISTER}`;
}
function addAddress() {
  return `${HOST_URI}${ADD_ADDRESS}`;
}
function findAddress(id) {
  return `${HOST_URI}${FIND_ADDRESS}?id=${id}`;
}
function getAddressList() {
  return `${HOST_URI}${GET_ADDRESS_LIST}`;
}
function deleteAddress(id) {
  return `${HOST_URI}${DELETE_ADDRESS}?id=${id}`;
}
function setDefaultAddress(id) {
  return `${HOST_URI}${SET_DEFAULT_ADDRESS}?id=${id}`;
}
function checkUserAccount() {
  return `${HOST_URI}${CHECK_USER_ACCOUNT}`;
}
function payForOrder() {
  return `${HOST_URI}${PAY_FOR_ORDER}`;
}
function getOrderList() {
  return `${HOST_URI}${GET_ORDER_LIST}`;
}
function getOrderDetail(orderId) {
  return `${HOST_URI}${GET_ORDER_DETAIL}?orderId=${orderId}`;
}
function delivery() {
  return `${HOST_URI}${DELIVERY}`;
}
function cancelOrder() {
  return `${HOST_URI}${CANCEL_ORDER}`;
}
function confirmReceiving() {
  return `${HOST_URI}${CONFIRM_RECEIVING}`;
}
function orderEvaluate() {
  return `${HOST_URI}${ORDER_EVALUATE}`;
}
function collectGood() {
  return `${HOST_URI}${COLLECT_GOOD}`;
}
function getCollectionList() {
  return `${HOST_URI}${GET_COLLECTION_LIST}`;
}
function cancelCollect() {
  return `${HOST_URI}${CANCEL_COLLECT}`;
}
function getHistory() {
  return `${HOST_URI}${GET_HISTORY}`;
}
function saveHistorySearch() {
  return `${HOST_URI}${SAVE_HISTORY_SEARCH}`;
}
function deleteHistory() {
  return `${HOST_URI}${DELETE_HISTORY}`;
}
function recharge() {
  return `${HOST_URI}${RECHARGE}`;
}
function checkUserName() {
  return `${HOST_URI}${CHECK_USER_NAME}`;
}


function submitOrder() {
  return `${HOST_URI}${SUBMIT_ORDER}`;
}

module.exports.Login = Login;
module.exports.register = register;
module.exports.wxLogin = wxLogin;
module.exports.addAddress = addAddress;
module.exports.findAddress = findAddress;
module.exports.getAddressList = getAddressList;
module.exports.deleteAddress = deleteAddress;
module.exports.setDefaultAddress = setDefaultAddress;
module.exports.checkUserAccount = checkUserAccount;
module.exports.payForOrder = payForOrder;
module.exports.getOrderList = getOrderList;
module.exports.getOrderDetail = getOrderDetail;
module.exports.delivery = delivery;
module.exports.cancelOrder = cancelOrder;
module.exports.confirmReceiving = confirmReceiving;
module.exports.orderEvaluate = orderEvaluate;
module.exports.collectGood = collectGood;
module.exports.getCollectionList = getCollectionList;
module.exports.cancelCollect = cancelCollect;
module.exports.getHistory = getHistory;
module.exports.search = search;
module.exports.saveHistorySearch = saveHistorySearch;
module.exports.deleteHistory = deleteHistory;
module.exports.getGoodComment = getGoodComment;
module.exports.recharge = recharge;
module.exports.checkUserName = checkUserName;

module.exports.getGoodDetail = getGoodDetail;
module.exports.getGoodList = getGoodList;
module.exports.submitOrder = submitOrder;