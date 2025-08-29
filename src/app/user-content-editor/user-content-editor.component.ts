import { Component, OnInit,AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   // <-- import this
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faCircleQuestion} from '@fortawesome/free-solid-svg-icons';
//import * as bootstrap from 'bootstrap';

import { TtsService } from '../services/tts.service';

import { FilterByTypePipe } from '../shared/pipes/filter-by-type.pipe';
//import { SortByOrderPipe } from '../shared/pipes/sort-by-order.pipe';

import { GuidelinesDrawerComponent } from '../guidelines-drawer/guidelines-drawer.component'; 
//--legacy-peer-deps
export interface Cue  {
  name: string;
  description: string;
  tag: string; // what will be inserted in the textarea
  type: 'visual' | 'tts';// Type determines grouping and styling
  color?: string;        // Optional custom color
  order?: number;        // Optional order for sorting
}

/**
 * DONOT DELETE!!! valuable functionality can use elsewhere
 * This is an exploration PROTOTYPE page component to get the flashcard input worked out as a prototype and now we are splitting it up to a smooth user testing workflow style for ease of use. modern and fresh into components refer to workflow-wizzard
 */
@Component({
  selector: 'app-user-content-editor',
  imports: [ CommonModule,FormsModule,
             FilterByTypePipe,
             //SortByOrderPipe,  redundant no value for pipe this component 
             FontAwesomeModule, 
             GuidelinesDrawerComponent ],
  templateUrl: './user-content-editor.component.html',
  styleUrl: './user-content-editor.component.css'
})
export class UserContentEditorComponent implements OnInit , AfterViewInit {
  @ViewChild('tooltipIcon') tooltipIcon!: ElementRef;

  content: string = '';
  faCircleQuestion=faCircleQuestion; //fa-circle fa-stack-2x 
  renderedContent: string = '';
  listening = false;
  // Define the cues array. sort order isnt very valueable here as it doesnt help with select the buttons unless we want the table order to match the cues
  cues: Cue[] = [
    { name: 'Terms', description: 'Bold key terms', tag: '[strong]', type: 'visual', color: '#17a2b8', order: 1 },
    { name: 'Actions', description: 'Underline verbs/actions', tag: '[underline]', type: 'visual', color: '#6c757d', order: 2 },
    { name: 'Data Flows', description: 'Italicize data flow', tag: '[em]', type: 'visual', color: '#007bff', order: 3 },
    { name: 'Syntax', description: 'Inline code for syntax', tag: '[code]', type: 'visual', color: '#343a40', order: 4 },
    { name: 'Short Pause', description: 'Pause for effect', tag: '[pause]', type: 'tts', color: '#ffc107', order: 1 },
    { name: 'Long Pause', description: 'Longer pause', tag: '[longpause]', type: 'tts', color: '#dc3545', order: 2 },
    { name: 'Emphasize', description: 'Emphasize a word', tag: '[em:word]', type: 'tts', color: '#28a745', order: 3 },
  ];
  private voiceRetryInterval: any;  
  voices: SpeechSynthesisVoice[] = [];
  selectedVoice: string | null = null;
// New props for sliders
  rate = 1;   // default speed
  pitch = 1;  // default pitch
  placeholderText = `Welcome to [strong]FlashLearn[/strong], the app that helps you learn [em:effectively] and retain knowledge. [pause] 
    Each flashcard highlights key [underline]terms[/underline] and [em]concepts[/em], so your brain can recognize patterns quickly. [pause]
    You can listen to your flashcards aloud at your preferred speed and pitch. [longpause]
    Remember to focus on [em:understanding] not just memorization. [pause]
    Syntax examples are displayed exactly as you would write them: [code]for (let i = 0; i < 10; i++)[/code]. [pause]
    Have fun experimenting with [strong]visual[/strong] and [em:audio] cues!`;



  constructor(private tts: TtsService){}

  ngOnInit() {
    this.tryLoadVoices();
    this.voices = this.tts.getAvailableVoices();
  }
   ngAfterViewInit(): void {
   // new Tooltip(this.tooltipIcon.nativeElement);
   // Activate all tooltips
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    //tooltipTriggerList.map((el: any) => new bootstrap.Tooltip(el));
  }
  // Inserts text at the cursor position
  insertAtCursor(text: string) {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.slice(start, end); 
    let insertText = text;
    // Wrap selected text if any
    if (textarea.selectionStart !== textarea.selectionEnd) {
      const selectedText = this.content.slice(start, end);
      insertText = `${text}${selectedText}${this.getClosingTag(text)}`;
    } else if (text === '[em:word]') {
      // If text is '[em:word]', call emphasis prompt

        if (selectedText) {
            // Wrap the selected text
            const wrapped = `[em:${selectedText}]`;
            this.content = this.content.slice(0, start) + wrapped + this.content.slice(end);

            // Update cursor
            textarea.selectionStart = textarea.selectionEnd = start + wrapped.length;
            this.updatePreview();
            textarea.focus();
          } else {
            this.insertEmphasis();
          }
        return; // don't continue with default insertion
      }else{
         insertText = `${text}${this.getClosingTag(text)}`;
      }

    this.content = this.content.slice(0, start) + insertText + this.content.slice(end);
    // Move cursor after inserted text
    setTimeout(() => {

      textarea.selectionStart = textarea.selectionEnd = start + text.length;

      this.updatePreview();

      textarea.focus();
    });
  }


// Returns closing tag for a given opening tag
getClosingTag(tag: string) {
  if (tag.startsWith('[strong]')) return '[/strong]';
  if (tag.startsWith('[underline]')) return '[/underline]';
  if (tag.startsWith('[em]')) return '[/em]';
  if (tag.startsWith('[code]')) return '[/code]';
  return '';
}
// Render content with visual highlights for preview
// do not delete 
  updatePreview() {
    let rendered = this.content;

    // Simple replacements for preview
    rendered = rendered.replace(/\[strong\](.*?)\[\/strong\]/g, '<strong>$1</strong>');
    rendered = rendered.replace(/\[underline\](.*?)\[\/underline\]/g, '<u>$1</u>');
    rendered = rendered.replace(/\[em\](.*?)\[\/em\]/g, '<em>$1</em>');
    rendered = rendered.replace(/\[code\](.*?)\[\/code\]/g, '<code>$1</code>');

    // Show pauses as small orange text
    rendered = rendered.replace(/\[pause\]/g, '<span style="color:orange;">[pause]</span>');
    rendered = rendered.replace(/\[longpause\]/g, '<span style="color:red;">[longpause]</span>');
    rendered = rendered.replace(/\[em:word\]/g, '<span style="color:green;">[emphasize]</span>');

    this.renderedContent = rendered;
  }

  insertEmphasis() {
    const word = prompt('Enter word to emphasize:');
    if (word) {
      this.insertAtCursor(`[em:${word}]`);
    }
  }

  readContent() {
    if (!this.renderedContent.trim()) return; // nothing to read
    //this.tts.speak(this.renderedContent, undefined, this.selectedVoice ?? undefined, this.rate, this.pitch);

      // Create a temporary element to strip HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = this.renderedContent;
      const textToRead = tempDiv.textContent || tempDiv.innerText || '';

      this.tts.speak(textToRead, undefined, this.selectedVoice ?? undefined, this.rate, this.pitch);

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

  clearContent() {
    this.content = '';
    this.renderedContent = '';
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;

    if (textarea) {
      textarea.value = '';
      textarea.focus();
    }
  }



// Retry mechanism for loading voices
  private tryLoadVoices(force = false) {
    if (force || !this.voices.length) {
      const loaded = this.tts.getAvailableVoices();
      if (loaded.length > 0) {
        this.voices = loaded;
        if (!this.selectedVoice) {
          this.selectedVoice = this.voices[0].name; // default pick
        }

        if (this.voiceRetryInterval) {
          clearInterval(this.voiceRetryInterval);
        }
      } else {
        // Retry every 300ms until voices load
        if (!this.voiceRetryInterval) {
          this.voiceRetryInterval = setInterval(() => this.tryLoadVoices(), 300);
        }
      }
    }
  }
  onVoiceChange(event: any) {
    this.selectedVoice = event.target.value;
  }




  saveContent() {
    console.log('Content saved:', this.content);
    alert('Flashcard content saved!');
    // Here you can integrate API call to save content
  }
}
