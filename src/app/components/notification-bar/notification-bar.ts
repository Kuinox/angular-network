import { Component, OnInit } from '@angular/core';
import { NotificationService, Activity } from '../../services/NotificationService';
import { Post, UserConnectionActivity, LikeActivity, ChannelCreationActivity, Comment } from 'models';
@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    activities: Activity[] = [];
    constructor(private notificationService: NotificationService) {
        this.notificationService.onChange.subscribe(()=> {
            this.updateActivities();
        });
    }


    updateActivities = () => {
        this.activities = this.notificationService.getAll();
    }

    ngOnInit() {
        this.notificationService.onChange.subscribe(this.updateActivities);
        this.updateActivities();
    }
}
