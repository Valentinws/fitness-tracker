import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { UIService } from "../shared/ui.service";
import { TrainingService } from "../training/training.service";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import * as fromRoot from "../app.reducer"; 
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService{
    
    
    authChange = new Subject<boolean>();
    isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>,
        private snackBar: MatSnackBar
    ) { }
    
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
        // this.uiService.loading.next(true)
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(
                result => {
                    // this.uiService.loading.next(false)
                    this.store.dispatch(new UI.StopLoading());
                }
            )
            .catch(error => {
                // this.uiService.loading.next(false)
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(error.message, '', { dration: 3000 })
            }
            )
    }

    login(authData: AuthData) {
        // this.uiService.loading.next(true)
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(
                result => {
                    // this.uiService.loading.next(false)
                    this.store.dispatch(new UI.StopLoading());
                }
            )
            .catch(
                err => {
                    // this.uiService.loading.next(false)
                    this.store.dispatch(new UI.StopLoading());
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