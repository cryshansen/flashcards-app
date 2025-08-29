import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../models/book';
import { BookViewerComponent } from '../book-viewer/book-viewer.component';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-boost-puzzles',
  imports: [CommonModule,BookViewerComponent],
  templateUrl: './boost-puzzles.component.html',
  styleUrl: './boost-puzzles.component.css'
})
export class BoostPuzzlesComponent implements OnInit {
  topics = ['basic', 'sort','java'];        // same as your flashcard topics
  selectedTopic: string | null = null;
  selectedBook: Book | null= null;

  constructor( private bookService: BookService) {}
  ngOnInit(){
    this.selectedTopic = "basic";
    this.bookService.getBook(this.selectedTopic).subscribe(data =>{
      this.selectedBook = data;
    })
  }

//this should pass to the child via output emitter? and in the book-viewer call the service
  selectBook(topic: string) {
    this.selectedTopic = topic;
    this.bookService.getBook(topic).subscribe(data =>{
      this.selectedBook = data;
    })
  }

}
