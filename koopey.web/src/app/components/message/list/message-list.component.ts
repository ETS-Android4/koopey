//Core
import {
    Component,
    Input,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable, Subscription } from "rxjs/Rx";
//Services
import { AlertService } from "../../../services/alert.service";
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";
import { MessageService } from "../../../services/message.service";
import { TranslateService } from "ng2-translate";
//Objects
import { Message } from "../../../models/message";
import { User } from "../../../models/user";
import { Config } from "../../../config/settings";

@Component({
    selector: "messages-component",
    templateUrl: "../../views/message-list.html"
})

export class MessageListComponent implements OnInit, OnDestroy {

    @ViewChild("messageElement") messageElement: ElementRef;
    @ViewChild('messageList') private messageList: ElementRef;

    //Strings
    private LOG_HEADER: string = "MessageListComponent"
    private messageSubscription: Subscription;
    private text: string = '';
    private compressedWidth = 128;
    private compressedHeight = 128;
    private message: Message =  new Message();
    private template: Message =  new Message();
    private messages: Array<Message>;
    // private authUser: User;
    // private users: Array<User>;

    constructor(
        private alertService: AlertService,
        private authenticateService: AuthService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private translateService: TranslateService,
        private userService: UserService
    ) { }

    ngOnInit() {
        //Message from ConverstaionList via MessageService
        this.messageService.getMessage().subscribe(
            (message) => { this.template = message; },
            (error) => { this.alertService.error(<any>error) },
            () => { if (!Config.system_production) { console.log(this.messages) } }
        );
        //Messages
        this.messageService.readMessages().subscribe(
            (messages) => { this.messages = messages; },
            (error) => { this.alertService.error(<any>error) },
            () => { if (!Config.system_production) { console.log(this.messages) } }
        );
    }

    ngAfterContentInit() {
        //Set sender    
        for (var i = 0; i < this.template.users.length; i++) {
            if (this.template.users[i].id == localStorage.getItem("id")) {
                this.template.users[i].avatar = this.shrinkImage(localStorage.getItem("avatar"), 64, 64);
                this.template.users[i].type = "sender";
            }
        }
        //Set receivers       
        for (var i = 0; i < this.template.users.length; i++) {
            if (this.template.users[i].id != localStorage.getItem("id")) {
                this.template.users[i].type = "receiver";
            }
        }
    }

    ngAfterViewInit() { }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    ngOnDestroy() {
        /*  if (this.authSubscription) {
              this.authSubscription.unsubscribe();
          }*/
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        /* if (this.userSubscription) {
             this.userSubscription.unsubscribe();
         }*/
    }

    private isMyUser(id: string) {
        if (id == localStorage.getItem("id")) {
            return true;
        } else {
            return false;
        }
    }

    private isMyMessage(message: Message) {
        if (User.readSender(message.users).id == localStorage.getItem("id")) {
            return true;
        } else {
            return false;
        }
    }

    private hasMessages(): boolean {
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

    private getSenderAvatar(message: Message): string {
        return User.readSender(message.users).avatar;
    }

    private filterConversationMessages(messages: Array<Message>): Array<Message> {
        if (this.messages) {
            var conversationMessages: Array<Message> = new Array<Message>();
            for (var i = 0; i < this.messages.length; i++) {
                if (User.equalsArray(this.messages[i].users, this.template.users)) {
                    conversationMessages.push(this.messages[i]);
                }
            }
            return conversationMessages;
        }
    }

    private create() {      
        //NOTE* Message credit charge is done in the backend       
        if (!this.message.text || this.message.text.length < 1) {
            this.alertService.error("ERROR_NOT_ENOUGH_CHARACTERS");
        } else if (this.message.text.length > 500) {
            this.alertService.error("ERROR_TOO_MANY_CHARACTERS");
        } else {
            //Build message object before sending
            this.message.users = this.template.users;            
            this.messageService.create(this.message).subscribe(
                () => {  },
                (error) => { this.alertService.error(<any>error) },
                () => { if (!Config.system_production) { console.log(this.message); } this.messages.push(this.message);this.message = new Message();}
            );
            console.log(this.message);
        }
    }

    private shrinkImage(imageUri: string, width: number, height: number) {
        var sourceImage = new Image();
        sourceImage.src = imageUri;

        // Create a canvas with the desired dimensions
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        // Scale and draw the source image to the canvas
        ctx.drawImage(sourceImage, 0, 0, width, height);

        // Convert the canvas to a data URL in PNG format
        var data = canvas.toDataURL();
        return data;
    }

    private scrollToBottom(): void {
        try {
            var divMessages = <HTMLDivElement>document.getElementById("divMessages");
            divMessages.scrollTop = divMessages.scrollHeight;
            //this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
        } catch (error) { }
    }
}