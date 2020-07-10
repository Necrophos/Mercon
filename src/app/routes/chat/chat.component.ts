import { FileService } from './../../services/file.service';
import { Message } from "./../../models/message.model";
import * as moment from "moment";
import { ShareService } from "@services/share.service";
import { ChatService } from "./../../services/chat.service";
import { Component, OnInit, EventEmitter } from "@angular/core";
import { Subscription, Subject } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { share, takeUntil, skipWhile, filter } from "rxjs/operators";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    private shareService: ShareService,
    private fileService: FileService
  ) {}
  listGroup;
  isTyping;
  listMessages = [];
  typingNotify = [];
  groupChat;
  imgTemp = '';
  chatter: EventEmitter<any> = new EventEmitter();
  subVars: Subscription;
  onDestroy$ = new Subject();
  onTyping$ = new Subject();

  messageReceived;

  messageForm = new FormGroup({
    messageRaw: new FormControl(''),
    fileRaw: new FormControl(''),
  });

  get messageRaw() {
    return this.messageForm.value.messageRaw;
  }

  get fileRaw() {
    return this.messageForm.value.fileRaw;
  }

  ngOnInit() {
    const userId = this.shareService.getUserId();
    this.getGroupChat(userId).subscribe(async () => {
      this.messageReceived = await this.chatService.chatInit(
        userId,
        this.groupChat.groupId
      );
      this.chatService.onComingMessage$
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(
          (message: any) => {
            const objMessage = JSON.parse(message);
            // console.log(objMessage);
            this.pushMesToList(objMessage, userId);

            //function typing
            this.onTyping$
              .pipe(filter((isOwn: boolean) => !isOwn))
              .subscribe(() => {
                this.isTyping = true;
              });
          },
          (error) => alert(error)
        );
    });

    this.subVars = this.chatter.subscribe((res) => {
      this.chatService.closeWebsocket();
      if (res) {
        this.groupChat = res;
        this.listMessages = [];
        this.chatService.chatInit(userId, this.groupChat.groupId);
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    if (this.subVars) {
      this.subVars.unsubscribe();
    }
  }


  readFile(fileEvent: any) {
    const file = fileEvent.target.files[0];

// convert file to base64
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.imgTemp = e.target.result;
      this.messageForm.patchValue({
        fileRaw: this.imgTemp.substring(this.imgTemp.indexOf(',') + 1, this.imgTemp.length)
      })
      console.log(this.fileRaw);
    };
    
    // this.fileService.resizeFile(file)
 }

  sendMessage() {
    if (this.messageRaw == "") return;
    
    const messageEncrypted = this.chatService.encrypt(
      this.groupChat.password,
      this.messageRaw
    );
    const userId = this.shareService.getUserId();
    this.chatService.sendMessage(
      userId,
      this.groupChat.groupId,
      messageEncrypted
    );
    this.clearMsg();
  }

  showTyping(event: KeyboardEvent) {
    if (event.key == "Enter") return;
    const userId = this.shareService.getUserId();
    this.chatService.showUserTyping(userId, this.groupChat.groupId);
  }

  createObjMes(rawObj) {
    let obj = new Message();
    obj.type = rawObj.type;
    obj.content = this.chatService.decrypted(this.groupChat.password, rawObj.data);
    obj.timestamp = moment(rawObj.message_date).format("YYYY[-]MM[-]DD");
    rawObj.sender_id == this.groupChat.userId
      ? (obj.own = true)
      : (obj.own = false);
    //decrypt msg here
    return obj;
  }

  pushMesToList = async (rawObj, userId) => {
    if (rawObj.type == "text") {
      let obj = await this.createObjMes(rawObj);
      obj.own == false ? (this.isTyping = false) : "";
      this.listMessages.push(obj);
      console.log(this.listMessages);
    }
    if (rawObj.type == "typing") {
      let obj = await this.createObjMes(rawObj);
      this.onTyping$.next(obj.own);
      console.log(obj);
    }
  };

  setClient(client) {
    this.chatter.emit(client);
  }

  changeGroup(groupItem) {
    this.setClient(groupItem);
  }

  getGroupChat(userId) {
    const call = this.chatService.getGroupChat(userId).pipe(share());
    call.subscribe((res) => {
      this.listGroup = res;
      this.groupChat = res[0];
    });
    return call;
  }

  clearMsg() {
    this.messageForm.reset();
  }
}
