const BURGERS = [
  ['burger', 'beef', 'salad', 'tomato', 'cheese'],
  ['burger', 'salad', 'tomato'],
  ['burger', 'beef', 'salad', 'cheese'],
]

// функция отдает нам рандомный ингредиент
const getRandomIngredient = (max: number) => {
  const randomIndex = Math.floor(Math.random() * max)

  return randomIndex
}

// функция заказа
export const setOrder = () => {
  const indexOrder = getRandomIngredient(3)

  const order = BURGERS[indexOrder]

  return { indexOrder, order }
}

console.log(setOrder())

// функция соответствия данного заказа и собранного
export const compareOrder = (cookedBurger: string[]) => {
  const order = setOrder() //это для примера, сюда будем передавать бургер, c которым пришел клиент

  if (JSON.stringify(order) === JSON.stringify(cookedBurger)) {
    return 'Бургер собран верно'
  } else {
    return 'Упс, кажется вы где-то ошиблись'
  }
}

export const createClient = () => {
  return {
    order: setOrder(),
  }
}
