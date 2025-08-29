import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faCircleQuestion} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-live-preview',
  imports: [CommonModule,FontAwesomeModule,FormsModule],
  templateUrl: './live-preview.component.html',
  styleUrl: './live-preview.component.css'
})
export class LivePreviewComponent implements OnInit{
  content: string = '[underline]Example:[/underline] [em]Hello[/em]  [underline]type[/underline] your flashcard item [strong]here.[/strong]';

  faCircleQuestion=faCircleQuestion; //fa-circle fa-stack-2x 
  renderedContent: string = '';

  ngOnInit(): void {
      this.updatePreview();
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




}
