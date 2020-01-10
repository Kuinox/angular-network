import { Injectable, EventEmitter } from '@angular/core';
import { ServerConfiguration } from './ServerConfiguration';
import { HttpClient } from '@angular/common/http';
import { Post, Comment, Like, User, Channel } from '../models/models';
import { NzNotificationService } from 'ng-zorro-antd';
import { SocketService } from './SocketService';
import { PostSocketService } from './PostSocketService';

export class Activity {
    activityMessage: string;
    scrollTo?: string | undefined;
    location?: string | undefined;
}

@Injectable()
export class NotificationService {
    onChange: EventEmitter<any> = new EventEmitter();
    private activities: Activity[] = [];
    private isWindowVisible: boolean;
    constructor(
        private notification: NzNotificationService,
        private socket: PostSocketService
    ) {
        let stored = localStorage.getItem("activities");
        if (stored != null) {
            this.activities = JSON.parse(stored);
        }
        Notification.requestPermission();
        document.addEventListener("visibilitychange", () => {
            this.isWindowVisible = document.visibilityState === 'visible';
        });
        socket.onComment(comment => this.activityPush({
            activityMessage: comment.user.username + " commented a post.",
            location: "channel/" + comment.post.channel.id,
            scrollTo: comment.id
        }));
        socket.onLike(like => this.activityPush({
            activityMessage: like.user.username + " liked a post."
        }));
        socket.onNewChannel(channel => this.activityPush({
            activityMessage: " A new channel '" + channel.name + "' was created."
        }));
        socket.onPost(post => this.activityPush({
            activityMessage: post.user.username + " posted a new message.",
            location: "channel/" + post.channel.id,
            scrollTo: post.id
        }));
        socket.onUserConnect(user => this.activityPush({
            activityMessage: user.username + " logged in."
        }));
    }
    private activityPush(activity: Activity) {
        localStorage.setItem("activities", JSON.stringify(this.activities));
        this.notification.info("New activity.", activity.activityMessage);
        if (!this.isWindowVisible) {
            var n = new Notification(activity.activityMessage);
            n.onshow = function () {
                setTimeout(n.close.bind(n), 5000);
            }
        }
        this.activities.push(activity);
        this.onChange.emit();
    }
    getAll(): Activity[] {
        return this.activities;
    }
}
