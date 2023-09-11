import React, { useRef, useEffect, useState } from 'react'

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Положение котлетки (x, y).
  let pattyX = 100
  let pattyY = 20

  // Положение булочки (x, y).
  const bunX = 150
  const bunY = 450

  // Флаг для отслеживания анимации перемещения котлетки.
  let isAnimating = false

  // Переменная для подсчета бургеров.
  let burgerCount = 0

  // Переменная для отображения времени (в секундах).
  let timeInSeconds = 0

  const [burgerStats, setBurgerStats] = useState({
    burgersCollected: 0,
    timeRemaining: 60, // Изначально 60 секунд (1 минута).
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Функция для рисования котлетки.
    const drawPatty = () => {
      ctx.fillStyle = 'brown' // Цвет котлетки (коричневый).
      ctx.fillRect(pattyX, pattyY, 100, 50) // Рисуем котлетку. Наверное тут лучше не использовать fillRect строгие координаты.

      // Добавляем текст "Котлетка" на котлетку.
      ctx.fillStyle = 'white'
      ctx.font = '12px Arial'
      ctx.fillText('Котлетка', pattyX + 10, pattyY + 25)
    }

    // Функция для рисования бургера.
    const drawBurger = () => {
      ctx.fillStyle = 'yellow' // Цвет булочки (желтый).
      ctx.beginPath()
      ctx.arc(bunX, bunY, 40, 0, 2 * Math.PI) // Рисуем булочку.
      ctx.closePath()
      ctx.fill()

      // Добавляем текст "Булочка" на булочку.
      ctx.fillStyle = 'black'
      ctx.font = '12px Arial'
      ctx.fillText('Булочка', bunX - 20, bunY + 10)
    }

    // Функция для перерисовки игры.
    const drawGame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height) // Очищаем канвас перед каждой перерисовкой.
      drawBurger() // Рисуем бургер.
      drawPatty() // Рисуем котлетку.
    }

    // Вызываем функцию для отображения игровых объектов.
    drawGame()

    // Обработчик клика на канвасе.
    canvas.addEventListener('click', event => {
      if (!isAnimating && !isPattyOnBun) {
        // Если не идет анимация и котлетка не на булочке, проверяем кликнутую точку.
        const clickX = event.clientX - canvas.getBoundingClientRect().left
        const clickY = event.clientY - canvas.getBoundingClientRect().top

        // Проверяем, был ли клик на котлетке.
        if (
          clickX >= pattyX &&
          clickX <= pattyX + 100 &&
          clickY >= pattyY &&
          clickY <= pattyY + 50
        ) {
          isAnimating = true
          animatePatty()
        }
      }
    })

    let isPattyOnBun = false

    const animatePatty = () => {
      // Целевая позиция, куда мы будем перемещать котлетку
      const targetX = bunX - 30
      const targetY = bunY + 20

      // Вычисляем изменение координат по X и Y для плавного перемещения
      const deltaX = (targetX - pattyX) / 20
      const deltaY = (targetY - pattyY) / 20

      // Счетчик кадров анимации
      let frameCount = 0

      // Функция анимации котлетки
      const animationFrame = () => {
        // Если координата X котлетки меньше целевой, двигаем котлетку по X
        if (pattyX < targetX) {
          pattyX += deltaX
        }
        // Если координата Y котлетки меньше целевой, двигаем котлетку по Y
        if (pattyY < targetY) {
          pattyY += deltaY
        }

        drawGame() // Перерисовываем игру после каждого кадра

        // Если координаты котлетки все еще меньше целевых, продолжаем анимацию
        if (pattyX < targetX || pattyY < targetY) {
          requestAnimationFrame(animationFrame)
        } else {
          // Анимация завершена
          isAnimating = false // Сбрасываем флаг анимации
          burgerCount++ // Увеличиваем счетчик бургеров
          setBurgerStats(prevState => ({
            ...prevState,
            burgersCollected: burgerCount,
          }))
          isPattyOnBun = true // Устанавливаем флаг, что котлетка на булочке
          frameCount = 0 // Сбрасываем счетчик кадров
          pattyX = bunX - 30 // Устанавливаем координату X котлетки на исходное положение.
          pattyY = bunY + 20 // Устанавливаем координату Y котлетки на исходное положение.
        }

        frameCount++ // Увеличиваем счетчик кадров
      }
      requestAnimationFrame(animationFrame) // Начинаем анимацию
    }

    // Функция для обновления времени и подсчета бургеров.
    const updateGame = () => {
      // Увеличиваем время на 1 секунду.
      timeInSeconds += 1

      // Если прошла минута (60 секунд), завершаем игру.
      if (timeInSeconds >= 60) {
        alert(
          `Игра окончена! Вы собрали ${burgerStats.burgersCollected} бургеров за минуту.`
        )
        clearInterval(gameInterval)
        return
      }

      // Обновляем оставшееся время в стейте.
      setBurgerStats(prevState => ({
        ...prevState,
        timeRemaining: 60 - timeInSeconds,
      }))
    }

    // Запускаем интервал обновления игры каждую секунду.
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
