import { Injectable } from '@angular/core';
import { ServerConfiguration } from './ServerConfiguration';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../models/models';

@Injectable()
export class NotificationService {
    activities: Activity[];

    addActivity(activity: Activity) {
        this.activities.push(activity);
    }

    getAll(): Activity[] {
        return this.activities;
    }
}
