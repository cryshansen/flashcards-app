import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InterviewQuestionsComponent } from './interview-questions/interview-questions.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import { ElevatorComponent } from './elevator/elevator.component';
import { BoosterComponent} from './booster/booster.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectComponent } from './pages/project/project.component';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { FlashcardsComponent } from './pages/flashcards/flashcards.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ResetpasswordFormComponent } from './resetpassword-form/resetpassword-form.component';
import { MindmapComponent } from './mindmap/mindmap.component';
import { UserContentEditorComponent } from './user-content-editor/user-content-editor.component';
import { BoostPuzzlesComponent } from './boost-puzzles/boost-puzzles.component';
import { WorkflowWizzardComponent } from './workflow-wizzard/workflow-wizzard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },   // default redirect
  { path: 'home', component: HomeComponent },
  { path: 'flashcard', component: FlashcardsComponent },
  { path: 'interview', component: InterviewQuestionsComponent },
  { path: 'whiteboard', component: WhiteboardComponent },
  { path: 'elevator', component: ElevatorComponent },
  { path: 'booster', component:BoosterComponent},
  { path:'boost-puzzles', component:BoostPuzzlesComponent},
  { path: 'about', component:AboutComponent},
  { path: 'project', component:ProjectComponent},
  { path: 'mindmap', component: MindmapComponent},
  { path: 'signup', component:SignupComponent} ,
  { path: 'signin', component:SigninComponent} ,
  { path: 'passwordreset', component:ResetpasswordComponent} ,
  { path: 'resetpassword', component:ResetpasswordFormComponent} ,
  { path:'try-editor', component:UserContentEditorComponent},
  { path:'workflow', component:WorkflowWizzardComponent },
  { path: '', component:ContactModalComponent}


];
