import { Injectable, EventEmitter } from '@angular/core';
import { ServerConfiguration } from './ServerConfiguration';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../models/models';

@Injectable()
export class NotificationService {
    private activities: Activity[];

    onChange: EventEmitter<any> = new EventEmitter();
    constructor() {
        this.activities = [];
    }
    addActivity(activity: Activity) {
        this.activities.push(activity);
        this.onChange.emit();
    }

    getAll(): Activity[] {
        return this.activities;
    }
}
