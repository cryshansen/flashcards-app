import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Book } from '../models/book';


@Injectable({
  providedIn: 'root'
})
export class BookService{

  constructor(private http: HttpClient) {}

  getBook(topic: string): Observable<Book> {
    //stringarray and basic so far
    const topicFile = topic.toLowerCase() + '-puzzles.json';
    const url = `assets/data/${topicFile}`;
    return this.http.get<Book>(url);
  }



}