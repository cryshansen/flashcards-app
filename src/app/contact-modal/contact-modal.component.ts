import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactModalService } from '../services/contact-modal.service';

@Component({
  selector: 'app-contact-modal',
  imports: [CommonModule,ReactiveFormsModule ],
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent {
  @Output() closed = new EventEmitter<void>();
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactModalS:ContactModalService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
    
  }

  submitForm() {
    if (this.contactForm.valid) {
      console.log('Contact message:', this.contactForm.value);
      alert('Message sent! Thank you.');
      this.closeModal();
    }
  }

  closeModal() {
    this.closed.emit();
    this.contactModalS.close();
  }
}
