const INGREDIENTS = ['salad', 'tomato', 'cheese']
const BURGER = 'burger'

// функция отдает нам рандомный ингредиент
const getRandomIngredient = (max: number) => {
  const randomIndex = Math.floor(Math.random() * max)

  return INGREDIENTS[randomIndex]
}

// функция заказа
export const setOrder = () => {
  const order = [BURGER]

  order.push(getRandomIngredient(3))
  return order
}

// функция соответствия данного заказа и собранного
export const compareOrder = (cookedBurger: string[]) => {
  const order = setOrder() //это для примера, сюда будем передавать бургер, c которым пришел клиент

  if (JSON.stringify(order) === JSON.stringify(cookedBurger)) {
    return 'Бургер собран верно'
  } else {
    return 'Упс, кажется вы где-то ошиблись'
  }
}
