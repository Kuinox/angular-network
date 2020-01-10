import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChannelService, NotificationService } from 'services';
/**
 * Ajoute un nouveau channel
 */
@Component({
    selector: 'add-channel',
    templateUrl: 'add-channel.html'
})
export class AddChannelComponent {
    @ViewChild(NgForm, { static: false })
    ngForm: NgForm;
    isVisible: boolean = false;
    @Output() eventEmitter: EventEmitter<any> = new EventEmitter();

    model = { name: '' };
    constructor(
        private channelService: ChannelService,
        private notificationService: NotificationService
    ) {
    }

    show() {
        this.isVisible = true;
    }

    hide() {
        this.isVisible = false;
        this.model.name = '';
    }

    async save() {
        if (this.ngForm.valid) {
            let newChannel = await this.channelService.add(this.model.name);
            this.eventEmitter.emit(newChannel);
            this.notificationService.addActivity(newChannel);
            this.hide();
        }
    }
}