import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
  dataSource = new MatTableDataSource<Exercise>();
  exSubscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor( private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exSubscription = this.trainingService.exercisesFinished.subscribe(exercises => {
      this.dataSource.data = exercises
    })
    this.trainingService.fetchCompletedOrCancelledExercises();
    
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(event:any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();

  }

  ngOnDestroy(): void {
    this.exSubscription.unsubscribe();
  }

}
