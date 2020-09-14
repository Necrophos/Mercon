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
      platform: environment.PLATFORM_ID,
    };
    return this.get(routes, params);
  }

  chatInit = (userId, groupId) => {
    const that = this;
    this.openSocket(userId, groupId).then((connection) => {
      that.connection = connection;
      that.messageListener(connection);
    });
  };

  openSocket(userId, groupId) {
    return new Promise((res, rej) => {
      const that = this;
      let messageReceived;
      const connection = new WebSocket(
        `${environment.WEB_SOCKET_LINK}/${userId}/${environment.APP_ID}/${groupId}`
      );
      connection.onopen = async (event) => {
        const requestPendingMessage = {
          type: "getPendingMessages",
          sender_id: userId,
        };
        const clearBadge = {
          type: "clearBadge",
          sender_id: userId,
        };

        //loading pending msg
        const loadAfter = {
          type: "loadAfter",
          message_id: "6184",
        };

        const loadLatest50 = {
          type: "loadLatest50",
          sender_id: userId,
          group_id: groupId,
          user_id : userId,
          app_id : 38,
          data : "loadLatest50"
       
        }
        console.log("Connection established!");
        // that.connection.send(JSON.stringify(requestPendingMessage));
        // console.log(loadLatest50);

        connection.send(JSON.stringify(loadLatest50));
        connection.send(JSON.stringify(clearBadge));
        res(connection);
      };
    });
  }

  messageListener(connection) {
    connection.onmessage = (event) => {
      this.onComingMessage$.next(event.data);
    };
  }

  sendMessage(userId, groupId, messageToSend) {
    const message = {
      type: "text",
      data: messageToSend, //message is encrypted
      sender_id: userId,
      group_id: groupId,
      check_id: this.generateKey(),
    };
    this.connection.send(JSON.stringify(message));
  }

  sendFile(userId, groupId, fileToSend, fileName) {
    const message = {
      type: "binary",
      data: fileToSend, //message is encrypted
      file_name: fileName,
      sender_id: userId,
      group_id: groupId,
      check_id: this.generateKey(),
    };
    // console.log('oke');

    this.connection.send(JSON.stringify(message));
  }

  loadPrevMsg(oldest_msg_id) {
    const loadBefore = {
      type: "loadBefore",
      message_id: oldest_msg_id,
    };
    // console.log(loadBefore);
    // console.log(this.connection);

    this.connection
      .send(JSON.stringify(loadBefore)); 
  }

  showUserTyping(userId, groupId) {
    const params = {
      type: "typing",
      sender_id: userId,
      group_id: groupId,
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
      return CryptoJS.AES.decrypt(textToDecrypt, key).toString(
        CryptoJS.enc.Utf8
      );
    } catch (error) {
      // console.log(error);
    }
  }

  generateKey() {
    return "XXXXXXXX-XXXX-XXXX-XXXXXXXXXXXX".replace(/X/g, function () {
      return "0123456789MERCON".charAt(Math.floor(Math.random() * 16));
    });
  }
}
