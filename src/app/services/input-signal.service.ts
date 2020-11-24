import { Injectable } from '@angular/core';
import { DragAndDropService } from "./drag-and-drop.service";
import { LineService } from "./line.service";
interface InputSignal {
  value: number,
  htmlEl: HTMLElement,
  x: number,
  y:number,
  startX: number,
  startY: number,
  id: number,
}

@Injectable({
  providedIn: 'root'
})
export class InputSignalService {
  InputSignal:InputSignal[]=[];
  constructor(
    public dragAndDropService: DragAndDropService,
    public lineService: LineService) { }

  addSignal(el, div){
    const signal = {
      value: el.value,
      htmlEl: div,
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      id: this.InputSignal.length,
    }
    this.InputSignal.push(signal);
    this.dragAndDropService.addMoveListeners(signal);
    signal.htmlEl.addEventListener('dblclick', this.assignSignal.bind(this, signal.id));
  }

  // при двойном клике на сигнал передается значение сигнала и координата клика
  assignSignal(id, event){
    let data = {
      inputHtml: this.InputSignal[id].htmlEl,
      value: this.InputSignal[id].value,
      x: event.pageX,
      y: event.pageY,
    };
    this.lineService.addValue(data);
  }
}

