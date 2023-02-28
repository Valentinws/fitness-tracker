
import { NgModule } from "@angular/core";
import {  ReactiveFormsModule } from "@angular/forms";


import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
    declarations: [LoginComponent, SignupComponent],
    imports: [  ReactiveFormsModule,  
        AngularFireAuthModule,
        BrowserModule,
        SharedModule,
        AuthRoutingModule
    ],
    exports:[]
})

export class AuthModule{ }