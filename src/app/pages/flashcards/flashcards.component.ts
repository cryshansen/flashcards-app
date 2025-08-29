import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlashcardService } from '../../services/flashcard.service';
import { Flashcard } from '../../models/flashcard';
import { FlashcardComponent } from '../../components/flashcard/flashcard.component';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [CommonModule,FlashcardComponent, FormsModule],
  templateUrl: './flashcards.component.html',
  styleUrl: './flashcards.component.css'
})
export class FlashcardsComponent implements OnInit {

    topics = ['Angular','React','Spring', 'Java', 'Testing','JUnit'];
    selectedDataset: string = 'React';
    flashcards: Flashcard[] = [];
    selectedTopic: string = 'All';
    selectedDifficulty: string = 'All';
    @Input() flashcard!: Flashcard;
  
    constructor(private flashcardService: FlashcardService) {}
  
    ngOnInit(): void {
      this.loadFlashcards();
    }
  
    loadFlashcards(): void {
      this.flashcardService.getFlashcards(this.selectedDataset).subscribe(data => {
        this.flashcards = data;
        this.selectedTopic = 'All'; // Reset topic filter
      });
    }
  
    get topicFilters(): string[] {
      const allTopics = this.flashcards.map(card => card.topic);
      return ['All', ...Array.from(new Set(allTopics))];
    }
    get difficultyLevels(): string[] {
      return ['All', 'easy', 'medium', 'hard'];
    }
  
    filteredCards(): Flashcard[] {
        return this.flashcards.filter(card => {
          const matchesTopic = this.selectedTopic === 'All' || card.topic === this.selectedTopic;
          const matchesDifficulty = this.selectedDifficulty === 'All' || card.difficulty === this.selectedDifficulty;
          return matchesTopic && matchesDifficulty;
        });
    }

}
