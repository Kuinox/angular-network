import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChannelService, NotificationService, LoggedUser} from 'services';
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
        private notificationService: NotificationService,
        private loggedUser : LoggedUser
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
            await this.channelService.add(this.model.name);
            this.hide();
        }
    }
}