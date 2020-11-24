import { Component, ElementRef, ViewChild ,OnInit} from '@angular/core';
import { InputSignalService } from "./services/input-signal.service";
import { LogElOrAndService } from './services/log-el-or-and.service';
import { LogElNotService } from './services/log-el-not.service';
import { MultiplexerService } from "./services/multiplexer.service";
import { DecoderService } from "./services/decoder.service";
import { EncoderService } from "./services/encoder.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'courseworkMainframe';
  @ViewChild("workArea") workArea:ElementRef;
  @ViewChild("canvas", {static: true}) canvas:ElementRef;
  constructor(
    public inputSignalService: InputSignalService,
    public logElOrAndService: LogElOrAndService,
    public logElNotService: LogElNotService,
    public multiplexerService: MultiplexerService,
    public decoderService: DecoderService,
    public encoderService: EncoderService){
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
    switch(event.element){
      case 'InputSignal': this.inputSignalService.addSignal(event, div); break;
      case 'And':  this.logElOrAndService.addElement(div, 'and'); break;
      case 'Or': this.logElOrAndService.addElement(div, 'or'); break;
      case 'Not': this.logElNotService.addElement(div,'not');break;
      case 'multiplexer': this.multiplexerService.addElement(div);break;
      case 'decoder': this.decoderService.addElement(div);break;
      case 'encoder': this.encoderService.addElement(div);break;
    }


  }
}
