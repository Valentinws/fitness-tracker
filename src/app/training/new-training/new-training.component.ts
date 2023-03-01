import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormControl, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {   Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  exercises!: Exercise[];
  exerciseSubscription!: Subscription;

  constructor(private trainingService: TrainingService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.store.dispatch(new UI.StartLoading());
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(ex => {
      this.exercises = ex
      this.store.dispatch(new UI.StopLoading())
    });
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    
    this.trainingService.startExercise(form.value.exercise);
    
    
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      
      this.exerciseSubscription.unsubscribe();
    }
  }
  
}
