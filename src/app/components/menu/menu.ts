import { Component, Input } from '@angular/core';
import { Channel } from 'models';
import { PostSocketService } from '../../services/index';

/**
 * Side menu permettant de naviguer entre les différents channels
 */
@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})
export class MenuComponent {
    @Input() channels: Channel[] = [];
}



