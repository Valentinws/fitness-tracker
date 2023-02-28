import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { UIService } from "../shared/ui.service";
import { TrainingService } from "../training/training.service";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

@Injectable()
export class AuthService{
    
    
    authChange = new Subject<boolean>();
    isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
    private snackBar: MatSnackBar) { }
    
    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training'])
            } else {
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['']);
                this.isAuthenticated = false;
            }
        })
    }

    register(authData: AuthData) {
        this.uiService.loading.next(true)
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(
                result => {
                    this.uiService.loading.next(false)
                }
            )
            .catch(error => {
                this.uiService.loading.next(false)
                this.uiService.showSnackbar(error.message, '', { dration: 3000 })
            }
            )
    }

    login(authData: AuthData) {
        this.uiService.loading.next(true)
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(
                result => {
                    this.uiService.loading.next(false)
                }
            )
            .catch(
                err => {
                    this.uiService.loading.next(false)
                    this.uiService.showSnackbar(err.message, '', {dration: 3000})
                    
                }
            )
    
        
    }

    logout() {  
        this.afAuth.signOut();
    }

   

    isAuth() {
        return this.isAuthenticated;
    }

    
}