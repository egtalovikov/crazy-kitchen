import personImage from '@assets/person.png'
import { Clients, TClientParameter } from '../types/clients'

const clientsParameters: Record<Clients, TClientParameter> = {
  [Clients.Client1]: {
    width: 100,
    height: 100,
    imageSrc: personImage,
    frameWidth: 100,
  },
  [Clients.Client2]: {
    width: 100,
    height: 100,
    imageSrc: personImage,
    frameWidth: 100,
  },
}

export default clientsParameters
