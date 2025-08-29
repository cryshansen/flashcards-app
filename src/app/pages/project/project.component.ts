import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LandingSectionComponent } from '../../landing-section/landing-section.component';
import { ContactModalService } from '../../services/contact-modal.service';
import { WorkflowWizzardComponent } from '../../workflow-wizzard/workflow-wizzard.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, LandingSectionComponent,WorkflowWizzardComponent,RouterModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  showContact = false;
  constructor(private contactModalS:ContactModalService){}

  openModal(){
   
    this.showContact = true;
    this.contactModalS.open();
  }
  closeModal(){this.showContact = false; this.contactModalS.close();}
}
