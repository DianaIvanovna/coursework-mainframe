import { Injectable , } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LineService {
  // сервис для рисование линий между элементами
  constructor() { }
  inputHtml;
  outputHtml;
  inputValue = undefined;
  outputValue = undefined;
  startX;
  startY;
  endX;
  endY;

  addValue(data){
    if (this.inputValue === undefined){
      this.inputValue = data.value;
      this.startX = data.x - 185;
      this.startY = data.y - 45;
      this.inputHtml = data.inputHtml;
      this.inputHtml.classList.add('activeEl') ; // выделенному элементу добавила рамку
    }else {
      // значит этот клик был ошибкой
      this.inputHtml.classList.remove('activeEl') ; // убрала рамку
      this.inputValue = undefined;
      this.inputHtml = undefined;
    }
  }
  returnSignal(data):number{

    if (this.inputValue != undefined){
      this.endX = data.x - 185;
      this.endY = data.y - 45;

      // РИСУЕМ ЛИНИЮ
      var canvas = <HTMLCanvasElement> document.getElementById('canvas');
      var obCanvas = canvas.getContext('2d');
      obCanvas.beginPath();
      obCanvas.lineWidth = 3;
      obCanvas.strokeStyle = 'black';
      obCanvas.moveTo(this.startX, this.startY);
      obCanvas.lineTo(this.endX, this.endY);
      obCanvas.stroke();

      const value = this.inputValue;
      this.inputHtml.classList.remove('activeEl') ; // убрала рамку
      this.inputValue = undefined;
      this.inputHtml = undefined;


      return value;
    }
  }
}
