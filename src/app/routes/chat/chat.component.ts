import { AlertComponent } from "./../../modals/alert/alert.component";
import { FileService } from "./../../services/file.service";
import { Message } from "./../../models/message.model";
import * as moment from "moment";
import { ShareService } from "@services/share.service";
import { ChatService } from "./../../services/chat.service";
import { Component, OnInit, EventEmitter } from "@angular/core";
import { Subscription, Subject } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { share, takeUntil, skipWhile, filter } from "rxjs/operators";

import { Ng2ImgMaxService } from "ng2-img-max";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
  providers: [FileService],
})
export class ChatComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    private shareService: ShareService,
    private ng2ImgMax: Ng2ImgMaxService,
    private modalService: NgbModal
  ) {}
  listGroup;
  isTyping;
  isFile;
  listMessages = [];
  typingNotify = [];
  groupChat;
  fileTemp = "";
  chatter: EventEmitter<any> = new EventEmitter();
  subVars: Subscription;
  onDestroy$ = new Subject();
  onTyping$ = new Subject();

  messageReceived;
  uploadedImage: Blob;
  fileErr;
  fileName;

  messageForm = new FormGroup({
    messageRaw: new FormControl(""),
    fileRaw: new FormControl(""),
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
            console.log(objMessage);
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
    this.fileName = file.name;

    const typePhoto = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/tiff",
      "image/raw",
    ];

    // if upload is img, so resize the image before update 2097152
    if (typePhoto.includes(file.type)) {
      if (file.size > 2097152) {
        this.ng2ImgMax.compressImage(file, 0.2).subscribe(
          (result) => {
            this.uploadedImage = new File([result], result.name);
            // convert to base64 after compress the file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e: any) => {
              this.fileTemp = e.target.result;
              this.messageForm.patchValue({
                fileRaw: this.fileTemp
              });
              // console.log("file > 2mb", this.fileRaw);
            };
          },
          (error) => {
            console.log(error);
          }
        );
      }

      //convert to base64 immediately if the size of img is valid
      else {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          this.fileTemp = e.target.result;
          this.messageForm.patchValue({
            fileRaw: this.fileTemp
          });
          console.log(this.fileRaw);
        };
      }
    }

    //if upload is file, so check if file is invalid and convert to base64
    if (!typePhoto.includes(file.type)) {
      if (file.size > 20971520) {
        this.sizeAlert();
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          this.fileTemp = e.target.result;
          this.messageForm.patchValue({
            fileRaw: this.fileTemp
          });
          // console.log("valid file", this.fileRaw);
        };
      }
    }
  }

  sendMessage() {
    const userId = this.shareService.getUserId();
    console.log("run");

    if (this.messageRaw != null && this.messageRaw != "") {
      const messageEncrypted = this.chatService.encrypt(
        this.groupChat.password,
        this.messageRaw
      );
      this.chatService.sendMessage(
        userId,
        this.groupChat.groupId,
        messageEncrypted
      );
    }

    if (this.fileRaw != null) {
      console.log("ok");

      const messageEncrypted = this.chatService.encrypt(
        this.groupChat.password,
        this.fileRaw
      );

      this.chatService.sendFile(
        userId,
        this.groupChat.groupId,
        messageEncrypted,
        this.fileName
      );
      this.fileTemp = "";
    }
    this.clearMsg();
  }

  showTyping(event: KeyboardEvent) {
    if (event.key == "Enter") return;
    const userId = this.shareService.getUserId();
    this.chatService.showUserTyping(userId, this.groupChat.groupId);
  }

  createObjMes(rawObj) {
    const type = [
      '.png',
      '.jpg',
      'jpeg',
      'gif'
    ]
    let obj = new Message();
    if (rawObj.type == "text") {
      obj.type = rawObj.type;
      obj.content = this.chatService.decrypted(
        this.groupChat.password,
        rawObj.data
      );
    }

        //check obj response is img or file
    if (rawObj.type == "binary") {
      let check = rawObj.data.substring(rawObj.data.length - 4, rawObj.data.length);
      console.log('check:',check);
      
      type.includes(check) ? obj.type = 'image' : obj.type = 'file';
      console.log(obj.type);
      obj.fileName = rawObj.file_name;
      obj.content = rawObj.data;
    }
   
    
    obj.timestamp = moment(rawObj.message_date).format("YYYY[-]MM[-]DD");
    rawObj.sender_id == this.groupChat.userId
      ? (obj.own = true)
      : (obj.own = false);
    //decrypt msg here
    return obj;
  }

  pushMesToList = async (rawObj, userId) => {
    if (rawObj.type == "text" || rawObj.type == "binary") {
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

  sizeAlert() {
    const modalRef = this.modalService.open(AlertComponent, { centered: true });
    modalRef.componentInstance.msg =
      "The file you have selected is too large. The maximum size is 20MB";
  }

  removeImg() {
    this.fileTemp = "";
    this.messageForm.reset();
  }
}
