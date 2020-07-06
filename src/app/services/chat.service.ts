import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {
  connection;

  getGroupChat(userId) {
    let routes = `${environment.chatEndpoint}/getUserGroupsByApp?`;
    const params = {
      user_id: userId,
      app_id: environment.APP_ID
    };
    return this.get(routes, params);
  }

  chatInit(userId, groupId) {
    const that = this;
    let messageReceived;
    this.connection = new WebSocket(`${environment.WEB_SOCKET_LINK}/${userId}/${environment.APP_ID}/${groupId}`);
    this.connection.onopen = function (event) {
      const requestPendingMessage = {
        type: 'getPendingMessages',
        sender_id: userId
      }
      that.connection.send(JSON.stringify(requestPendingMessage));
      console.log("Connection established!");
      that.connection.onmessage = function (event) {
        messageReceived = event.data.data;
      }
    }
    return messageReceived;
  }

  sendMessage (userId, groupId, messageToSend, ) {
    const message = {
      type: "text",
      data: messageToSend, //message is encrypted
      sender_id: userId,
      group_id: groupId,
      check_id: 'dev_test'
    };
    this.connection.send(JSON.stringify(message))
  }

  closeWebsocket() {
    this.connection.close();
  }

  encrypt(key, plaintext) {
   return CryptoJS.AES.encrypt(plaintext, key.trim()).toString();
  }

  decrypted(key, textToDecrypt){
    return CryptoJS.AES.decrypt(textToDecrypt, key.trim()).toString(CryptoJS.enc.Utf8);
  }
}
