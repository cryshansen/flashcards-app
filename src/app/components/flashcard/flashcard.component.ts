import { Component , Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flashcard } from '../../models/flashcard';
//More flashcards added (Spring Boot CLI, Testing, Actuator, etc.)?


@Component({
  standalone: true,
  selector: 'app-flashcard',
  imports: [CommonModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {

  @Input() flashcard!: Flashcard;
  showAnswer = false;

  toggleCard() {
    this.showAnswer = !this.showAnswer;
  }
}

