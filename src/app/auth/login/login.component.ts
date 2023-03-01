import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as fromRoot from "../../app.reducer";
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading$ ?: Observable<boolean>;
  private loadingSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>          
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading); 
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      }
    )
    // this.loadingSubscription = this.uiService.loading.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // })

  }

  onSubmit() {
    
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
    
  }

  // ngOnDestroy(): void {
  //   if (this.loadingSubscription) {
      
  //     this.loadingSubscription?.unsubscribe();
  //   }
  // }

}
