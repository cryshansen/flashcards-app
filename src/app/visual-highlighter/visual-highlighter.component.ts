import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlahscardInputComponent } from '../flahscard-input/flahscard-input.component';
import { FilterByTypePipe } from '../shared/pipes/filter-by-type.pipe';
import { Cue } from '../user-content-editor/user-content-editor.component';


@Component({
  selector: 'app-visual-highlighter',
  standalone: true,
  imports: [CommonModule, FlahscardInputComponent, FilterByTypePipe],
  templateUrl: './visual-highlighter.component.html',
  styleUrl: './visual-highlighter.component.css'
})
export class VisualHighlighterComponent {
  content: string = 'Hello, type your flashcard text here.'; 

  renderedContent: string = '';
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






}
