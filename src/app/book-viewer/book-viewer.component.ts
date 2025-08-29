import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Book,Page } from '../models/book';

@Component({
  selector: 'app-book-viewer',
  imports: [CommonModule],
  templateUrl: './book-viewer.component.html',
  styleUrl: './book-viewer.component.css'
})

/**
 * Book Viewer represents the code and navigate page buttons of reminders. 
 */
export class BookViewerComponent {

  @Input() bookData!: Book;
  currentIndex = 0;


  get currentPage(): Page | undefined {
    return this.bookData?.pages[this.currentIndex];
  }

  nextPage() {
    if (this.currentIndex < this.bookData.pages.length - 1) this.currentIndex++;
  }

  prevPage() {
    if (this.currentIndex > 0) this.currentIndex--;
  }

}
