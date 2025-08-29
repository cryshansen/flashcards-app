import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingSectionComponent } from '../../landing-section/landing-section.component';
import { HowworksComponent } from '../../howworks/howworks.component';
import { ContactModalService } from '../../services/contact-modal.service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule,LandingSectionComponent, HowworksComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  showContact = false;
  constructor(private contactModalS:ContactModalService){}
  openModal(){
    this.showContact = true;
    this.contactModalS.open();
  }
  closeModal(){this.showContact = false; this.contactModalS.close();}
}