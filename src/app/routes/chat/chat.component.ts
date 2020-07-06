import { environment } from "@env/environment";
import { ShareService } from "@services/share.service";
import { ChatService } from "./../../services/chat.service";
import { Component, OnInit, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

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
  chatContent;
  chatter: EventEmitter<any> = new EventEmitter();
  groupItem;
  subVars: Subscription;

  connection;
  messageReceived;

  test = "abc xyz";
  key = 'abc'


  ngOnInit() {
    const userId = this.shareService.getUserId();
    this.getGroupChat(userId);
    this.chatInit(userId,27);
    this.subVars = this.chatter.subscribe((res) => {
      if (res) {
        this.chatContent = res;
        this.chatInit( userId,this.chatContent.groupId);
       
      }
    });
    setTimeout(() => {
    }, 3000);
  }

  ngOnDestroy() {
    if (this.subVars) {
      this.subVars.unsubscribe();
    }
  }

  chatInit(userId, groupId) {
    const that = this;
    this.connection = new WebSocket(
      `${environment.WEB_SOCKET_LINK}/${userId}/${groupId}`
    );
    this.connection.onopen = function (event) {
      console.log("Connection established!");   
      that.connection.onmessage = function (e) {
        console.log(e);
      }
      that.sendMessage(that.test, groupId, that.key);
    };
  };

  sendMessage = (data, groupId, key) => {
    const userId = this.shareService.getUserId();
    let encryptMessage = this.chatService.encrypt(key, data);
    const message = {
      type: "text",
      data: encryptMessage,
      sender_id: userId,
      group_id: groupId,
      check_id: "jfhnusdhfngkhj",
    };
    console.log(message);
    this.connection.send(message);
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
      this.chatContent = res[0];
    });
  }
}
