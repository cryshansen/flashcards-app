import { Component } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faCircleQuestion} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-save-card',
  imports: [ FontAwesomeModule],
  templateUrl: './save-card.component.html',
  styleUrl: './save-card.component.css'
})
export class SaveCardComponent {
  faCircleQuestion = faCircleQuestion;
  content: string = '';
  renderedTextContent: string = '[underline]Example:[/underline] [em]Hello[/em]  [underline]type[/underline] your flashcard item [strong]here.[/strong]';
  renderedSpeechContent:string ='[em:Example]: [pause]Hello,  type your [longpause] flashcard item [em:here].';

ngOnInit(): void {
      this.updatePreview();
  }
// Render content with visual highlights for preview
// do not delete 
  updatePreview() {
    let rendered = this.renderedTextContent;

    // Simple replacements for preview
    rendered = rendered.replace(/\[strong\](.*?)\[\/strong\]/g, '<strong>$1</strong>');
    rendered = rendered.replace(/\[underline\](.*?)\[\/underline\]/g, '<u>$1</u>');
    rendered = rendered.replace(/\[em\](.*?)\[\/em\]/g, '<em>$1</em>');
    rendered = rendered.replace(/\[code\](.*?)\[\/code\]/g, '<code>$1</code>');

    // Show pauses as small orange text
    rendered = rendered.replace(/\[pause\]/g, '<span style="color:orange;">[pause]</span>');
    rendered = rendered.replace(/\[longpause\]/g, '<span style="color:red;">[longpause]</span>');
    rendered = rendered.replace(/\[em:word\]/g, '<span style="color:green;">[emphasize]</span>');

    this.renderedTextContent = rendered;
  }


  saveContent() {
    console.log('renderedTextContent saved:', this.renderedTextContent);
    console.log('renderedSpeechContent saved:', this.renderedSpeechContent);
    alert('Flashcard content saved!');
    // Here you can integrate API call to save content
  }

  clearContent() {
    /*
    this.content = '';
    this.renderedTextContent = '';
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;

    if (textarea) {
      textarea.value = '';
      textarea.focus();
    }
      */

    /**
     * now need to find the form fields of the other screens so that we can clear the content scope is not adherent yet
     */
  }


}
