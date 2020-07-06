import { environment } from "@env/environment";
import { ShareService } from "@services/share.service";
import { ChatService } from "./../../services/chat.service";
import { Component, OnInit, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { stringify } from 'querystring';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    private shareService: ShareService
  ) {}
  listGroup;
  groupChat;
  chatter: EventEmitter<any> = new EventEmitter();
  subVars: Subscription;

  connection;
  messageReceived;

  messageForm = new FormGroup({
    messageToSend: new FormControl("", [Validators.required]),
  });

  get messageToSend() {
    return this.messageForm.value.messageToSend;
  }

  ngOnInit() {
    const userId = this.shareService.getUserId();
    this.getGroupChat(userId);

    setTimeout(() => {
      this.chatInit(userId, this.groupChat.groupId);
    }, 3000);

    this.subVars = this.chatter.subscribe((res) => {
      if (res) {
        this.groupChat = res;
        this.connection.close();
        this.chatInit(userId, this.groupChat.groupId);
      }
    });
  }

  ngOnDestroy() {
    if (this.subVars) {
      this.subVars.unsubscribe();
    }
  }

  chatInit(userId, groupId) {
    const that = this;
    this.connection = new WebSocket(
      `${environment.WEB_SOCKET_LINK}/${userId}/38/${groupId}`
    );
    this.connection.onopen = function (event) {
      const pendingParams = {
        type: 'getPendingMessages',
        sender_id: userId
      }
      that.connection.send(JSON.stringify(pendingParams)) 
      
      console.log("Connection established!");
      const those = that;
      that.connection.onmessage = function (e) {
        console.log(e);
        
        // const data = JSON.parse(e.data)
        // let message = those.chatService.decrypted(those.groupChat.password, data.data, )
        // console.log(message);
      };
    };
  }

  sendMessage = (groupContent) => {
    const userId = this.shareService.getUserId();
    let encryptMessage = this.chatService.encrypt(groupContent.password, this.messageToSend);
    const message = {
      type: "text",
      data: encryptMessage,
      sender_id: userId,
      group_id: groupContent.groupId,
      check_id: "123",
    };
    console.log(message);
    this.connection.send(JSON.stringify(message));
  };

  encryptMessage(key, message) {
    return this.chatService.encrypt(key, message);
  }

  decryptMessage(key, message) {
    return this.chatService.decrypted(key, message);
  }

  setClient(client) {
    this.chatter.emit(client);
  }

  changeGroup(groupItem) {
    this.setClient(groupItem);
  }

  getGroupChat(userId) {
    this.chatService.getGroupChat(userId).subscribe((res) => {
      this.listGroup = res;
      this.groupChat = res[0];
    });
  }
}
