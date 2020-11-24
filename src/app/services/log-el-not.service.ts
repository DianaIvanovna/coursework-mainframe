import { Injectable } from '@angular/core';
import { DragAndDropService } from "./drag-and-drop.service";
import { LineService } from "./line.service";

interface LogElNot {
  element: string,
  htmlEl: HTMLElement,
  x: number,
  y:number,
  startX: number,
  startY: number,
  inputValue_1: undefined|number,
  inputValue_1_html:HTMLElement,
  outputValue: undefined|number,
  outputValue_html:HTMLElement,
  id: number,
}

@Injectable({
  providedIn: 'root'
})
export class LogElNotService {
  masLogElNot: LogElNot[] = [];
  constructor(
    public dragAndDropService: DragAndDropService,
    public lineService: LineService) {
  }

  addElement(div, element){
    const el = {
      element: element,
      htmlEl: div,
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      inputValue_1: undefined,
      inputValue_1_html: div.querySelector('.inputValue_1'),
      outputValue: undefined,
      outputValue_html: div.querySelector('.outputValue'),
      id: this.masLogElNot.length
    }
    el.inputValue_1_html.innerText =`${(el.inputValue_1==undefined)?'?':el.inputValue_1}`;
    el.outputValue_html.innerText =`${(el.outputValue==undefined)?'?':el.outputValue}`;
    this.masLogElNot.push(el);
    this.dragAndDropService.addMoveListeners(el);
    el.htmlEl.addEventListener('dblclick', this.receivingSignal.bind(this, el.id));
  }

  // при двойном клике на элемент, получаем входной сигнал и рисуется линия
  receivingSignal(id, event){
    let data = {
      inputHtml: this.masLogElNot[id].htmlEl,
      x: event.pageX,
      y: event.pageY,
      value: this.masLogElNot[id].outputValue,
    };
    if (this.masLogElNot[id].outputValue==undefined){ // значит кликнули, чтобы добавить входной сигнал
      let buf = this.lineService.returnSignal(data);
      if (buf != undefined){
        this.masLogElNot[id].inputValue_1 = this.lineService.returnSignal(data);
        this.masLogElNot[id].inputValue_1_html.innerText = `${this.masLogElNot[id].inputValue_1}`;

        this.masLogElNot[id].outputValue = + !(this.masLogElNot[id].inputValue_1);
        this.masLogElNot[id].outputValue_html.innerText = `${this.masLogElNot[id].outputValue}`;
      }

    }else { // кликнули, чтобы выходной сигнал добавить как входной следующему элементу
      this.lineService.addValue(data);
    }
  }
}
