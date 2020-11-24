import { Component, EventEmitter, OnInit, Output, ɵConsole } from '@angular/core';

interface LogicalElement {
  element: string,
  value?: number,
  inputValue_1?: undefined,
  inputValue_2?: undefined,
  outputValue?: undefined,
  htmlEl: string,
}
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})

export class AsideComponent implements OnInit {
  @Output() addElement:EventEmitter<LogicalElement> = new EventEmitter;

  showlayer = {
    InputSignal: false,
    And : false,
    Or : false,
    Not: false,
    MP:false,
    CD:false,
    DC:false,
  }

  constructor() {}
  ngOnInit(): void {
  }

  addInputSignal(event){
    if (event.target.classList.contains('Input0')){
      this.addElement.emit({
        element: 'InputSignal',
        value: 0,
        htmlEl: `<img class="tool" src="./assets/img/0.jpg" alt="Input Signal 0">`,
      });
    }
    if (event.target.classList.contains('Input1')){
      this.addElement.emit({
        element: 'InputSignal',
        value: 1,
        htmlEl: `<img class="tool" src="./assets/img/1.jpg" alt="Input Signal 1">`,
      });
    }
  }
  addTool(event){
    if (event.target.classList.contains("logElAnd")){
      this.addElement.emit({
        element: 'And',
        htmlEl: `  <div class="logEl">
        <img class="tool logElAnd" src="./assets/img/and.jpg" alt="logical element and">
        <p class="inputValue_1"></p>
        <p class="inputValue_2"></p>
        <p class="outputValue"></p>
      </div>`,
      });
    }else if (event.target.classList.contains("logElOr")){
      this.addElement.emit({
        element: 'Or',
        htmlEl: `  <div class="logEl">
        <img class="tool logElOr" src="./assets/img/or.jpg" alt="logical element or">
        <p class="inputValue_1"></p>
        <p class="inputValue_2"></p>
        <p class="outputValue"></p>
      </div>`,
      });
    }else if (event.target.classList.contains("logElNot")){
      this.addElement.emit({
        element: 'Not',
        htmlEl: ` <div class="logEl">
        <img class="tool logElNot" src="./assets/img/not.jpg" alt="logical element not">
        <p class="inputValue_1"></p>
        <p class="outputValue"></p>
      </div>`,
      });
    }else if (event.target.classList.contains("multiplexer")){
      this.addElement.emit({
        element: 'multiplexer',
        htmlEl: ` <div class="logEl multiplexer">
        <img class="tool multiplexer" src="./assets/img/мультиплексор.jpg" alt="multiplexer">
        <p class="inputValue_1"></p>
        <p class="inputValue_2"></p>
        <p class="inputValue_3"></p>
        <p class="inputValue_4"></p>
        <p class="inputValue_5"></p>
        <p class="inputValue_6"></p>
        <p class="outputValue"></p>
      </div>`,
      });
    }else if (event.target.classList.contains("decoder")){
      this.addElement.emit({
        element: 'decoder',
        htmlEl: ` <div class="logEl decoder">
        <img class="tool decoder" src="./assets/img/дешифратор.jpg" alt="decoder">
        <p class="inputValue_1"></p>
        <p class="inputValue_2"></p>
        <p class="outputValue_1 outputValue"></p>
        <p class="outputValue_2 outputValue"></p>
        <p class="outputValue_3 outputValue"></p>
        <p class="outputValue_4 outputValue"></p>
      </div>`,
      });
    }else if (event.target.classList.contains("encoder")){
      this.addElement.emit({
        element: 'encoder',
        htmlEl: ` <div class="logEl encoder">
        <img class="tool encoder" src="./assets/img/шифратор.jpg" alt="encoder">
        <p class="inputValue_1"></p>
        <p class="inputValue_2"></p>
        <p class="inputValue_3"></p>
        <p class="inputValue_4"></p>
        <p class="outputValue_1 outputValue"></p>
        <p class="outputValue_2 outputValue"></p>
      </div>`,
      });
    }
  }



  show(value){
    for (let layer in this.showlayer){
      if (layer === value) this.showlayer[layer] = true;
      else this.showlayer[layer] = false;
    }
  }
}
