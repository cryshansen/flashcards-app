import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleQuestion} from '@fortawesome/free-solid-svg-icons';

import { Cue } from '../user-content-editor/user-content-editor.component';
import { TtsService } from '../services/tts.service';
import { FilterByTypePipe } from '../shared/pipes/filter-by-type.pipe';



@Component({
  selector: 'app-tts-preview',
  imports: [CommonModule,FormsModule,FontAwesomeModule, FilterByTypePipe],
  templateUrl: './tts-preview.component.html',
  styleUrl: './tts-preview.component.css'
})
export class TtsPreviewComponent {
  private voiceRetryInterval: any;  
  voices: SpeechSynthesisVoice[] = [];
  selectedVoice: string | null = null;
// New props for sliders
  rate = 1;   // default speed
  pitch = 1;  // default pitch
  content: string = '[em:Example]: [pause]Hello,  type your [longpause] flashcard item [em:here].';
  renderedContent: string = '';
  listening = false;

  faCircleQuestion=faCircleQuestion; //fa-circle fa-stack-2x 


  constructor(private tts: TtsService){}

  ngOnInit() {
    this.renderedContent = this.content;
    this.updatePreview();
    this.tryLoadVoices();
    this.voices = this.tts.getAvailableVoices();
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

// Returns closing tag for a given opening tag
getClosingTag(tag: string) {
  if (tag.startsWith('[strong]')) return '[/strong]';
  if (tag.startsWith('[underline]')) return '[/underline]';
  if (tag.startsWith('[em]')) return '[/em]';
  if (tag.startsWith('[code]')) return '[/code]';
  return '';
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


}
