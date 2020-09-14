import { element } from "protractor";
import { AlertComponent } from "./../../modals/alert/alert.component";
import { FileService } from "./../../services/file.service";
import { Message } from "./../../models/message.model";
import * as moment from "moment";
import { ShareService } from "@services/share.service";
import { ChatService } from "./../../services/chat.service";
import * as _ from "lodash";
import {
  Component,
  OnInit,
  EventEmitter,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from "@angular/core";
import { Subscription, Subject, fromEvent } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  share,
  takeUntil,
  skipWhile,
  filter,
  debounceTime,
} from "rxjs/operators";

import { Ng2ImgMaxService } from "ng2-img-max";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { isArray } from "util";
import { IColor } from "app/models/color.model";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
  providers: [FileService],
})
export class ChatComponent implements OnInit {
  // * Auto scroll bottom when have a new msg
  @ViewChild("scrollFrame", { static: false }) scrollFrame: ElementRef;
  @ViewChildren("item") itemElements: QueryList<any>;
  private scrollContainer: Element;
  resetLength = false;
  listMsgLength: number;
  // * Auto scroll bottom when have a new msg

  constructor(
    private chatService: ChatService,
    private shareService: ShareService,
    private ng2ImgMax: Ng2ImgMaxService,
    private modalService: NgbModal
  ) {}
  listGroup;
  isTyping;
  isFile;
  isImg;
  scrollBot: boolean;
  listMessages: Message[] = [];
  listMsgDisplay: Message[] = [];

  listUser = [];
  typingNotify = [];
  groupChat;
  fileTemp = ""; // preview img before send var
  chatter: EventEmitter<any> = new EventEmitter();
  badge: EventEmitter<any> = new EventEmitter();
  subVars: Subscription;
  subVarsToClearBadge: Subscription;
  onDestroy$ = new Subject();
  onTyping$ = new Subject();

  messageReceived;
  mileStone = 0;
  uploadedImage: Blob;
  fileErr;
  fileName;
  fileType;
  whoTyping = null;
  prevScroll = 0;
  prevId = null;
  colorMap = new Map<any, string>();

  messageForm = new FormGroup({
    messageRaw: new FormControl(null),
    fileRaw: new FormControl(null),
  });

  get messageRaw() {
    return this.messageForm.value.messageRaw;
  }

  get fileRaw() {
    return this.messageForm.value.fileRaw;
  }

  ngOnInit() {
    this.scrollBot = true;
    const userId = this.shareService.getUserId();
    this.getGroupChat(userId).subscribe(async () => {
      this.messageReceived = await this.chatService.chatInit(
        userId,
        this.groupChat.groupId
      );
      this.chatService.onComingMessage$
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(
          async (message: any) => {
            // console.log(message);
            // all msg received will be returned here
            if (message != "") {
              const objMessage = JSON.parse(message);
              //get 50 lasted msg to display
              // console.log(objMessage);

              if (isArray(objMessage)) {
                await objMessage.map((obj) => this.pushMesToList(obj, userId));
              }

              this.pushMesToList(objMessage, userId);
            }

            //function typing
            const sharedTyping = this.onTyping$.pipe(
              filter((isOwn: boolean) => !isOwn),
              share()
            );
            sharedTyping.subscribe(() => {
              this.isTyping = true;
            });
            sharedTyping.pipe(debounceTime(3000)).subscribe(() => {
              this.isTyping = false;
            });
          },
          (error) => alert(error)
        );
    });

    this.subVars = this.chatter.subscribe((res) => {
      this.chatService.closeWebsocket();
      if (res) {
        this.groupChat = res;
        this.scrollBot = true;
        this.listMessages = [];
        this.chatService.chatInit(userId, this.groupChat.groupId);
      }
    });

    this.subVarsToClearBadge = this.badge.subscribe((res) => {
      if (res) {
        this.groupChat.badge = res;
      }
    });
  }

  // * Auto scroll bottom when have a new msg
  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.getMoreMsgOnTop();
    this.itemElements.changes.subscribe((_) => this.onItemElementsChanged());
  }

  private onItemElementsChanged(): void {
    this.scrollBot ? this.scrollToBottom() : this.scrollToMiddle();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
    });
  }

  private scrollToMiddle() {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight / 2,
      left: 0,
    });
  }

  // * Get more msg when scroll to top of chat box

  private getMoreMsgOnTop(): void {
    const that = this;
    this.scrollContainer.addEventListener("scroll", () => {
      const currentScroll = this.scrollContainer.scrollTop;
      if (currentScroll == 0 && this.listMessages.length != 0) {
        that.chatService.loadPrevMsg(this.listMessages[0].messageId);
        this.resetLength = true;
        this.scrollBot = false;
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
    this.fileType = file.type;

    const typePhoto = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/tiff",
      "image/raw",
    ];

    //example of resize img use ng2-img-max
    // if upload is img, so resize the image before update 2097152
    if (typePhoto.includes(file.type)) {
      this.isImg = true;
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
                fileRaw: this.fileTemp.substring(this.fileTemp.indexOf(',') + 1, this.fileRaw.length),
                // this.imageFile.substring(this.imageFile.indexOf(',') + 1, this.imageFile.length)
              });
              console.log("file > 2mb", this.fileRaw);
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
            fileRaw: this.fileTemp.substring(this.fileTemp.indexOf(',') + 1, this.fileTemp.length),
          });
          console.log(this.fileRaw);
        };
      }
    }

    //if upload is file, so check if file is invalid and convert to base64
    if (!typePhoto.includes(file.type)) {
      this.isFile = true;
      if (file.size > 20971520) {
        this.sizeAlert();
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(file); // preview img
        reader.onload = (e: any) => {
          this.fileTemp = e.target.result;
          this.messageForm.patchValue({
            fileRaw: this.fileTemp.substring(this.fileTemp.indexOf(',') + 1, this.fileTemp.length),
          });
          // console.log("valid file", this.fileRaw);
        };
      }
    }
  }

  sendMessage() {
    const userId = this.shareService.getUserId();

    if (this.messageRaw != null && this.messageRaw != "") {
      // console.log("msg send run");
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
      // console.log("file send run");

      const messageEncrypted = this.chatService.encrypt(
        this.groupChat.password,
        this.fileRaw
      );

      // console.log(messageEncrypted);
      // console.log( this.fileRaw);

      this.chatService.sendFile(
        userId,
        this.groupChat.groupId,
        this.fileRaw,
        this.fileName
      );
      this.fileTemp = "";
      this.isFile = false;
      this.isImg = false;
    }
    this.scrollBot = true;
    this.clearMsg();
  }

  showTyping(event: KeyboardEvent) {
    if (event.key == "Enter") return;
    const userId = this.shareService.getUserId();
    this.chatService.showUserTyping(userId, this.groupChat.groupId);
  }

  randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  createObjMes(rawObj) {
    const type = [".png", ".jpg", "jpeg", ".gif"];
    let obj = new Message();
    // console.log(rawObj);
    if (!this.colorMap.has(rawObj.sender_id)) {
      this.colorMap.set(rawObj.sender_id, this.randomColor());
    }

    if (rawObj.type == "text") {
      obj.sender_name = rawObj.sender_name;
      obj.type = rawObj.type;
      obj.sender_id = rawObj.sender_id;
      obj.content = this.chatService.decrypted(
        this.groupChat.password,
        rawObj.data
      );
      obj.messageId = rawObj.message_id;
    }

    //check obj response is img or file
    if (rawObj.type == "binary") {
      let check = rawObj.data.substring(
        rawObj.data.length - 4,
        rawObj.data.length
      );
      // console.log('check:',check);
      type.includes(check) ? (obj.type = "image") : (obj.type = "file");
      // console.log(obj.type);
      obj.sender_name = rawObj.sender_name;
      obj.sender_id = rawObj.sender_id;
      obj.fileName = rawObj.file_name;
      obj.content = rawObj.data;
      obj.messageId = rawObj.message_id;
    }

    obj.timestamp = moment(rawObj.message_date).format(
      "DD[/]MM[/]YYYY hh:mm A"
    );

    if (rawObj.sender_id == this.groupChat.userId) {
      obj.own = true;
      obj.is_display = true;
    } else {
      obj.own = false;
      obj.is_display = null;
    }
    return obj;
  }

  pushMesToList = async (rawObj, userId) => {
    if (rawObj.type == "text" || rawObj.type == "binary") {
      let obj = await this.createObjMes(rawObj);
      obj.own == false ? (this.isTyping = false) : "";

      if (rawObj.message_id < this.mileStone) {
        this.listMessages.unshift(obj);

        if (this.resetLength) {
          this.listMsgLength = 1;
        }

        if (!this.resetLength) {
          // console.log('run');
          
          this.listMsgLength = (await this.listMessages.length) - 1;
        }
        if (this.listMsgLength > 0) {
          // console.log(this.listMsgLength);
          if (
            this.listMessages[this.listMsgLength].sender_id !==
            this.listMessages[this.listMsgLength - 1].sender_id
          ) {
            this.listMessages[this.listMsgLength].own == false
              ? (this.listMessages[this.listMsgLength].is_display = false)
              : null;
          }
        }

        this.mileStone = rawObj.message_id;
      }
      if (rawObj.message_id > this.mileStone) {
        this.listMessages.push(obj);

        this.mileStone = rawObj.message_id;
      }
      // console.log(this.mileStone);
    }
    if (rawObj.type == "typing") {
      let obj = await this.createObjMes(rawObj);
      this.whoTyping = rawObj.data;
      this.onTyping$.next(obj.own);
      // console.log(obj);
    }
    if (rawObj.type == "clearBadge") {
      this.clearBadge(0);
    }
  };

  //example use even emit
  setClient(client) {
    this.chatter.emit(client);
  }

  setBadge(value) {
    this.badge.emit(value);
  }

  changeGroup(groupItem) {
    this.setClient(groupItem);
  }

  clearBadge(emptyValue) {
    this.setBadge(emptyValue);
  }
  //example use even emit

  getGroupChat(userId) {
    const call = this.chatService.getGroupChat(userId).pipe(share());
    call.subscribe((res) => {
      this.listGroup = res;
      // console.log(this.listGroup);

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

  removeFile() {
    this.fileTemp = "";
    this.isFile = false;
    this.isImg = false;
    this.messageForm.reset();
  }
}
