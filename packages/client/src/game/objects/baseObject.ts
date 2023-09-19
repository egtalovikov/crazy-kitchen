import BaseState from '../store/baseState'

class BaseObject {
  public width: number
  public height: number
  public image = new Image()
  public state: BaseState
  public frameIndex = 0

  constructor(
    imageSrc: string,
    width: number,
    height: number,
    state: BaseState
  ) {
    this.width = width
    this.height = height
    this.image.src = imageSrc
    this.state = state
  }
}

export default BaseObject
