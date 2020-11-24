import { Injectable } from '@angular/core';
import { DragAndDropService } from "./drag-and-drop.service";
import { LineService } from "./line.service";

interface Encoder {
  element: string,
  htmlEl: HTMLElement,
  x: number,
  y:number,
  startX: number,
  startY: number,
  inputValue: {
    value: undefined|number,
    html: HTMLElement,
  } [],
  outputValue: {
    value: undefined|number,
    html: HTMLElement,
  } [],
  id: number,
  numberOut:number,// номер выдаваемого выходного сигнала
}

@Injectable({
  providedIn: 'root'
})
export class EncoderService {
  encoders: Encoder[] = [];
  constructor(public dragAndDropService: DragAndDropService,
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
      outputValue: [],
      outputValue_html: div.querySelector('.outputValue'),
      id: this.encoders.length,
      numberOut: 0,
    }
    for(let i=0;i<4;i+=1 ){
      el.inputValue.push({
        value: undefined,
        html: div.querySelector(`.inputValue_${i+1}`)
      })
      el.inputValue[i].html.innerText = `${(el.inputValue[i].value==undefined)?'?':el.inputValue[i].value}`
    }
    for(let i=0;i<2;i+=1 ){
      el.outputValue.push({
        value: undefined,
        html: div.querySelector(`.outputValue_${i+1}`)
      })
      el.outputValue[i].html.innerText = `${(el.outputValue[i].value==undefined)?'?':el.inputValue[i].value}`
    }
    this.encoders.push(el);
    this.dragAndDropService.addMoveListeners(el);
    el.htmlEl.addEventListener('dblclick', this.receivingSignal.bind(this, el.id));
  }

  receivingSignal(id, event){
    if (this.encoders[id].numberOut != 2){
      let data = {
        inputHtml: this.encoders[id].htmlEl,
        x: event.pageX,
        y: event.pageY,
        value: this.encoders[id].outputValue[this.encoders[id].numberOut].value,
      };
      if (this.encoders[id].outputValue[0].value==undefined){ // значит кликнули, чтобы добавить входной сигнал
        let buf = this.lineService.returnSignal(data);
        if (buf != undefined){
          let flagCalcOutputValue = false;
          for(let i=0;i<4;i+=1 ){ // проходим по всем входным значениеям
            if (this.encoders[id].inputValue[i].value==undefined){ // если входное значение не известно - this.lineService.returnSignal
              if (i==3) flagCalcOutputValue = true;
              this.encoders[id].inputValue[i].value = buf;
              this.encoders[id].inputValue[i].html.innerText = `${this.encoders[id].inputValue[i].value}`;
              break;
            }
          }
          if (flagCalcOutputValue){ // если все входные значения заполнены, то расчитываем выходное.
            let y1;
            let y2;
            if (this.encoders[id].inputValue[3].value == 1){
              y1=1;
              y2=1;
            }else if(this.encoders[id].inputValue[2].value == 1){
              y1=0;
              y2=1;
            }else if(this.encoders[id].inputValue[1].value == 1){
              y1=1;
              y2=0;
            }else{
              y1=0;
              y2=0;
            }
            this.encoders[id].outputValue[0].value = y1;
            this.encoders[id].outputValue[1].value = y2;
            this.encoders[id].outputValue[0].html.innerText = `${this.encoders[id].outputValue[0].value}`;
            this.encoders[id].outputValue[1].html.innerText = `${this.encoders[id].outputValue[1].value}`;
          }
        }
      }else { // кликнули, чтобы выходной сигнал добавить как входной следующему элементу
        this.lineService.addValue(data);
        this.encoders[id].numberOut++;
      }
    }
  }
}

