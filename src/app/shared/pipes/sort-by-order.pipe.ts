import { Pipe, PipeTransform } from '@angular/core';

import { Cue } from '../../user-content-editor/user-content-editor.component';

@Pipe({
  name: 'sortByOrder'
})
export class SortByOrderPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return [];
  }

  /*transform(cues: Cue[], order: number): Cue[] {
    if (!cues) return []; // always return array
    return cues.filter(cue => cue.order === order);
  }*/

}
