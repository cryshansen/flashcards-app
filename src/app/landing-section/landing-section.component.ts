import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactModalService } from '../services/contact-modal.service';

@Component({
  selector: 'app-landing-section',
  imports: [CommonModule,RouterModule],
  templateUrl: './landing-section.component.html',
  styleUrl: './landing-section.component.css'
})
/**
 * to be integrated coded for now todo
 */
export class LandingSectionComponent {
  constructor(private contactModalService: ContactModalService) {}

  openContact() {
    this.contactModalService.open();
  }
  closeModal(){ this.contactModalService.close();}
}
