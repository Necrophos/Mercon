import { environment } from "@env/environment";
import { ShareService } from "@services/share.service";
import { ChatService } from "./../../services/chat.service";
import { Component, OnInit, EventEmitter } from "@angular/core";
import { Subscription, Subject } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { share, takeUntil } from "rxjs/operators";

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
  onDestroy$ = new Subject();
  messageReceived;
  messageToDisplay;

  messageForm = new FormGroup({
    messageRaw: new FormControl("", [Validators.required]),
  });

  get messageRaw() {
    return this.messageForm.value.messageRaw;
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
        .subscribe((message: any) => {
          const objMessage = JSON.parse(message);
          // this.messageToDisplay = this.messageDecrypted(objMessage.data);
          // console.log(this.messageToDisplay);
          console.log(objMessage);
          // console.log(objMessage.data);
          
          
        });
    });

    this.subVars = this.chatter.subscribe((res) => {
      this.chatService.closeWebsocket();
      if (res) {
        this.groupChat = res;
     console.log(this.messageDecrypted('mfvU6rwobFAjh+Jz866oVg=='))
         
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

  sendMessage() {
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
  }

  messageDecrypted(message) {
    return this.chatService.decrypted(
      this.groupChat.password,
      message
    );
  }

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
}
