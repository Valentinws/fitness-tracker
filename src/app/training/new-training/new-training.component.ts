import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormControl, NgForm } from '@angular/forms';
import {   Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  isLoading!: boolean;
  exercises!: Exercise[];
  exerciseSubscription!: Subscription;

  constructor(private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(ex => {
      this.exercises = ex
      this.isLoading = false;
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
