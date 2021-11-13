import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { Environment } from "src/environments/environment";
import { User } from "../../../models/user";
import { UUID } from "angular2-uuid";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "userbox",
  styleUrls: ["userbox.css"],
  templateUrl: "userbox.html",
})
export class UserboxComponent implements OnInit {
  @Input() user: User = new User();
  @Input() userId!: UUID;
  @Input() textVisible: boolean = false;
  @Input() round: boolean = false;

  constructor(
    private router: Router,
    public sanitizer: DomSanitizer,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.userId === localStorage.getItem("id")) {
      this.user.id = localStorage.getItem("id")!;
      this.user.alias = localStorage.getItem("alias")!;
      this.user.avatar = localStorage.getItem("avatar")!;
      this.user.name = localStorage.getItem("name")!;
    } else {
      this.userService.getUser().subscribe((user) => {
        this.user = user;
      });
    }
  }

  public hasAlias(): boolean {
    if (this.user && this.user.alias && Environment.Menu.Alias) {
      return true;
    } else {
      return false;
    }
  }

  public hasImage(): boolean {
    if (this.user && this.user.avatar && this.user.avatar != "") {
      return true;
    } else {
      return false;
    }
  }

  public hasName(): boolean {
    if (this.user && this.user.name && !Environment.Menu.Alias) {
      return true;
    } else {
      return false;
    }
  }

  public isMyUser(): boolean {
    //window.location used to get id because this method is run during form load and not through subscription
    if (
      window.location.href.substr(window.location.href.lastIndexOf("/") + 1) ==
      localStorage.getItem("id")
    ) {
      return true;
    } else {
      return false;
    }
  }

  public gotoUser(user: User) {
    this.router.navigate(["/user/read/", user.id]);
  }
}
