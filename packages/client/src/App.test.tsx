import App from './App'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { AUTHORIZATION_STATUS } from './utils/consts'

const appContent = 'Вперед'

//@ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  const initialState = {
    authReducer: {
      authorizedStatus: AUTHORIZATION_STATUS.AUTH,
    },
  }

  const mockStore = configureStore()
  const store = mockStore(initialState)

  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  expect(screen.getAllByText(appContent)).toBeDefined()
})
