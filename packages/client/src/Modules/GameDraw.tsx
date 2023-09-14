import React, { Component } from 'react'
import backgroundImage from '../assets/mainBackground.png'

import { drawImages } from '../utils/drawImages'
import saladImage from '../assets/ingredients/salad.png'
import plateImage from '../assets/plate.png'
import burgerBread from '../assets/ingredients/burgerBread.png'
import personImage from '../assets/person.png'
import cutletImage from '../assets/ingredients/cutlet.png'
import cheeseImage from '../assets/ingredients/cheese.png'
import tomato from '../assets/ingredients/tomato.png'

class GameCanvas extends Component {
  public canvasRef: React.RefObject<HTMLCanvasElement>
  public context: CanvasRenderingContext2D | null = null
  public orderImage: string

  public componentX = 0
  public componentY = 0
  public isDragging = false
  public draggedElement: any = null
  //стартовые позиции для определения какой именно ингредиенти тащим, а затем текущие позиции
  public initialPositions = {
    personPosition: { coordinateX: 1000, coordinateY: 450, icon: personImage },
    cheesePosition: { coordinateX: 1225, coordinateY: 500, icon: cheeseImage },
    tomatoPosition: { coordinateX: 1000, coordinateY: 350, icon: tomato },
    // Другие компоненты...
  }

  public canvas: HTMLCanvasElement | null = null

  constructor(props: GameCanvasProps) {
    super(props)
    this.canvasRef = React.createRef()
    this.orderImage = props.orderImage
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current

    if (this.canvas) {
      this.context = this.canvas.getContext('2d')
        ? this.canvas.getContext('2d')
        : null
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    } else {
      return
    }

    //пока вызываю тут, потом нужно будет сделать из gameLoop вызов
    this.draw(this.context)

    this.canvas.addEventListener('mousedown', this.startDragging.bind(this))
    this.canvas.addEventListener('mousemove', this.dragComponent.bind(this))
    this.canvas.addEventListener('mouseup', this.stopDragging.bind(this))
    this.canvas.addEventListener('mouseleave', this.stopDragging.bind(this))

    // Основной игровой цикл
    const gameLoop = () => {
      this.update()
      this.draw(this.context)
      requestAnimationFrame(gameLoop) // Рекурсивный вызов игрового цикла
    }
    //пока вызов его тут закоментила иначе будет видно только белый экран
    //gameLoop();
  }

  componentWillUnmount() {
    if (this.canvas) {
      this.canvas.removeEventListener(
        'mousedown',
        this.startDragging.bind(this)
      )
      this.canvas.removeEventListener(
        'mousemove',
        this.dragComponent.bind(this)
      )
      this.canvas.removeEventListener('mouseup', this.stopDragging.bind(this))
      this.canvas.removeEventListener(
        'mouseleave',
        this.stopDragging.bind(this)
      )
    }
  }

  public startDragging = (event: MouseEvent) => {
    const { clientX, clientY } = event
    if (this.context) {
      //тут по начальным координатам можно определить что перетаскиваем
      this.componentX = clientX
      this.componentY = clientY
      this.isDragging = true
    }
    // Универсальная проверка для всех компонентов
    for (const componentName in this.initialPositions) {
      // @ts-ignore
      const component = this.initialPositions[componentName as string]
      //не знаю какой точно нужен разбег чтобы учесть габариты фигур
      if (
        clientX >= component.coordinateX - 100 &&
        clientX <= component.coordinateX + 100 &&
        clientY >= component.coordinateY - 100 &&
        clientY <= component.coordinateY + 100
      ) {
        this.draggedElement = componentName
      }
    }
  }

  public dragComponent = (event: MouseEvent) => {
    if (this.isDragging && this.context) {
      const { offsetX, offsetY } = event
      const dx = offsetX - this.componentX
      const dy = offsetY - this.componentY
      this.componentX = offsetX
      this.componentY = offsetY
      console.log('dragComponent', this.componentX, this.componentY)
      // Очищаем холст
      if (this.context && this.canvas) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      }
      // Рисуем фон и компонент с новыми координатами
      this.draw(this.context, this.componentX, this.componentY)
    }
  }

  public stopDragging() {
    console.log('stopDragging')
    this.isDragging = false
  }

  //- Метод update предназначен для обновления состояния игры, например,
  // обработки пользовательского ввода или вычисления физики игровых объектов.
  update() {
    console.log('Обновление состояния игры')
  }

  //если сюда пришли координаты, то это перерисовка, если не пришли - первый рендер
  draw(context: CanvasRenderingContext2D | null, X?: number, Y?: number) {
    if (!context) {
      //перебросить на страницу ошибки?
      return
    }
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    const Img = new Image()
    Img.src = backgroundImage
    Img.onload = () => {
      context.drawImage(Img, 0, 0, context.canvas.width, context.canvas.height)
      //определяем по иконке, если здесь в функции иконка от draggedElement - ставим ей X и Y переданные,
      //если нет - ставим координаты из initial
      drawImages({
        ctx: context,
        icon: personImage,
        size: 100,
        coordinateX:
          this.initialPositions[this.draggedElement]?.icon === personImage &&
          X &&
          Y
            ? X
            : this.initialPositions.personPosition.coordinateX,
        coordinateY:
          this.initialPositions[this.draggedElement]?.icon === personImage &&
          X &&
          Y
            ? Y
            : this.initialPositions.personPosition.coordinateY,
      })
      drawImages({
        ctx: context,
        icon: cheeseImage,
        size: 100,
        coordinateX:
          this.initialPositions[this.draggedElement]?.icon === cheeseImage &&
          X &&
          Y
            ? X
            : this.initialPositions.cheesePosition.coordinateX,
        coordinateY:
          this.initialPositions[this.draggedElement]?.icon === cheeseImage &&
          X &&
          Y
            ? Y
            : this.initialPositions.cheesePosition.coordinateY,
      })
      drawImages({
        ctx: context,
        icon: tomato,
        size: 100,
        coordinateX:
          this.initialPositions[this.draggedElement].icon === tomato && X && Y
            ? X
            : this.initialPositions.tomatoPosition.coordinateX,
        coordinateY:
          this.initialPositions[this.draggedElement].icon === tomato && X && Y
            ? Y
            : this.initialPositions.tomatoPosition.coordinateY,
      })
    }
    //ПРОБЛЕМКА
    //когда мы перетащили что-то, а потом хотим перетащить что-либо другое мы должны обновить координаты того,
    //что перетаскивали в initialPositions, чтобы оно осталось на месте и и мы могли дальше передвигать что-то другое,
    // а также обнулить draggedElement
  }

  render() {
    return <canvas ref={this.canvasRef} id="canvas" />
  }
}

export default GameCanvas

export interface GameCanvasProps {
  //написать нужные пропсы сюда id не нужен
  id?: string
  orderImage: string
}
