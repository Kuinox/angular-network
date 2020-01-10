import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PostService, MessageParser, NotificationService } from '../../services/index';
import { Post } from '../../models';
import { ActivatedRoute } from '@angular/router';

/**
 * Wrap user inputs like textarea
 */
@Component({
    selector: 'user-inputs',
    templateUrl: 'user-inputs.html'
})
export class UserInputsComponent {

    @Input() channelId: string;
    message:string;

    @Input() post?: Post;
    
    @Output()
    submitted: EventEmitter<any> = new EventEmitter();

    constructor(
        private postervice: PostService,
        private notificationService: NotificationService
    ) {
    }

    async send() {
        if(!this.message) return;
        if(this.post == null) {
            await this.postervice.post(this.channelId, this.message);
        } else {
            await this.postervice.comment(this.post, this.message);
        }
        this.submitted.emit();
    }
}
