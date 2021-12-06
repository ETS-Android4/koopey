import { Component, OnInit, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Environment } from "src/environments/environment";
import { Subscription } from "rxjs";
import { AuthenticationService } from "../../services/authentication.service";
import { AlertService } from "../../services/alert.service";
import { AssetService } from "../../services/asset.service";
import { TranslateService } from "@ngx-translate/core";
import { TransactionService } from "../../services/transaction.service";
import { UserService } from "../../services/user.service";
import { WalletService } from "../../services/wallet.service";
import { User } from "../../models/user";
import { Search } from "../../models/search";
import { Transaction } from "src/app/models/transaction";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { BaseComponent } from "../base/base.component";

@Component({
  selector: "application",
  styleUrls: ["application.css"],
  templateUrl: "application.html",
})
export class AppComponent extends BaseComponent implements OnInit {
  private actionVisibleSubscription: Subscription = new Subscription();
  private actionIconSubscription: Subscription = new Subscription();
  private currentComponentSubscription: Subscription = new Subscription();

  public languages: any[] = [];
  public currentLanguage: any;
  public authUser: User = new User();
  public actionIcon: String = "error";
  public actionVisible: Boolean = false;

  constructor(
    private alertService: AlertService,
    private assetService: AssetService,
    private authenticateService: AuthenticationService,
    private router: Router,
    public sanitizer: DomSanitizer,
    private translateService: TranslateService,
    private transactionService: TransactionService,
    private userService: UserService,
    private walletService: WalletService
  ) {
    super(sanitizer);
  }

  ngOnInit() {
    try {
      this.authUser = this.authenticateService.getMyUserFromStorage();
    } catch (e) {}
    this.languages = [
      { display: "Chinese", value: "ch" },
      { display: "English", value: "en" },
      { display: "Español", value: "es" },
      { display: "German", value: "de" },
      { display: "Italiano", value: "it" },
    ];
    this.currentLanguage = this.authenticateService.getLocalLanguage();
  }

  ngOnDestroy() {
    if (this.actionIconSubscription) {
      this.actionIconSubscription.unsubscribe();
    }
    if (this.actionVisibleSubscription) {
      this.actionVisibleSubscription.unsubscribe();
    }
    if (this.currentComponentSubscription) {
      this.currentComponentSubscription.unsubscribe();
    }
  }

  ngAfterContentInit() {
    if (!this.currentLanguage) {
      this.currentLanguage = Environment.Default.Language;
      this.changeLanguage(this.currentLanguage);
    } else {
      this.changeLanguage(this.currentLanguage);
    }
    // this.showActionButton();
  }

  public click() {}

  //*** Authentication ***/

  public login() {
    this.router.navigate(["/login"]);
  }

  public logout() {
    this.authenticateService.logout();
    this.router.navigate(["/login"]);
  }

  //*** Language options ***/

  public changeLanguage(language: string) {
    this.translateService.use(language);
    this.authenticateService.setLocalLanguage(language);
  }

  public getLanguageText() {
    for (var i = 0; i < this.languages.length; i++) {
      if (this.currentLanguage == this.languages[i].value) {
        return this.languages[i].display;
      }
    }
  }

  //*** Menu links ***/

  public about() {
    this.router.navigate(["/about"]);
  }

  public barcode() {
    this.router.navigate(["/barcode"]);
  }

  public contactUs() {
    this.router.navigate(["/contact"]);
  }

  public conversations() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/message/list/conversations"]);
    }
  }

  public dashboard() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/dashboard"]);
    }
  }

  public home() {
    this.router.navigate(["/home"]);
  }

  public faq() {
    this.router.navigate(["/faq"]);
  }

  public register() {
    if (!this.isAuthenticated()) {
      this.router.navigate(["/register"]);
    }
  }

  public gotoCalendar() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/user/read/calendar"]);
    }
  }

  public gotoGameDashboard() {
    this.router.navigate(["/game/dashboard"]);
  }

  public gotoFourWayChess() {
    this.router.navigate(["/game/fourwaychess"]);
  }

  public gotoTwoWayChess() {
    this.router.navigate(["/game/twowaychess"]);
  }

  public gotoMyUser() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/user/update"]);
    }
  }

  public gotoMyAssets() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/asset/my/list"]);
    }
  }

  public gotoMyLocations() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/location/list"]);
    }
  }

  public gotoMyProducts() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/asset/my/list"], {
        queryParams: { type: "product" },
      });
    }
  }

  public gotoMyServices() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/asset/my/list"], {
        queryParams: { type: "service" },
      });
    }
  }

  public gotoMyMessages() {
    console.log("gotoMyMessages()");
    if (this.isAuthenticated()) {
      this.router.navigate(["/message/list"]);
    }
  }

  public gotoSearchAssets() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/asset/search/generic"]);
    }
  }

  public gotoReviews() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/review/list"]);
    }
  }

  public gotoSearchMember() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/user/search"]);
    }
  }

  public gotoSearchProducts() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/asset/search"], {
        queryParams: { type: "product" },
      });
    }
  }

  public gotoSearchServices() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/asset/search"], {
        queryParams: { type: "service" },
      });
    }
  }

  public gotoSearchTransactions() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/transaction/search/dates"]);
    }
  }

  public gotoTransactions() {
    if (this.isAuthenticated()) {
      this.transactionService.searchByBuyerOrSeller().subscribe(
        (transactions: Array<Transaction>) => {
          console.log(transactions);
          this.transactionService.setTransactions(transactions);
        },
        (error: any) => {
          this.alertService.error(<any>error);
        },
        () => {
          this.router.navigate(["/transaction/list"]);
        }
      );
    }
  }

  public gotoUserMap() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/user/map"]);
    }
  }

  public gotoAssetMap() {
    if (this.isAuthenticated()) {
      this.router.navigate(["/asset/map"]);
    }
  }

  public gotoWallets() {
    if (this.isAuthenticated()) {
      this.walletService.setWallets(this.authUser.wallets);
      this.router.navigate(["/wallet/list"]);
    }
  }

  /*
   selectLanguage(event: any, lang: string) {
      console.log("selectLanguage called" );
      if (event !== null) {       
        event.preventDefault(); 
      }
      
      this.translateService.use(lang);
   
      if (this.localLanguage != lang) {   
        console.log("localLanguage reset to:" + lang);
        this.userService.setLocalLanguage(lang); 
      }     
    }
  */
  /*selectLanguage(event: any, lang: string) {
    if (!lang) {
      lang = (<HTMLSelectElement>document.getElementById("lstLanguage")).value;
       console.log("selectLanguage2LangNew:" + lang);
    }
    else {
      console.log("selectLanguage2LangSave:" + lang);
     }
     
    
   
    console.log("selectLanguage2Event:" + event);
    if (event !== null) {       
      event.preventDefault(); 
    }
    
    this.translateService.use(lang);
 
    if (this.localLanguage != lang) {   
      console.log("localLanguage reset to:" + lang);
      this.userService.setLocalLanguage(lang); 
    }     
  }*/

  public showCalendar() {
    return Environment.Menu.Events;
  }

  public showFiles() {
    return Environment.Menu.Files;
  }

  public showAssets() {
    return Environment.Menu.Assets;
  }

  public showTransactions() {
    return Environment.Menu.Transactions;
  }

  public isCurrentLanguage(lang: string) {
    return lang === this.translateService.currentLang;
  }

  /* private actionButtonIcon(): any {
     // var result : Boolean = false;
     this.clickService.getIcon().subscribe(
       (icon) => {        
           return icon;       
       },
       (error) => { return false; },
       () => { });
   }*/

  /*  GUI */
  /* private showActionButton() {
    console.log("showActionButton()");
    this.actionVisibleSubscription = this.clickService.getVisible().subscribe(
      (visible: any) => {
        this.actionVisible = visible;
      },
      (error: Error) => {
        this.actionVisible = false;
      },
      () => {}
    );

    this.actionIconSubscription = this.clickService.getIcon().subscribe(
      (icon: any) => {
        this.actionIcon = icon;
      },
      (error: Error) => {
        this.actionIcon = "error";
      },
      () => {}
    );
  }*/
}
