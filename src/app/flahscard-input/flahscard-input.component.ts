import { Component, Input, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-flahscard-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './flahscard-input.component.html',
  styleUrl: './flahscard-input.component.css'
})
export class FlahscardInputComponent {
  @Input() text: string = '';
  @Output() textChange = new EventEmitter<string>();
  content: string = '';
  placeholderText="Hello, type your flashcard text here. ";
  
  onTextChange(value: string) {
    this.textChange.emit(value);
  }
  
}
