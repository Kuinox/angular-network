import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/index';
import { UserRegistration } from 'models';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

/**
 * Ajoute un nouvel utilisateur
 */
@Component({
    selector: 'register',
    templateUrl: 'register.html'
})
export class RegisterComponent {
    @ViewChild(NgForm, { static: false })
    ngForm: NgForm;
    model = new UserRegistration();
    loading = false;
    usernameLoading = false;
    promiseCanceller: () => void;
    usernameIsFree = true;
    constructor(
        private registrationService: RegistrationService,
        private messageService: NzMessageService,
        private router: Router
    ) { }

    async register() {
        if (this.ngForm.form.invalid) {
            return;
        }
        await this.registrationService.register(this.model);
        this.router.navigate(['/login']);
        // DONE utiliser registrationService pour ajouter un nouvel utilisateur : DONE
        // DONE utiliser this.router.navigate pour rediriger l'utilisateur vers la page de login: DONE
    }



    async checkUsernameAvailable() {
        if (this.usernameLoading) {
            this.promiseCanceller();
        } else {
            this.usernameLoading = true;
        }
        let response = await new Promise<boolean | null>((resolve, reject) => {
            this.promiseCanceller = () => resolve(null);
            this.registrationService.usernameExists(this.ngForm.value.username)
                .then((val) => {
                    resolve(val);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
        if (response == null) return;
        this.usernameLoading = false;
        this.usernameIsFree = !response;
    }


}