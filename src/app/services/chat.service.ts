import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {

  getGroupChat(userId) {
    let routes = `${environment.chatEndpoint}/getUserGroupsByApp?`;
    const params = {
      user_id: userId,
      app_id: environment.APP_ID
    };
    return this.get(routes, params);
  }

  encrypt(key, plaintext) {
   return CryptoJS.AES.encrypt(plaintext, key.trim()).toString();
  }

  decrypted(key, textToDecrypt){
    return CryptoJS.AES.decrypt(textToDecrypt, key.trim()).toString(CryptoJS.enc.Utf8);
  }
}
