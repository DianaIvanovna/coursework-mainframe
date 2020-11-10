import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {
  constructor() { }

  addMoveListeners(el){
    const workArea = document.querySelector('.workArea');

    // функция перемещения элемента
    const mousemove = function mousemove(event): void{
      el.y = event.pageY - el.startY;
      el.x = event.pageX - el.startX;
      let updateX = el.x;
      let updateY = el.y;
      el.htmlEl.style = `top:${updateY}px;
      left:${updateX}px;
      position:absolute;
      cursor:pointer;`;
    }

    // функция удаления слушателей
    const removeListeners = function removeListeners(event){
      event.target.classList.remove('workArea__el_moving');
      workArea.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', removeListeners);
    }

    // функция начала перемещения и добавление слушателей
    const movingImage = function movingImage (event){
      event.preventDefault();
      event.target.classList.add('workArea__el_moving');

      // начальные координаты
      el.startX = event.pageX - el.x;
      el.startY = event.pageY - el.y;

      // слушатель перемещения
      workArea.addEventListener('mousemove', mousemove, false);

      //при отпускании кнопки мыши удаляются слушатели
      document.addEventListener('mouseup', removeListeners);
    }

    // слушатель при клике на элемент начинается перемещение
    el.htmlEl.addEventListener('mousedown', movingImage);

  }
}
