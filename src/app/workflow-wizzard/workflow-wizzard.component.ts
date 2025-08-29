import { Component, TemplateRef, ViewChild , ViewChildren,  Input, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule, NgTemplateOutlet, NgIf } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

import { Cue } from '../user-content-editor/user-content-editor.component';
import { FilterByTypePipe } from '../shared/pipes/filter-by-type.pipe';
import { FlahscardInputComponent } from "../flahscard-input/flahscard-input.component";
import { VisualHighlighterComponent } from '../visual-highlighter/visual-highlighter.component';
import { LivePreviewComponent } from '../live-preview/live-preview.component';
import { SpeechHighlighterComponent } from '../speech-highlighter/speech-highlighter.component';
import { TtsPreviewComponent } from '../tts-preview/tts-preview.component';
import { SaveCardComponent } from '../save-card/save-card.component';

@Component({
  selector: 'app-workflow-wizzard',
  standalone: true,
  imports: [CommonModule, 
    NgTemplateOutlet
    , NgIf
    , FilterByTypePipe
    , FlahscardInputComponent
    ,VisualHighlighterComponent
    , LivePreviewComponent
    ,SpeechHighlighterComponent
    ,TtsPreviewComponent
    , SaveCardComponent
  ],
  templateUrl: './workflow-wizzard.component.html',
  animations: [
    trigger('slideUp', [
      transition('inactive => active', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition('active => inactive', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('400ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ],
  styleUrl: './workflow-wizzard.component.css'
})
export class WorkflowWizzardComponent {
//@ContentChildren('step') steps!: QueryList<any>;
// Collect all templates
  @ViewChildren(TemplateRef) stepTemplates!: QueryList<TemplateRef<any>>;
  content: string = '';
  flashcardText: string ='';
  renderedContent: string = '';
  activeStep = 0;
  steps=[
    {templateName:'step1',title:'Step 1: Enter your Flashcard  Text', description:'Enter your flashcard text'},
    {templateName:'step2',title:'Step 2: Highlight / Annotate', description:'Select your text then select a visual que or Get AI to do it! (TODO)'},
    {templateName:'step3',title:'Step 3: Review Visual Cues', description:'View your changes and button Get AI to do it! (TODO'},
    {templateName:'step4',title:'Step 4: Speech Indication', description:'Select your speech indicators select the word(s) and select the indicator -- Have AI improve'},
    {templateName:'step5',title:'Step 5: Visualize speech selections', description:'review your flashcard speech  -- Have AI improve'},
    {templateName:'step6',title:'Step 6: Review & Save', description:'Listen to the speech and save'},
  ];


  ngAfterContentInit(): void {
      //this.activeStep=0;
  }

  get templates(): TemplateRef<any>[] {
    return this.stepTemplates.toArray();
  }




  next(){  
    if( this.activeStep <  this.templates.length ){ 
      this.activeStep++;
    }
  }
  prev(){ 
    if(this.activeStep > 0){
      
      this.activeStep--;
    } 
  }
  finish(){
    console.log("workflow finished");
  }
}
