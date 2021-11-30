import { ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../services/alert.service";
import { AuthenticationService } from "../../../services/authentication.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { MessageService } from "../../../services/message.service";
import { Message } from "../../../models/message";
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "messages-component",
  styleUrls: ["message-list.css"],
  templateUrl: "message-list.html",
})
export class MessageListComponent implements OnInit, OnDestroy {
  private messageSubscription: Subscription = new Subscription();
  private messageListSubscription: Subscription = new Subscription();
  //private receiverSubscription: Subscription = new Subscription();
  public message: Message = new Message();
  //public template: Message = new Message();
  public messages: Array<Message> = new Array<Message>();
  // private authUser: User;
  //public receiver: User = new User();

  constructor(
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getMessage();
    this.getMessages();
  }

  ngAfterContentInit() {}

  ngAfterViewInit() {}

  ngAfterViewChecked() {
    //this.scrollToBottom();
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if (this.messageListSubscription) {
      this.messageListSubscription.unsubscribe();
    }
  }

  /*public getOtherUser(message: Message): User {
    if (message.receiver.id === localStorage.getItem("id")) {
      return message.sender;
    } else {
      return message.receiver;
    }
  }*/

  /* private getReceiver() {
    this.receiverSubscription = this.userService
      .read(this.message.receiver.id)
      .subscribe(
        (receiver: User) => {
          this.receiver = receiver;
        },
        (error: Error) => {
          this.alertService.error(error.message);
        }
      );
  }*/

  private getMessage() {
    this.messageSubscription = this.messageService.getMessage().subscribe(
      (message: Message) => {
        this.message = message;
      },
      (error: Error) => {
        this.alertService.error(error.message);
      },
      () => {
        // this.getReceiver();
      }
    );
  }

  private getMessages() {
    this.messageListSubscription = this.messageService
      .searchByReceiverOrSender()
      .subscribe(
        (messages: Array<Message>) => {
          this.messages = messages;
          console.log(messages);
          console.log(this.message);
          console.log(this.filterConversation());
        },
        (error: Error) => {
          this.alertService.error(error.message);
        }
      );
  }

  public isMyMessage(message: Message) {
    if (message.senderId == localStorage.getItem("id")) {
      return true;
    } else {
      return false;
    }
  }

  public isMyUser(id: string) {
    if (id == localStorage.getItem("id")) {
      return true;
    } else {
      return false;
    }
  }

  public hasMessages(): boolean {
    if (!this.messages) {
      return false;
    } else if (this.messages.length == 0) {
      return false;
    } else if (this.messages.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  public filterConversation(): Array<Message> {
    if (this.messages.length > 0) {
      return this.messages.filter((m: Message) => {
        console.log("filterConversation");
        console.log(m.receiverId);
        console.log(m.senderId);
        console.log(this.message.receiverId);
        console.log(this.message.receiver.id);

        return (
          m.receiverId === this.message.receiverId ||
          m.senderId === this.message.receiverId
        );
      });
    } else {
      return new Array<Message>();
    }
  }

  public onMessageSent(message: Message) {
    this.messages.push(message);
  }
  /*
 private scrollToBottom(): void {
    try {
      var divMessages = <HTMLDivElement>document.getElementById("divMessages");
      divMessages.scrollTop = divMessages.scrollHeight;
      //this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
    } catch (error) {}
  }*/
}
