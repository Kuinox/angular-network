import { Component, OnInit, Input } from '@angular/core';
import { Post, UserConnectionActivity, LikeActivity, ChannelCreationActivity, Activity } from 'models';

@Component({
    selector: 'activity-notification',
    templateUrl: 'activity-notification.html'
})
export class ActivityNotificationComponent implements OnInit {
    @Input() activity : Activity;

    post: Post | undefined;
    comment: Comment | undefined;
    userConnection: UserConnectionActivity | undefined;
    likeActivity: LikeActivity | undefined;
    channelCreationActivity : ChannelCreationActivity | undefined;
    constructor() { }

    ngOnChanges() {
        if(this.activity instanceof Post) this.post = this.activity;
        if(this.activity instanceof Comment) this.comment = this.activity;
        if(this.activity instanceof UserConnectionActivity) this.userConnection = this.activity;
        if(this.activity instanceof LikeActivity) this.likeActivity = this.activity;
        if(this.activity instanceof ChannelCreationActivity) this.channelCreationActivity = this.activity;
    }
    ngOnInit() { }
}
