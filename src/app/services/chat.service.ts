import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import * as CryptoJS from "crypto-js";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChatService extends BaseService {
  connection;

  onComingMessage$ = new Subject();
  getGroupChat(userId) {
    let routes = `${environment.chatEndpoint}/getUserGroupsByApp?`;
    const params = {
      user_id: userId,
      app_id: environment.APP_ID,
    };
    return this.get(routes, params);
  }

  chatInit = (userId, groupId) => {
    new Promise((res, rej) => {
      const that = this;
      let messageReceived;
      this.connection = new WebSocket(
        `${environment.WEB_SOCKET_LINK}/${userId}/${environment.APP_ID}/${groupId}`
      );
      this.connection.onopen = async (event) => {
        const requestPendingMessage = {
          type: "getPendingMessages",
          sender_id: userId,
        };
        const clearBadge = {
          type: "clearBadge",
          sender_id: userId,
        };
        console.log("Connection established!");
        // that.connection.send(JSON.stringify(requestPendingMessage));
        that.connection.send(JSON.stringify(clearBadge)); 
      };

      that.connection.onmessage = (event) => {
        messageReceived = event.data;
        res();
        this.onComingMessage$.next(messageReceived);
      };
    });
  };

  sendMessage(userId, groupId, messageToSend) {
    const message = {
      type: "text",
      data: messageToSend, //message is encrypted
      sender_id: userId,
      group_id: groupId,
      check_id: "dev_test",
    };
    this.connection.send(JSON.stringify(message));
  }

  showUserTyping(userId, groupId) {
    const params = {
      type: "typing",
      sender_id: userId,
      group_id: groupId
    };
    this.connection.send(JSON.stringify(params));
  }

  closeWebsocket() {
    this.connection.close();
  }

  encrypt(key, plaintext) {
    return CryptoJS.AES.encrypt(plaintext, key.trim()).toString();
  }

  decrypted(key, textToDecrypt) {
    try {
      return CryptoJS.AES.decrypt(textToDecrypt, key).toString(CryptoJS.enc.Utf8)
    } catch (error) {
      console.log(error);
    }
  }
}
