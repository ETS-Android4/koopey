//Angular, Material, Libraries
import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import {
    MaterialModule, MdDatepickerIntl, MdDatepickerModule, MdIconModule, MdIconRegistry, MdInputModule,
    MdTextareaAutosize, MdDialog, MdDialogRef
} from "@angular/material"
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
//Services
import { AlertService } from "../services/alert.service";
import { ClickService, CurrentComponent, ActionIcon } from "../services/click.service";
import { EventService } from "../services/event.service";
import { TranslateService } from "ng2-translate";
import { UserService } from "../services/user.service";
//Components
import { MessageCreateDialogComponent } from "./message-create-dialog.component";
//Helpers
import { DateHelper } from "../helpers/DateHelper";
//Objects
import { Config } from "../config/settings";
import { Event } from "../models/event";
import { Location } from "../models/location";
import { Search } from "../models/search";
import { Tag } from "../models/tag";
import { User } from "../models/user";

@Component({
    selector: "search-transactions-component",
    templateUrl: "../../views/search-transactions.html",
    styleUrls: ["../../styles/app-root.css"]
})

export class SearchEventsComponent implements OnInit, OnDestroy {
    //Controls
    private clickSubscription: any;
    private form: FormGroup;
    //Objects 
    private location: Location = new Location();
    private search: Search = new Search();
    private events: Array<Event> = new Array<Event>();
    private user: User;
    private startDate: String = '2017-01-01';
    private endDate: String = '2017-01-28';
    //Strings
    private LOG_HEADER: string = "SearchEventsComponent"
    //Booleans 
    private searching: boolean = false;

    constructor(
        private alertService: AlertService,
        private clickService: ClickService,
        private datePickerService: MdDatepickerIntl,
        private sanitizer: DomSanitizer,
        private formBuilder: FormBuilder,
        public messageDialog: MdDialog,
        private router: Router,
        private eventService: EventService,
        private translateService: TranslateService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            id: [this.search.transactionId, [Validators.minLength(5)]],
            start: [this.startDate, Validators.required],
            end: [this.endDate, Validators.required]
        });
    }

    ngAfterContentInit() {
        this.clickService.createInstance(ActionIcon.SEARCH, CurrentComponent.SearchEventsComponent);
        this.clickSubscription = this.clickService.getSearchTransactionsClick().subscribe(() => {
            this.findEvents();
        });
    }

    ngAfterViewInit() {
        this.startDate = DateHelper.convertEpochToDateString(this.search.start)
        this.endDate = DateHelper.convertEpochToDateString(this.search.end)
    }

    ngOnDestroy() {
        if (this.clickSubscription) {
            this.clickService.destroyInstance();
            this.clickSubscription.unsubscribe();
        }
    }

    private handleStartUpdate(event: any) {
        var utcDate = new Date(event.target.value);
        if (utcDate.getFullYear() > 1900 && utcDate.getMonth() >= 0 && utcDate.getDate() > 0) {
            this.startDate = DateHelper.convertEpochToDateString(utcDate.getTime());
            this.search.start = utcDate.getTime();
        }
    }

    private handleEndUpdate(event: any) {
        var utcDate = new Date(event.target.value);
        if (utcDate.getFullYear() > 1900 && utcDate.getMonth() >= 0 && utcDate.getDate() > 0) {
            this.endDate = DateHelper.convertEpochToDateString(utcDate.getTime());
            this.search.end = utcDate.getTime();
        }
    }

    private findEvents() {
        if (!this.search.start && !this.search.end) {
            this.alertService.error("ERROR_NOT_DATE")
        } else {
            console.log(this.search);
            //Set progress icon
            this.searching = true;
            this.eventService.readEventsBetweenDates(this.search).subscribe(
                (events) => {
                    this.events = events;                },
                (error) => { this.alertService.error(<any>error) },
                () => {
                    this.router.navigate(["/event/read/list"])
                }
            );
        }
    }
}