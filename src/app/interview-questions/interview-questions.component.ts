import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardComponent } from '../components/flashcard/flashcard.component';
import { FlashcardService } from '../services/flashcard.service';
import { Flashcard } from '../models/flashcard';

@Component({
  standalone: true,
  selector: 'app-interview-questions',
  imports: [CommonModule, FlashcardComponent],
  templateUrl: './interview-questions.component.html',
  styleUrl: './interview-questions.component.css'
})
export class InterviewQuestionsComponent implements OnInit{
  topics = ['Angular', 'React', 'Java'];
  selectedTopic = 'Angular';
  flashcards: Flashcard[] = [];

  constructor(private flashcardService: FlashcardService) {}

  ngOnInit(): void {
    this.loadQuestions(this.selectedTopic);
  }

  loadQuestions(topic: string): void {
    this.selectedTopic = topic;
    this.flashcardService.getInterviewQuestions(topic).subscribe(data => {
      this.flashcards = data;
    });
  }
}
