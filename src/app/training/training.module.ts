import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { SharedModule } from "../shared/shared.module";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { TrainingRoutingModule } from "./training-routing.module";
import { TrainingComponent } from "./training.component";


@NgModule({
    declarations: [TrainingComponent, StopTrainingComponent,
        CurrentTrainingComponent, NewTrainingComponent, PastTrainingsComponent],
    imports: [
         
        ReactiveFormsModule,
        
        CommonModule,
        SharedModule,
        TrainingRoutingModule
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}