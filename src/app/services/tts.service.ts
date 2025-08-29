import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TtsService{
  private synth = window.speechSynthesis;
//  private currentUtterance?: SpeechSynthesisUtterance;
  private voices: SpeechSynthesisVoice[]=[];

  constructor() {
    this.loadVoices();
    window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
  }

  private loadVoices() {
    this.voices = this.synth.getVoices();
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  speak(text: string, onEndCallback?:() => void,voiceName?:string, rate:number =.9, pitch:number = .9 ) {
    this.cancel();
    if (!text) return;
    // Split on markers and punctuation
      const segments = text.split(/(\[pause\]|\[longpause\]|\[em:[^\]]+\]|[.!?]+)/);

      let utteranceQueue: SpeechSynthesisUtterance[] = [];

      segments.forEach(segment => {
        const trimmed = segment.trim();
        if (!trimmed) return;

        let utterance = new SpeechSynthesisUtterance();

        if (trimmed.startsWith('[pause]')) {
          utterance.text = '';
          utterance.rate = 1;
          utterance.pitch = 1;
          utteranceQueue.push(utterance);
        } else if (trimmed.startsWith('[longpause]')) {
          utterance.text = '';
          utterance.rate = 1;
          utterance.pitch = 1;
          // Insert multiple empty utterances for longer pause
          utteranceQueue.push(utterance, utterance, utterance);
        } else if (trimmed.startsWith('[em:')) {
          const word = trimmed.match(/\[em:(.+?)\]/)?.[1] ?? '';
          utterance.text = word;
          utterance.rate = rate * 0.8; // slow down for emphasis
          utterance.pitch = pitch * 1.2; // slightly higher pitch
          utteranceQueue.push(utterance);
        } else {
          utterance.text = trimmed;
          utterance.rate = rate;
          utterance.pitch = pitch;
          utteranceQueue.push(utterance);
        }

        // Assign voice
        if (voiceName) {
          const selectedVoice = this.voices.find(v => v.name === voiceName);
          if (selectedVoice) utterance.voice = selectedVoice;
        }
      });

      // Chain speaking
      const speakNext = () => {
        if (!utteranceQueue.length) {
          if (onEndCallback) onEndCallback();
          return;
        }
        const u = utteranceQueue.shift()!;
        u.onend = speakNext;
        this.synth.speak(u);
      };

      speakNext(); // start the chain
  }

  cancel() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
  }

  /*onEnd(callback: () => void) {
    if (this.currentUtterance) this.currentUtterance.onend = callback;
  }*/


}