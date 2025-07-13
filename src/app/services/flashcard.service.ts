import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flashcard } from '../models/flashcard';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private jsonUrl = 'assets/data/flashcards.json';

  constructor(private http: HttpClient) {}

  getFlashcards(topic: string): Observable<Flashcard[]> {
    const topicFile = topic.toLowerCase() + '-cards-data.json';
    const url = `assets/data/${topicFile}`;
    return this.http.get<Flashcard[]>(url);
  }
  getInterviewQuestions(topic: string): Observable<Flashcard[]> {
    const file = `assets/data/interview-questions-${topic.toLowerCase()}.json`;
    return this.http.get<Flashcard[]>(file);
  }


}
