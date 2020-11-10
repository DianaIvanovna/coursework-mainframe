import { Component, EventEmitter, OnInit, Output, ɵConsole } from '@angular/core';

interface LogicalElement {
  element: string,
  value: number,
  htmlEl: string,
}
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})

export class AsideComponent implements OnInit {
  @Output() addElement:EventEmitter<LogicalElement> = new EventEmitter;

  showInputSignal = true;

  constructor() {}
  ngOnInit(): void {
  }

  addTool(event){
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

}
