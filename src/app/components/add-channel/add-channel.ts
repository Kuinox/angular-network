import { Component, ViewChild } from '@angular/core';
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
            this.notificationService.addActivity(newChannel);
            this.hide();
        }
    }
}