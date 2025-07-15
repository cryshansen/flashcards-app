import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InterviewQuestionsComponent } from './interview-questions/interview-questions.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import { ElevatorComponent } from './elevator/elevator.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },   // default redirect
  { path: 'home', component: HomeComponent },
  { path: 'interview', component: InterviewQuestionsComponent },
  { path: 'whiteboard', component: WhiteboardComponent },
  { path: 'elevator', component: ElevatorComponent },


];
