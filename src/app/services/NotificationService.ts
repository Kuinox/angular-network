import { Injectable, EventEmitter } from '@angular/core';
import { PostSocketService } from './PostSocketService';
import { AuthenticationService } from './AuthenticationService';
import { ServerConfiguration } from './ServerConfiguration';
import { HttpClient } from '@angular/common/http';
import { Activity, NotificationModel, NotificationType, Channel } from '../models/models';

@Injectable()
export class NotificationService {
    private activities: Activity[];
    private socketService: PostSocketService;
    private notificationType = NotificationType;


    onChange: EventEmitter<any> = new EventEmitter();
    constructor( postSocketService: PostSocketService )
    {
        this.activities = [];
        this.socketService = postSocketService;
    }
    addActivity(activity: Activity) {
        this.activities.push(activity);
        this.onChange.emit();
    }

    onNewChannel(callback: (notification: NotificationModel) => void) {
        this.socketService.onNewChannel((channel: Channel) => {
            let resp = new NotificationModel();
            resp = {
                type: this.notificationType.NewChannel,
                data: channel,
                datetime: new Date()
            };
            callback(resp);
        });
    }

    getAll(): Activity[] {
        return this.activities;
    }
}
