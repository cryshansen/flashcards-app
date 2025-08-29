import { Pipe, PipeTransform } from '@angular/core';
import { Cue } from '../../user-content-editor/user-content-editor.component';

@Pipe({
  name: 'filterByType'
})
export class FilterByTypePipe implements PipeTransform {

  transform(cues: Cue[], type: string): Cue[] {
    if (!cues) return []; // always return array
    return cues.filter(cue => cue.type === type);
  }

}
