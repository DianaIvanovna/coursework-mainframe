import { Injectable } from '@angular/core';
import { DragAndDropService } from "./drag-and-drop.service";
import { LineService } from "./line.service";

interface LogElOrAnd {
  element: string,
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
export class LogElOrAndService {
  masLogElOrAnd: LogElOrAnd[] = [];
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
      inputValue_2: undefined,
      inputValue_2_html: div.querySelector('.inputValue_2'),
      outputValue: undefined,
      outputValue_html: div.querySelector('.outputValue'),
      id: this.masLogElOrAnd.length
    }
    el.inputValue_1_html.innerText =`${(el.inputValue_1==undefined)?'?':el.inputValue_1}`;
    el.inputValue_2_html.innerText =`${(el.inputValue_2==undefined)?'?':el.inputValue_2}`;
    el.outputValue_html.innerText =`${(el.outputValue==undefined)?'?':el.outputValue}`;
    this.masLogElOrAnd.push(el);
    this.dragAndDropService.addMoveListeners(el);
    el.htmlEl.addEventListener('dblclick', this.receivingSignal.bind(this, el.id));
  }

   // при двойном клике на элемент, получаем входной сигнал и рисуется линия
   receivingSignal(id, event){
    let data = {
      inputHtml: this.masLogElOrAnd[id].htmlEl,
      x: event.pageX,
      y: event.pageY,
      value: this.masLogElOrAnd[id].outputValue,
    };
    if (this.masLogElOrAnd[id].outputValue==undefined){ // значит кликнули, чтобы добавить входной сигнал
      if (this.masLogElOrAnd[id].inputValue_1 == undefined){ // добавление первого входного сигнала
        this.masLogElOrAnd[id].inputValue_1 = this.lineService.returnSignal(data);
        this.masLogElOrAnd[id].inputValue_1_html.innerText = `${this.masLogElOrAnd[id].inputValue_1}`;

      } else if (this.masLogElOrAnd[id].inputValue_2 == undefined){ // добавление второго входного сигнала
        this.masLogElOrAnd[id].inputValue_2 = this.lineService.returnSignal(data);
        this.masLogElOrAnd[id].inputValue_2_html.innerText = `${this.masLogElOrAnd[id].inputValue_2}`;
        //расчет выходного сигнала

        if (this.masLogElOrAnd[id].element == 'and'){
          this.masLogElOrAnd[id].outputValue = this.masLogElOrAnd[id].inputValue_1 &this.masLogElOrAnd[id].inputValue_2;
        }else{
          this.masLogElOrAnd[id].outputValue = this.masLogElOrAnd[id].inputValue_1 | this.masLogElOrAnd[id].inputValue_2;
        }

        this.masLogElOrAnd[id].outputValue_html.innerText = `${this.masLogElOrAnd[id].outputValue}`;
      }
    }else { // кликнули, чтобы выходной сигнал добавить как входной следующему элементу
      this.lineService.addValue(data);
    }
  }


}

