import { analyzeNgModules, ConditionalExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { DragAndDropService } from "./drag-and-drop.service";
import { LineService } from "./line.service";
interface LogElAnd {
  htmlEl: HTMLElement,
  x: number,
  y:number,
  startX: number,
  startY: number,
  inputValue_1: undefined|number,
  inputValue_1_html:HTMLElement,
  inputValue_2: undefined|number,
  inputValue_2_html:HTMLElement,
  outputValue: undefined|number,
  outputValue_html:HTMLElement,
  id: number,
}

@Injectable({
  providedIn: 'root'
})
export class LogElAndService {
  masLogElAnd: LogElAnd[] = [];
  constructor(
    public dragAndDropService: DragAndDropService,
    public lineService: LineService) { }

  addAnd(div){
    const and = {
      htmlEl: div,
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      inputValue_1: undefined,
      inputValue_1_html: div.querySelector('.inputValue_1'),
      inputValue_2: undefined,
      inputValue_2_html: div.querySelector('.inputValue_2'),
      outputValue: undefined,
      outputValue_html: div.querySelector('.outputValue'),
      id: this.masLogElAnd.length
    }
    and.inputValue_1_html.innerText =`${(and.inputValue_1==undefined)?'?':and.inputValue_1}`;
    and.inputValue_2_html.innerText =`${(and.inputValue_2==undefined)?'?':and.inputValue_2}`;
    and.outputValue_html.innerText =`${(and.outputValue==undefined)?'?':and.outputValue}`;
    this.masLogElAnd.push(and);
    this.dragAndDropService.addMoveListeners(and);
    and.htmlEl.addEventListener('dblclick', this.receivingSignal.bind(this, and.id));
  }

  // при двойном клике на элемент, получаем входной сигнал и рисуется линия
  receivingSignal(id, event){
    let data = {
      inputHtml: this.masLogElAnd[id].htmlEl,
      x: event.pageX,
      y: event.pageY,
      value: this.masLogElAnd[id].outputValue,
    };
    if (this.masLogElAnd[id].outputValue==undefined){ // значит кликнули, чтобы добавить входной сигнал
      if (this.masLogElAnd[id].inputValue_1 == undefined){ // добавление первого входного сигнала
        this.masLogElAnd[id].inputValue_1 = this.lineService.returnSignal(data);
        this.masLogElAnd[id].inputValue_1_html.innerText = `${this.masLogElAnd[id].inputValue_1}`;

      } else if (this.masLogElAnd[id].inputValue_2 == undefined){ // добавление второго входного сигнала
        this.masLogElAnd[id].inputValue_2 = this.lineService.returnSignal(data);
        this.masLogElAnd[id].inputValue_2_html.innerText = `${this.masLogElAnd[id].inputValue_2}`;
        //расчет выходного сигнала
        this.masLogElAnd[id].outputValue = this.masLogElAnd[id].inputValue_1 &this.masLogElAnd[id].inputValue_2;
        this.masLogElAnd[id].outputValue_html.innerText = `${this.masLogElAnd[id].outputValue}`;
      }
    }else { // кликнули, чтобы выходной сигнал добавить как входной следующему элементу
      this.lineService.addValue(data);
    }
  }

}


