import { Injectable } from '@angular/core';
import { DragAndDropService } from "./drag-and-drop.service";
import { LineService } from "./line.service";

interface Decoder {
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
export class DecoderService {
  decoders: Decoder[] = [];

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
      outputValue: [],
      outputValue_html: div.querySelector('.outputValue'),
      id: this.decoders.length,
      numberOut: 0,
    }
    for(let i=0;i<2;i+=1 ){
      el.inputValue.push({
        value: undefined,
        html: div.querySelector(`.inputValue_${i+1}`)
      })
      el.inputValue[i].html.innerText = `${(el.inputValue[i].value==undefined)?'?':el.inputValue[i].value}`
    }
    for(let i=0;i<4;i+=1 ){
      el.outputValue.push({
        value: undefined,
        html: div.querySelector(`.outputValue_${i+1}`)
      })
      el.outputValue[i].html.innerText = `${(el.outputValue[i].value==undefined)?'?':el.inputValue[i].value}`
    }
    this.decoders.push(el);
    this.dragAndDropService.addMoveListeners(el);
    el.htmlEl.addEventListener('dblclick', this.receivingSignal.bind(this, el.id));
  }

   // при двойном клике на элемент, получаем входной сигнал и рисуется линия
   receivingSignal(id, event){
    if (this.decoders[id].numberOut != 4){
      let data = {
        inputHtml: this.decoders[id].htmlEl,
        x: event.pageX,
        y: event.pageY,
        value: this.decoders[id].outputValue[this.decoders[id].numberOut].value,
      };
      if (this.decoders[id].outputValue[0].value==undefined){ // значит кликнули, чтобы добавить входной сигнал
        let buf = this.lineService.returnSignal(data);
        if (buf != undefined){
          let flagCalcOutputValue = false;
          for(let i=0;i<2;i+=1 ){ // проходим по всем входным значениеям
            if (this.decoders[id].inputValue[i].value==undefined){ // если входное значение не известно - this.lineService.returnSignal
              if (i==1) flagCalcOutputValue = true;
              this.decoders[id].inputValue[i].value = buf;
              this.decoders[id].inputValue[i].html.innerText = `${this.decoders[id].inputValue[i].value}`;
              break;
            }
          }
          if (flagCalcOutputValue){ // если все входные значения заполнены, то расчитываем выходное.
            let x = this.decoders[id].inputValue[0].value;
            let y = this.decoders[id].inputValue[1].value;
            let out;
            if (x==0 && y==0) out = 0;
            if (x==0 && y==1) out = 1;
            if (x==1 && y==0) out = 2;
            if (x==1 && y==1) out = 3;
            for(let i=0;i<4;i+=1 ){ // проходим по всем входным значениеям
              if (i==out) this.decoders[id].outputValue[i].value = 1;
              else this.decoders[id].outputValue[i].value = 0;
              this.decoders[id].outputValue[i].html.innerText = `${this.decoders[id].outputValue[i].value}`;
            }
          }
        }
      }else { // кликнули, чтобы выходной сигнал добавить как входной следующему элементу
        this.lineService.addValue(data);
        this.decoders[id].numberOut++;
      }
    }
  }

  // подумай про выходы

}

