import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate = new Date();
  isLoading!: boolean;
  private loadingSubscription!: Subscription;

  constructor(private authService: AuthService, private uiService:UIService) { }

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loading.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
  }

  onSubmit(form: NgForm) {
    
    this.authService.register({
      email: form.value.email,
      password: form.value.password,
    })

  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      
      this.loadingSubscription.unsubscribe();
    }
  }

}
