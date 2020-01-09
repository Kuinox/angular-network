import { Component, OnInit } from '@angular/core';
import { Activity } from 'models';
import { NotificationService } from '../../services/NotificationService';
@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    activities: Activity[] = [];
    constructor(private notificationService: NotificationService) { }


    updateActivities = () => {
        console.log("updated");
        this.activities = this.notificationService.getAll();
    }

    ngOnChanges() {
        console.log("aezaeza");
    }
    ngOnInit() {
        this.notificationService.onChange.subscribe(this.updateActivities);
        this.updateActivities();
    }
}
