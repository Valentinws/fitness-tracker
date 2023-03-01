import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map, Subject, Subscription } from "rxjs";
import { UIService } from "../shared/ui.service";
import { Exercise } from "./exercise.model";
import * as UI from '../shared/ui.actions';
import * as fromRoot from '../app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class TrainingService{
    exerciseChanged = new Subject<Exercise|null>();
    availableExercises: Exercise[] = []
    exercisesChanged = new Subject<Exercise[]>();
    exercisesFinished = new Subject<Exercise[]>();

    private runnigEx: any;
    private fireBaseSubsctiptions: Subscription[] = [];

    constructor(private db: AngularFirestore, private uiService: UIService,
                private store: Store<fromRoot.State>) { }

    fetchAvailableExercises() {
         this.fireBaseSubsctiptions.push(this.db.collection('availableExercises').snapshotChanges().pipe(
            map(docArray => {
                return docArray.map(doc => {
                    let data: any = doc.payload.doc.data()
                    return {
                        id: doc.payload.doc.id,
                        name: data.name,
                        calories: data.calories,
                        duration: data.duration,
                    }
                })
            })
         ).subscribe(
             (ex: Exercise[]) => {
             this.availableExercises = ex;
             this.exercisesChanged.next([...this.availableExercises])
             }, err => {
                 this.store.dispatch(new UI.StopLoading())
                 this.uiService.showSnackbar('Fetching exercises failed. Please try again later!','',3000)
        }) )
    }

    startExercise(exId: string) {
        this.runnigEx = this.availableExercises.find(ex => ex.id === exId);
        this.exerciseChanged.next({...this.runnigEx})
        
    }

    completeExercise() { 
       
        this.addDataToDb({
            ...this.runnigEx,
            date: new Date().toLocaleDateString(),
            state: 'completed'
        })
        this.runnigEx = null;
        this.exerciseChanged.next(null);
    }
    
    cancelExercise(progress: number) {
        
        this.addDataToDb({
            ...this.runnigEx,
            duration: this.runnigEx.duration * (progress / 100),
            calories: this.runnigEx.calories * (progress / 100),
            date: new Date().toLocaleDateString(),
            state: 'canceled'
        })
        this.runnigEx = null;
        this.exerciseChanged.next(null);
    }

    getRunnigexercise() {
        return {...this.runnigEx}
    }

    fetchCompletedOrCancelledExercises() {
        this.fireBaseSubsctiptions.push( this.db.collection('finishedExercises').valueChanges().subscribe({
        next: (exercises) => {
                this.exercisesFinished.next(exercises as Exercise[])
            },
        error: err => console.log(err)}
        ) )
    }

    cancelSubscriptions() {
        this.fireBaseSubsctiptions.forEach(s => s.unsubscribe());
    }

    addDataToDb(ex: Exercise) {
        this.db.collection('finishedExercises').add(ex);
    }

}