import { Component, OnInit } from '@angular/core';
import { Activity, NotificationModel, NotificationType } from 'models';
import { NotificationService } from '../../services/NotificationService';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    activities: Activity[] = [];
    private notifications: NotificationModel[] = [];
    private notificationType = NotificationType;
    private isVisible: boolean;

    constructor(private notificationService: NotificationService, private popupService: NzNotificationService)  { }


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

        this.notificationService.onNewChannel((notif: NotificationModel) => {
            if (notif && this.notifications.includes(notif) === false) {
                this.notifications.push(notif);
                this.addInLocalStorage(JSON.stringify(this.notifications));
                this.computeNotifDisplay(notif);
                this.createPushNotification(notif);
            }
        });
    }

    addInLocalStorage(value: string) {
        localStorage.setItem('notifications', value);
    }

    computeNotifDisplay(notif: NotificationModel) {
        switch (notif.type) {
            case this.notificationType.UserConnect:
                this.popupService.blank(
                    `User ${notif.user.username} connected`,
                    `User ${notif.user.username} connected at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
                );
                break;
            case this.notificationType.Comment:
                this.popupService.blank(
                    `User ${notif.user.username} commented a post`,
                    `User ${notif.user.username} commented ${notif.data.message} on post number "${notif.data.post.id}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
                );
                break;
            case this.notificationType.Like:
                this.popupService.blank(
                    `User ${notif.user.username} liked a post`,
                    `User ${notif.user.username} liked post number "${notif.data.post.id}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
                );
                break;
            case this.notificationType.NewChannel:
                this.popupService.blank(
                    `A channel named ${notif.data.name} was created`,
                    `A channel named ${notif.data.name} was created at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
                );
                break;
            case this.notificationType.Post:
                this.popupService.blank(
                    `User ${notif.user.username} posted a message`,
                    `User ${notif.user.username} posted "${notif.data.message}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
                );
                break;
            default:
                break;
        }
    }

    createPushNotification(notificationModel: NotificationModel) {
        if (this.isVisible === false) {
            if (Notification.permission === 'granted') {
                var notification = new Notification("New notification !", {
                    body: this.computeNotifStringDiplay(notificationModel),
                    icon: 'http://i.stack.imgur.com/Jzjhz.png?s=48&g=1',
                    dir: 'auto'
                });
                setTimeout(function () {
                    notification.close();
                }, 4000);
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (status) {
                });
            }
        }
    }
    computeNotifStringDiplay(notif: NotificationModel) {
        switch (notif.type) {
            case this.notificationType.UserConnect:
                return `User ${notif.user.username} connected at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`;
            case this.notificationType.Comment:
                return `User ${notif.user.username} commented ${notif.data.message} on post number "${notif.data.post.id}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
            case this.notificationType.Like:
                return `User ${notif.user.username} liked post number "${notif.data.post.id}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`;
            case this.notificationType.NewChannel:
                return `A channel named ${notif.data.name} was created at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`;
            case this.notificationType.Post:
                return `User ${notif.user.username} posted "${notif.data.message}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`;
            default:
                break;
        }
    } 
}
