import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd, Router } from '@angular/router';
import { CommonModule,AsyncPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faClock, faPhone,faArrowRight,faChevronDown,faUser, faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';

import { TtsService } from './services/tts.service';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { ContactModalService } from './services/contact-modal.service';
import { Observable } from 'rxjs';

@Component({
  standalone:true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule, ContactModalComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'flashcards-app';
  faLocationDot = faLocationDot;
  faClock = faClock;
  faPhone = faPhone;
  faFacebook = faFacebookF;
  faTwitter = faTwitter;
  faLinkedin = faLinkedinIn;
  faInstagram = faInstagram;
  faArrowRight =faArrowRight;
  faChevronDown=faChevronDown;
  faUser=faUser;
  faRightToBracket= faRightToBracket;

  isSticky = false;
  listening = false;
  showBottomContent = true;
  showContact = false; //old version
  showContactM$!: Observable<boolean>;

  constructor(private tts: TtsService, private contactModalService : ContactModalService, private router:Router){ 
    this.showContactM$ = this.contactModalService.visible$;
    this.router.events.subscribe( event => {
      if(event instanceof NavigationEnd){
        this.showBottomContent = !(event.url.includes('/signup') || event.url.includes('/signin') ||event.url.includes('/passwordreset') || event.url.includes('/resetpassword')|| event.url.includes('/workflow'));
      }

    });
  }

  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.scrollY > 250;
  }
 
  openModal(event?: Event){
    event?.preventDefault();
    //this.showContact = true;
    this.contactModalService.open();
  }
  closeModal(){
    //this.showContact = false;
    this.contactModalService.close();
    
   }

  toggleReadPage() {
    if (this.listening) {
      this.tts.cancel();
      this.listening = false;
    } else {
      const text = document.body.innerText; // grab page text
      this.tts.speak(text);
      this.listening = true;
    }
  }

  
}
