// contact-modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactModalService {
  // true = modal visible
  private _visible$ = new BehaviorSubject<boolean>(false);

  // Observable to subscribe to in components
  get visible$(): Observable<boolean> {
    return this._visible$.asObservable();
  }

  open() {
    this._visible$.next(true);
  }

  close() {
    this._visible$.next(false);
  }
}
