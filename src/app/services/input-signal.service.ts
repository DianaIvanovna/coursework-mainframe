import { Injectable } from '@angular/core';
import { DragAndDropService } from "./drag-and-drop.service";
interface InputSignal {
  value: number,
  htmlEl: HTMLElement,
  x: number,
  y:number,
  startX: number,
  startY: number,
}

@Injectable({
  providedIn: 'root'
})
export class InputSignalService {
  zeroInputSignal:InputSignal[]=[];
  singleInputSignal:InputSignal[]=[];

  constructor(public dragAndDropService: DragAndDropService) { }

  addSignal(el, div){
    const signal = {
      value: el.value,
      htmlEl: div,
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
    }
    if (el.value === 0) this.zeroInputSignal.push(signal);
    else this.singleInputSignal.push(signal);
    this.dragAndDropService.addMoveListeners(signal);
  }
}
