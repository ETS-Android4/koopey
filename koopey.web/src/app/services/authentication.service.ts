import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { Environment } from "src/environments/environment";
import { User } from "../models/user";
import { AuthToken } from "../models/authentication/authToken";
import { Change } from "../models/authentication/change";
import { Login } from "../models/login";
import { BaseService } from "./base.service";

@Injectable()
export class AuthenticationService extends BaseService {
  public user = new ReplaySubject<User>();

  constructor(
    protected httpClient: HttpClient,
    protected translateService: TranslateService
  ) {
    super(httpClient, translateService);
  }

  public activate(user: User): Observable<String> {
    var url =
      Environment.ApiUrls.KoopeyApiUrl +
      "/authenticate/activate/reply?language=" +
      this.translateService.currentLang;
    return this.httpClient.post<String>(url, user, this.publicHttpHeader);
  }

  public activateForgotten(): Observable<String> {
    var url =
      Environment.ApiUrls.KoopeyApiUrl +
      "/authenticate/activate/forgotten?language=" +
      this.translateService.currentLang;
    return this.httpClient.get<String>(url, this.publicHttpHeader);
  }

  public emailChangeRequest(changeEmail: Change): Observable<String> {
    var url =
      Environment.ApiUrls.KoopeyApiUrl +
      "/authenticate/email/change/request?language=" +
      this.translateService.currentLang;
    return this.httpClient.post<String>(
      url,
      changeEmail,
      this.privateHttpHeader
    );
  }

  public emailChangeReply(user: User): Observable<String> {
    var url =
      Environment.ApiUrls.KoopeyApiUrl +
      "/authenticate/email/change/reply?language=" +
      this.translateService.currentLang;
    return this.httpClient.post<String>(url, user, this.privateHttpHeader);
  }

  public isAuthenticated() {
    if (localStorage.getItem("token") !== null) {
      return true;
    } else {
      return false;
    }
  }

  public getLocalCurrency(): string {
    return JSON.parse(localStorage.getItem("currency") || "usd");
  }

  public setLocalCurrency(currency: string) {
    localStorage.setItem("currency", currency);
  }

  public getLocalLanguage(): string {
    if (localStorage.getItem("language") !== null) {
      console.log(
        "Local language set to ",
        <string>localStorage.getItem("language")
      );
      return <string>localStorage.getItem("language");
    } else {
      console.log("Local language set to default");
      localStorage.setItem("language", "en");
      return <string>localStorage.getItem("language");
    }
  }

  public setLocalLanguage(language: string) {
    localStorage.setItem("language", language);
  }

  public getLocalUser(): User {
    var user: User = new User();

    user.alias = JSON.parse(localStorage.getItem("alias")!);
    user.avatar = JSON.parse(localStorage.getItem("avatar")!);
    user.currency = JSON.parse(localStorage.getItem("currency")!);
    user.id = JSON.parse(localStorage.getItem("id")!);
    user.language = JSON.parse(localStorage.getItem("language")!);
    user.name = JSON.parse(localStorage.getItem("name")!);
    user.locations = JSON.parse(localStorage.getItem("locations")!);
    user.wallets = JSON.parse(localStorage.getItem("wallets")!);
    user.gdpr = localStorage.getItem("gdpr") == "true" ? true : false;
    user.notify = localStorage.getItem("notify") == "true" ? true : false;
    user.authenticated =
      localStorage.getItem("authenticated") == "true" ? true : false;

    return user;
  }

  public getUser(): Observable<User> {
    return this.user.asObservable();
  }

  public setUser(user: User): void {
    this.user.next(user);
  }

  public login(login: Login): Observable<AuthToken> {
    var url =
      Environment.ApiUrls.KoopeyApiUrl +
      "/authenticate/login?language=" +
      this.translateService.currentLang;

    return this.httpClient.post<AuthToken>(url, login, this.publicHttpHeader);
  }

  public logout() {
    try {
      localStorage.removeItem("alias");
      localStorage.removeItem("avatar");
      localStorage.removeItem("currency");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("language");
      localStorage.removeItem("measure");
      localStorage.removeItem("cookies");
      localStorage.removeItem("name");
      localStorage.removeItem("location");
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      localStorage.removeItem("wallets");
      localStorage.removeItem("toko");
      localStorage.removeItem("bitcoin");
      localStorage.removeItem("ethereum");
      localStorage.removeItem("terms");
      localStorage.removeItem("notify");
      localStorage.removeItem("authenticated");
    } catch (error) {
      console.log(error);
    }
  }

  public passwordChange(changePassword: Change): Observable<String> {
    var url =
      Environment.ApiUrls.KoopeyApiUrl +
      "/authenticate/password/change?language=" +
      this.translateService.currentLang;
    return this.httpClient.post<String>(
      url,
      changePassword,
      this.privateHttpHeader
    );
  }

  public passwordChangeForgotten(changePassword: Change): Observable<String> {
    var url =
      Environment.ApiUrls.KoopeyApiUrl +
      "/authenticate/password/forgotten/change?language=" +
      this.translateService.currentLang;
    return this.httpClient.post<String>(
      url,
      changePassword,
      this.publicHttpHeader
    );
  }

  public passwordForgottenReply(changePassword: Change): Observable<String> {
    var url =
      Environment.ApiUrls.KoopeyApiUrl +
      "/authenticate/password/forgotten/reply?language=" +
      this.translateService.currentLang;
    return this.httpClient.post<String>(
      url,
      changePassword,
      this.publicHttpHeader
    );
  }

  public passwordForgottenRequest(user: User): Observable<String> {
    var url =
      Environment.ApiUrls.KoopeyApiUrl +
      "/authenticate/password/forgotten/request?language=" +
      this.translateService.currentLang;
    return this.httpClient.post<String>(url, user, this.publicHttpHeader);
  }

  public register(user: User): Observable<String> {
    let url = Environment.ApiUrls.KoopeyApiUrl + "/authenticate/register";
    return this.httpClient.post<String>(url, user, this.publicHttpHeader);
  }

  public saveLocalAuthToken(authToken: AuthToken) {
    localStorage.setItem("token", authToken.token);
  }

  public saveLocalUser(user: User) {
    localStorage.setItem("id", user.id);
    if (user.avatar) {
      localStorage.setItem("avatar", user.avatar);
    } else {
      localStorage.setItem("avatar", Environment.Default.ImageUri);
    }
    localStorage.setItem("alias", user.alias);
    localStorage.setItem("currency", user.currency);
    localStorage.setItem("id", user.id);
    localStorage.setItem("name", user.name);
    localStorage.setItem("wallets", JSON.stringify(user.wallets));
    localStorage.setItem("locations", JSON.stringify(user.locations));
    localStorage.setItem("measurementType", user.measurementType);
    localStorage.setItem("gdpr", String(user.gdpr));
    localStorage.setItem("cookies", String(user.cookies));
    localStorage.setItem("notify", String(user.notify));
    localStorage.setItem("authenticated", String(user.authenticated));
  }

  public saveLanguage(language: String) {
    localStorage.setItem("language", String(language));
  }
}
