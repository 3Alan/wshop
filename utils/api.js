const HOST_URI = 'http://192.168.1.20:8888';


const GOOD_DETAIL = '/good/goodDetail';
const GOOD_LIST = '/good/goodList';


const WX_LOGIN = '/user/wechatLogin';
const LOGIN = '/user/login';
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
const CONFIRM_RECEIVING = '/user/confirm_receiving';
const ORDER_EVALUATE = '/user/order_evaluate';

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
function confirmReceiving() {
  return `${HOST_URI}${CONFIRM_RECEIVING}`;
}
function orderEvaluate() {
  return `${HOST_URI}${ORDER_EVALUATE}`;
}


function submitOrder() {
  return `${HOST_URI}${SUBMIT_ORDER}`;
}

module.exports.Login = Login;
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
module.exports.confirmReceiving = confirmReceiving;
module.exports.orderEvaluate = orderEvaluate;

module.exports.getGoodDetail = getGoodDetail;
module.exports.getGoodList = getGoodList;
module.exports.submitOrder = submitOrder;