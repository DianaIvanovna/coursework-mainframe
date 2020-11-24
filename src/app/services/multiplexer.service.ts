import { Injectable } from '@angular/core';
import { DragAndDropService } from "./drag-and-drop.service";
import { LineService } from "./line.service";

interface Multiplexer {
  element: string,
  htmlEl: HTMLElement,
  x: number,
  y:number,
  startX: number,
  startY: number,
  inputValue: {
    inputValue: undefined|number,
    inputValue_html: HTMLElement,
  } [],
  outputValue: undefined|number,
  outputValue_html:HTMLElement,
  id: number,
}

@Injectable({
  providedIn: 'root'
})
export class MultiplexerService {
  multiplexers: Multiplexer[] = [];
  constructor(
    public dragAndDropService: DragAndDropService,
    public lineService: LineService) { }

  addElement(div,){
    const el = {
      element: 'multiplexer',
      htmlEl: div,
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      inputValue: [],
      outputValue: undefined,
      outputValue_html: div.querySelector('.outputValue'),
      id: this.multiplexers.length
    }
    for(let i=0;i<6;i+=1 ){
      el.inputValue.push({
        inputValue: undefined,
        inputValue_html: div.querySelector(`.inputValue_${i+1}`)
      })
      el.inputValue[i].inputValue_html.innerText = `${(el.inputValue[i].inputValue==undefined)?'?':el.inputValue[i].inputValue}`
    }
    el.outputValue_html.innerText =`${(el.outputValue==undefined)?'?':el.outputValue}`;
    this.multiplexers.push(el);
    this.dragAndDropService.addMoveListeners(el);
    el.htmlEl.addEventListener('dblclick', this.receivingSignal.bind(this, el.id));
  }

  // при двойном клике на элемент, получаем входной сигнал и рисуется линия
  receivingSignal(id, event){
    let data = {
      inputHtml: this.multiplexers[id].htmlEl,
      x: event.pageX,
      y: event.pageY,
      value: this.multiplexers[id].outputValue,
    };
    if (this.multiplexers[id].outputValue==undefined){ // значит кликнули, чтобы добавить входной сигнал
      let flagCalcOutputValue = false;
      let buf = this.lineService.returnSignal(data);
      if (buf!=undefined){
        for(let i=0;i<6;i+=1 ){ // проходим по всем входным значениеям
          if (this.multiplexers[id].inputValue[i].inputValue==undefined){ // если входное значение не известно - this.lineService.returnSignal
            if (i==5) flagCalcOutputValue = true;
            this.multiplexers[id].inputValue[i].inputValue = buf;
            this.multiplexers[id].inputValue[i].inputValue_html.innerText = `${this.multiplexers[id].inputValue[i].inputValue}`;
            break;
          }
        }
        if (flagCalcOutputValue){ // если все входные значения заполнены, то расчитываем выходное.
          let x = this.multiplexers[id].inputValue[0].inputValue;
          let y = this.multiplexers[id].inputValue[1].inputValue;
          console.log(x,y);
          if (x==0 && y==0){
            this.multiplexers[id].outputValue = this.multiplexers[id].inputValue[2].inputValue; // если x1=0 x2=0 то y=DO
          }else if (x==0 && y==1){
            this.multiplexers[id].outputValue = this.multiplexers[id].inputValue[3].inputValue; // если x1=0 x2=1 то y=D1
          }else if (x==1 && y==0){
            this.multiplexers[id].outputValue = this.multiplexers[id].inputValue[4].inputValue; // если x1=1 x2=0 то y=D2
          }else if (x==1 && y==1){
            this.multiplexers[id].outputValue = this.multiplexers[id].inputValue[5].inputValue; // если x1=1 x2=1 то y=D3
          }
          this.multiplexers[id].outputValue_html.innerText = `${this.multiplexers[id].outputValue}`;
        }
      }
    }else { // кликнули, чтобы выходной сигнал добавить как входной следующему элементу
      this.lineService.addValue(data);
    }
  }

}

