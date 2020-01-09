import { Injectable, EventEmitter } from '@angular/core';
import { ServerConfiguration } from './ServerConfiguration';
import { HttpClient } from '@angular/common/http';
import { Post, Comment, UserConnectionActivity, LikeActivity, ChannelCreationActivity } from '../models/models';
import { NzNotificationService } from 'ng-zorro-antd';

export class Activity {
    activityMessage: string;
    scrollTo? : string | undefined;
    location? : string | undefined;
}

@Injectable()
export class NotificationService {
    onChange: EventEmitter<any> = new EventEmitter();
    private activities: Activity[] = [];
    private isWindowVisible: boolean;
    constructor(
        private notification: NzNotificationService
    ) {
        let stored = localStorage.getItem("activities");
        if (stored != null) {
            this.activities = JSON.parse(stored);
        }
        Notification.requestPermission();
        document.addEventListener("visibilitychange", () => {
            this.isWindowVisible = document.visibilityState === 'visible';
        });
    }
    private activityPush(activity: Activity) {
        localStorage.setItem("activities", JSON.stringify(this.activities));
        this.notification.info("New activity.", activity.activityMessage);
        if(!this.isWindowVisible) {
            var n = new Notification(activity.activityMessage);
            n.onshow = function () {
                setTimeout(n.close.bind(n), 5000);
            }
        }
        this.activities.push(activity);
        this.onChange.emit();
    }
    addPost(post: Post) {
        this.activityPush({
            activityMessage: post.user.username + " posted a new message.",
            location: "channel/"+post.channel.id,
            scrollTo: post.id
        });
    }

    addComment(comment: Comment) {
        this.activityPush({
            activityMessage: comment.user.username + " commented a post.",
            location: "channel/"+comment.post.channel.id,
            scrollTo: comment.id
        });
        this.onChange.emit();
    }

    addConnection(connectionActivity: UserConnectionActivity) {
        this.activityPush({
            activityMessage: connectionActivity.user.username + " logged in."
        });
    }

    addLike(likeActivity: LikeActivity) {
        this.activityPush({
            activityMessage: likeActivity.user.username + " liked a post."
        });
    }

    addChannel(channelCreation: ChannelCreationActivity) {
        this.activityPush({
            activityMessage: channelCreation.user.username + " created the channel " + channelCreation.channel.name + "."
        })
    }

    getAll(): Activity[] {
        return this.activities;
    }
}
