import { Component, Input } from '@angular/core';
import { Post } from 'models';
import { PostService, PostSocketService, LoggedUser, MessageParser } from 'services';
/**
 * Affiche les poste
 */
@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent { 
    @Input() post: Post;
    id : string;
    constructor(
        private postSocket: PostSocketService, 
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser,
        private postSocketService : PostSocketService
    ) {
        this.id="post_"+this.id
    }

    ngOnInit() {
        // détermine le bon type de contenu
        this.post.content = this.parser.parse(this.post);
        this.postSocketService.onComment((comment) => {
            this.post.comments.push(comment);
        }); 

        this.postSocket.onLike((like) => {
            if(like.post.id !== this.user.id) {
            }      
        });
    }

    async onComment(message: string) {
      // TODO send message
    }

    async hasClicked(event) {
            this.post.liked =  true;
        await this.postService.like(this.post);
    }
}
