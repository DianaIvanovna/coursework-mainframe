import { Component, ElementRef, ViewChild } from '@angular/core';
import { InputSignalService } from "./services/input-signal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courseworkMainframe';
  @ViewChild("workArea") workArea:ElementRef;

  constructor(
    public inputSignalService: InputSignalService){
    }

  newElement(event){

    // создала и добавила элемент в DOM
    let div = document.createElement('div');
    div.classList.add('workArea__el');
    div.innerHTML = event.htmlEl;
    this.workArea.nativeElement.append(div);

    this.inputSignalService.addSignal(event, div);
  }
}
