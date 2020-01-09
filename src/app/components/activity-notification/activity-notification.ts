import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'models';
import { Activity } from 'src/app/services/NotificationService';
import { Router } from '@angular/router';

@Component({
    selector: 'activity-notification',
    templateUrl: 'activity-notification.html'
})
export class ActivityNotificationComponent implements OnInit {
    constructor(private router: Router) {
    }

    @Input()
    activity: Activity;

    clicked() {
        let link = this.activity.location;
        let scrollDiv = document.getElementById("post_" + this.activity.scrollTo);
        if (link != undefined) {
            this.router.navigate([link]);
        }
        if (scrollDiv != undefined) {
            scrollDiv.scrollIntoView();
        }
    }

    ngOnInit() { }
}
