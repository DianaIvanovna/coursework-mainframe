import { Component, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { InputSignalService } from "./services/input-signal.service";
import { LogElAndService } from './services/log-el-and.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'courseworkMainframe';
  @ViewChild("workArea") workArea:ElementRef;
  @ViewChild("canvas", {static: true}) canvas:ElementRef;
  x;
  y;

  constructor(
    public logElAndService: LogElAndService,
    public inputSignalService: InputSignalService){
    }
  ngOnInit(): void {
    //подгоняем canvas под правильный масштаб
    if (this.canvas.nativeElement.width  != this.canvas.nativeElement.clientWidth ||
      this.canvas.nativeElement.height != this.canvas.nativeElement.clientHeight){
        this.canvas.nativeElement.width  = this.canvas.nativeElement.clientWidth;
        this.canvas.nativeElement.height = this.canvas.nativeElement.clientHeight;
      }
  }

  newElement(event){
    // создала и добавила элемент в DOM
    let div = document.createElement('div');
    div.classList.add('workArea__el');
    div.innerHTML = event.htmlEl;
    this.workArea.nativeElement.append(div);

    if (event.element === 'InputSignal'){
      this.inputSignalService.addSignal(event, div);
    }
    if (event.element === 'And'){
      //&&&
      this.logElAndService.addAnd(div);
    }


  }
}
