import React from 'react';

// import messaging from '@react-native-firebase/messaging';

// const FcmToken = async () => await messaging().getToken();

import utils from '../utils';
async function getAccount() {
  return await utils.get('account');
}
async function setAccount(data) {
  return await utils.set('account', data);
}

async function getFirst() {
  return await utils.get('first');
}
async function setFirst(data) {
  return await utils.set('first', data);
}


async function getSwitchHistory() {
  return await utils.get('swhistory');
}
async function setSwitchHistory(data) {
  return await utils.set('swhistory', data);
}

async function getSensorHistory() {
  return await utils.get('senhistory');
}
async function setSensorHistory(data) {
  return await utils.set('senhistory', data);
}
async function getDevicesHistory() {
  return await utils.get('devhistory');
}
async function setDevicesHistory(data) {
  return await utils.set('devhistory', data);
}


async function logout() {
  return await utils.set('account', null);
}


export default {
  logout,
  setAccount,
  getAccount,
  getFirst,
  setFirst,
  //   FcmToken,
  setSensorHistory,
  setDevicesHistory,
  setSwitchHistory,
  getDevicesHistory,getSensorHistory,
  getSwitchHistory
};
