import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   // <-- import this

import { TtsService } from '../services/tts.service';


@Component({
  selector: 'app-booster-carousel',
  imports: [CommonModule, FormsModule],
  templateUrl: './booster-carousel.component.html',
  styleUrl: './booster-carousel.component.css'
})
export class BoosterCarouselComponent {
  @Input() slides: { image: string; caption?: string }[] = [];
//  @Input() slides: string[]=[];
  
  currentIndex = 0;
  readAllMode = false;
  voices: SpeechSynthesisVoice[] = [];
  selectedVoice: string | null = null;
// New props for sliders
  rate = 1;   // default speed
  pitch = 1;  // default pitch
 
  listening = false; //tracks the TTS is running
  private voiceRetryInterval: any;

  constructor(private tts: TtsService){}
  
  ngOnInit() {
    this.tryLoadVoices();
    this.voices = this.tts.getAvailableVoices();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['slides'] && this.slides?.length) {
      // slides are ready, can optionally read first slide or init carousel
      console.log('Slides loaded', this.slides);
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
  readSlide(index: number) {
    const caption = this.slides?.[index]?.caption;
    if (caption) {
      if(this.listening){
        this.tts.cancel();
        this.listening = false;
      }else{
        this.tts.speak(caption, undefined,this.selectedVoice?? undefined, this.rate, this.pitch);
        this.listening = true;
      }
    }
  }

  onVoiceChange(event: any) {
    this.selectedVoice = event.target.value;
  }

  readCurrentSlide(autoAdvance = false) {
    const caption = this.slides?.[this.currentIndex]?.caption;
    if(!caption) return;
    if (caption) this.tts.speak(caption);
    if(autoAdvance){
      this.tts.speak(caption,()=>{
        if(this.readAllMode && this.currentIndex < this.slides.length -1){
          this.currentIndex++;
          this.readCurrentSlide(true);
        }else{
          this.readAllMode = false;
        }
      }, this.selectedVoice ?? undefined);
    } else {
      this.tts.speak(caption, undefined, this.selectedVoice ?? undefined, this.rate, this.pitch);
    }
  }

  readAllSlides(){
    if(!this.slides?.length) return;
    if(this.listening){
       this.tts.cancel();
      this.listening = false;
    }else{
      this.readAllMode = true;
      this.currentIndex=0;
      this.readCurrentSlide(true);
      this.listening = true;
    }
  }
  

  prevSlide() {
    if(this.currentIndex > 0) this.currentIndex--;
  }

  nextSlide() {
    if(this.currentIndex < this.slides.length - 1) this.currentIndex++;
  }



}
