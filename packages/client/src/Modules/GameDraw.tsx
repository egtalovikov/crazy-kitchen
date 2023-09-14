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

  constructor(orderImage: string) {
    super(orderImage)
    this.canvasRef = React.createRef()
    this.orderImage = orderImage
  }

  componentDidMount() {
    const canvas = this.canvasRef.current

    if (canvas) {
      this.context = canvas.getContext('2d') ? canvas.getContext('2d') : null
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    } else {
      return
    }

    //пока вызываю тут, потом нужно будет сделать из gameLoop вызов
    this.draw(this.context)

    // Основной игровой цикл
    const gameLoop = () => {
      this.update()
      this.draw(this.context)
      requestAnimationFrame(gameLoop) // Рекурсивный вызов игрового цикла
    }
    //пока вызов его тут закоментила иначе будет видно только белый экран
    //gameLoop();
  }

  //чтобы определить размер экрана и задать холсту размер

  //- Метод update предназначен для обновления состояния игры, например,
  // обработки пользовательского ввода или вычисления физики игровых объектов.
  update() {
    console.log('Обновление состояния игры')
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      //перебросить на страницу ошибки?
      return
    }
    // Отрисовка игровых объектов
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    const Img = new Image()
    Img.src = backgroundImage
    Img.onload = () => {
      //задавать им координаты, размеры в какой момент?
      //пока вот так
      context.drawImage(Img, 0, 0, context.canvas.width, context.canvas.height)

      drawImages({
        ctx: context,
        icon: personImage,
        size: 200,
        coordinateX: 700,
        coordinateY: 250,
      })

      drawImages({
        ctx: context,
        icon: this.orderImage,
        size: 100,
        coordinateX: 670,
        coordinateY: 280,
      })

      drawImages({
        ctx: context,
        icon: cheeseImage,
        size: 100,
        coordinateX: 1225,
        coordinateY: 500,
      })

      drawImages({
        ctx: context,
        icon: plateImage,
        size: 200,
        coordinateX: 700,
        coordinateY: 700,
      })

      drawImages({
        ctx: context,
        icon: saladImage,
        size: 100,
        coordinateX: 1225,
        coordinateY: 600,
      })

      drawImages({
        ctx: context,
        icon: tomato,
        size: 150,
        coordinateX: 1000,
        coordinateY: 450,
      })

      drawImages({
        ctx: context,
        icon: burgerBread,
        size: 200,
        coordinateX: 700,
        coordinateY: 700,
      })

      drawImages({
        ctx: context,
        icon: cutletImage,
        size: 100,
        coordinateX: 1050,
        coordinateY: 620,
      })
    }
  }

  render() {
    return <canvas ref={this.canvasRef} />
  }
}

export default GameCanvas

export interface GameCanvasProps {
  //написать нужные пропсы сюда id не нужен
  id?: string
  orderImage: string
}
