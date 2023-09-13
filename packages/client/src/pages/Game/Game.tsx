import React, { useRef, useEffect, useState } from 'react'

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const cheeseImage = new Image()
  cheeseImage.src = 'путь_к_изображению_сыра'
  const tomatoImage = new Image()
  tomatoImage.src = 'путь_к_изображению_помидора'
  const pattyImage = new Image()
  pattyImage.src = 'путь_к_изображению_котлетки'

  // Положение котлетки (x, y).
  let pattyX = 100
  let pattyY = 20

  // Положение булочки (x, y).
  const bunX = 150
  const bunY = 450

  // Положение сыра (x, y).
  let cheeseX = 250
  let cheeseY = 200
  let isCheeseDragging = false
  let isCheeseOnBun = false

  // Положение помидорки (x, y).
  let tomatoX = 350
  let tomatoY = 200
  let isTomatoDragging = false
  let isTomatoOnBun = false

  // Переменные для отслеживания перетаскивания котлетки.
  let isPattyDragging = false
  let initialPattyX = 0
  let initialPattyY = 0
  let isPattyOnBun = false

  // Флаг для отслеживания анимации перемещения котлетки.
  let isAnimating = false

  // Переменная для подсчета бургеров.
  let burgerCount = 0

  // Переменная для отображения времени (в секундах).
  let timeInSeconds = 0

  const [burgerStats, setBurgerStats] = useState({
    burgersCollected: 0,
    timeRemaining: 60,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Функция для рисования котлетки.
    const drawPatty = () => {
      ctx.fillStyle = 'brown' // Цвет котлетки (коричневый).
      ctx.beginPath()
      ctx.arc(pattyX + 50, pattyY + 25, 25, 0, Math.PI * 2) // Рисуем круглую котлетку.
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = 'white'
      ctx.font = '14px Arial'
      ctx.fillText('Котлетка', pattyX + 20, pattyY + 30)
    }

    // Функция для рисования бургера.
    const drawBurger = () => {
      ctx.fillStyle = 'yellow' // Цвет булочки (желтый).
      ctx.beginPath()
      ctx.arc(bunX, bunY, 40, 0, 2 * Math.PI) // Рисуем булочку.
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = 'black'
      ctx.font = '12px Arial'
      ctx.fillText('Булочка', bunX - 20, bunY + 10)
    }

    // Функция для рисования сыра.
    const drawCheese = () => {
      ctx.fillStyle = 'orange' // Цвет сыра (оранжевый).
      ctx.fillRect(cheeseX, cheeseY, 40, 40) // Рисуем сыр.
      ctx.fillStyle = 'white'
      ctx.font = '14px Arial'
      ctx.fillText('Сыр', cheeseX + 5, cheeseY + 20)
    }

    // Функция для рисования помидорки.
    const drawTomato = () => {
      ctx.fillStyle = 'red' // Цвет помидорки (красный).
      ctx.beginPath()
      ctx.arc(tomatoX + 20, tomatoY + 20, 20, 0, Math.PI * 2) // Рисуем круглую помидорку.
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = 'white'
      ctx.font = '14px Arial'
      ctx.fillText('Помидорка', tomatoX - 25, tomatoY + 25)
    }

    // Функция для перерисовки игры.
    const drawGame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawBurger()
      drawPatty()
      drawCheese()
      drawTomato()

      // Рисуем ингредиенты на булочке, если они находятся на ней.
      if (isCheeseOnBun) {
        ctx.drawImage(cheeseImage, bunX - 20, bunY - 20, 40, 40)
      }
      if (isTomatoOnBun) {
        ctx.drawImage(tomatoImage, bunX - 20, bunY - 20, 40, 40)
      }
      if (isPattyOnBun) {
        ctx.drawImage(pattyImage, bunX - 30, bunY + 20, 60, 30)
      }
    }

    // Вызываем функцию для отображения игровых объектов.
    drawGame()

    // Обработчик начала перетаскивания сыра.
    canvas.addEventListener('mousedown', event => {
      const clickX = event.clientX - canvas.getBoundingClientRect().left
      const clickY = event.clientY - canvas.getBoundingClientRect().top

      if (
        clickX >= cheeseX &&
        clickX <= cheeseX + 40 &&
        clickY >= cheeseY &&
        clickY <= cheeseY + 40
      ) {
        isCheeseDragging = true
      }
    })

    // Обработчик начала перетаскивания помидорки.
    canvas.addEventListener('mousedown', event => {
      const clickX = event.clientX - canvas.getBoundingClientRect().left
      const clickY = event.clientY - canvas.getBoundingClientRect().top

      if (
        clickX >= tomatoX &&
        clickX <= tomatoX + 40 &&
        clickY >= tomatoY &&
        clickY <= tomatoY + 40
      ) {
        isTomatoDragging = true
      }
    })

    // Обработчик начала перетаскивания котлетки.
    canvas.addEventListener('mousedown', event => {
      const clickX = event.clientX - canvas.getBoundingClientRect().left
      const clickY = event.clientY - canvas.getBoundingClientRect().top

      if (
        clickX >= pattyX &&
        clickX <= pattyX + 100 &&
        clickY >= pattyY &&
        clickY <= pattyY + 50
      ) {
        isPattyDragging = true
        initialPattyX = pattyX
        initialPattyY = pattyY
      }
    })

    // Обработчик перемещения мыши.
    canvas.addEventListener('mousemove', event => {
      if (isCheeseDragging) {
        cheeseX = event.clientX - canvas.getBoundingClientRect().left - 20
        cheeseY = event.clientY - canvas.getBoundingClientRect().top - 20
        drawGame()
      }

      if (isTomatoDragging) {
        tomatoX = event.clientX - canvas.getBoundingClientRect().left - 20
        tomatoY = event.clientY - canvas.getBoundingClientRect().top - 20
        drawGame()
      }

      if (isPattyDragging) {
        pattyX = event.clientX - canvas.getBoundingClientRect().left - 50
        pattyY = event.clientY - canvas.getBoundingClientRect().top - 25
        drawGame()
      }
    })

    // Обработчик завершения перетаскивания.
    canvas.addEventListener('mouseup', () => {
      if (isCheeseDragging) {
        if (
          Math.abs(cheeseX + 20 - bunX) <= 20 &&
          Math.abs(cheeseY + 20 - bunY) <= 20
        ) {
          isCheeseOnBun = true
          cheeseX = bunX - 20
          cheeseY = bunY - 20
        }
        isCheeseDragging = false
      }

      if (isTomatoDragging) {
        if (
          Math.abs(tomatoX + 20 - bunX) <= 20 &&
          Math.abs(tomatoY + 20 - bunY) <= 20
        ) {
          isTomatoOnBun = true
          tomatoX = bunX - 20
          tomatoY = bunY - 20
        }
        isTomatoDragging = false
      }

      if (isPattyDragging) {
        if (
          Math.abs(pattyX + 50 - bunX) <= 30 &&
          Math.abs(pattyY + 25 - bunY) <= 30
        ) {
          isPattyOnBun = true
          pattyX = bunX - 30
          pattyY = bunY + 20
        }
        isPattyDragging = false
      }

      if (isCheeseOnBun && isTomatoOnBun && isPattyOnBun) {
        burgerCount++
        setBurgerStats(prevState => ({
          ...prevState,
          burgersCollected: burgerCount,
        }))
        cheeseX = 250
        cheeseY = 200
        tomatoX = 350
        tomatoY = 200
        pattyX = 100
        pattyY = 20
        isCheeseOnBun = false
        isTomatoOnBun = false
        isPattyOnBun = false
      }

      drawGame()
    })

    // Функция для анимации перемещения котлетки на булочку.
    const animatePatty = () => {
      const targetX = bunX - 30
      const targetY = bunY + 20
      const deltaX = (targetX - pattyX) / 20
      const deltaY = (targetY - pattyY) / 20
      let frameCount = 0

      const animationFrame = () => {
        if (pattyX < targetX) {
          pattyX += deltaX
        }
        if (pattyY < targetY) {
          pattyY += deltaY
        }

        drawGame()

        if (pattyX < targetX || pattyY < targetY) {
          requestAnimationFrame(animationFrame)
        } else {
          isAnimating = false
          frameCount = 0
          pattyX = bunX - 30
          pattyY = bunY + 20
        }

        frameCount++
      }
      requestAnimationFrame(animationFrame)
    }

    // Функция для обновления игры (таймер).
    const updateGame = () => {
      timeInSeconds += 1

      if (timeInSeconds >= 60) {
        alert(`Игра окончена!`)
        clearInterval(gameInterval)
        return
      }

      setBurgerStats(prevState => ({
        ...prevState,
        timeRemaining: 60 - timeInSeconds,
      }))
    }

    const gameInterval = setInterval(updateGame, 1000)
  }, [])

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600}></canvas>
      <div className="stats">
        <p>Время: {burgerStats.timeRemaining} сек.</p>
        <p>Собрано бургеров: {burgerStats.burgersCollected}</p>
      </div>
    </div>
  )
}

export default Game
