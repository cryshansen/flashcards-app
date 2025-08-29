import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualCuesGuidelineComponent } from '../visual-cues-guideline/visual-cues-guideline.component';
import { TtsTextGuidelineComponent } from '../tts-text-guideline/tts-text-guideline.component';

@Component({
  selector: 'app-guidelines-drawer',
  imports: [CommonModule,VisualCuesGuidelineComponent,TtsTextGuidelineComponent],
  templateUrl: './guidelines-drawer.component.html',
  styleUrl: './guidelines-drawer.component.css'
})
export class GuidelinesDrawerComponent {
  @Input() isOpen =false;

  open(){
    this.isOpen = true;
  }

  close(){
    this.isOpen = false;
  }
}
