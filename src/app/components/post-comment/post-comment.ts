import { Component, Input } from '@angular/core';
import { Comment } from 'models';
import { LoggedUser } from 'services';

/**
 * Affiche le commentaire d'un post
 */
@Component({
    templateUrl: 'post-comment.html',
    selector: 'post-comment'
})
export class PostCommentComponent{
    @Input() comment: Comment;

    constructor(
        private user: LoggedUser
        )
    {
    }
}