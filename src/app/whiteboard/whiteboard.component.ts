import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlashcardComponent } from '../components/flashcard/flashcard.component';
import { FlashcardService } from '../services/flashcard.service';
import { Flashcard } from '../models/flashcard';

@Component({
  standalone:true,
  selector: 'app-whiteboard',
  imports: [ CommonModule, FormsModule,FlashcardComponent],
  templateUrl: './whiteboard.component.html',
  styleUrl: './whiteboard.component.css'
})
export class WhiteboardComponent implements OnInit{
  topics = ['Angular', 'Java'];
  selectedTopic: string = 'All';
  selectedDataset: string = 'Angular';
  flashcards : Flashcard[] =[];

 constructor(private flashcardService:FlashcardService){}

  ngOnInit(): void {
    this.selectedTopic = 'All';
    this.loadQuestions();
  }

  loadQuestions(): void {
    //call the flashcard service for 
    this.flashcardService.getWhiteboardQuestions(this.selectedDataset).subscribe( data =>{ this.flashcards = data; });
  }

  get topicFilters(): string[] {
    const allTopics = this.flashcards.map(card => card.topic);
    return ['All', ...Array.from(new Set(allTopics))];
  }
  filteredCards(): Flashcard[] {
        return this.flashcards.filter(card => {
          const matchesTopic = this.selectedTopic === 'All' || card.topic === this.selectedTopic;
          return matchesTopic;
        });
    }
}
