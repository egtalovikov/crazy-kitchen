import personImage from '@assets/person.png'
import { Clients, TClientParameter } from '../types/clients'

const clientsParameters: Record<Clients, TClientParameter> = {
  [Clients.Client1]: {
    width: 200,
    height: 200,
    imageSrc: personImage,
    frameWidth: 200,
  },
  [Clients.Client2]: {
    width: 200,
    height: 200,
    imageSrc: personImage,
    frameWidth: 200,
  },
}

export default clientsParameters
