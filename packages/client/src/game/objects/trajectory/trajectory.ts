import { TPoint } from '@gameTypes/commonTypes'

// TODO: fix speed
// const ANIMATION_SPEED = 2

class Trajectory {
  public current: TPoint

  private pathLength: number

  private pathEnded = false

  constructor(
    private start: TPoint,
    private end: TPoint,
    private startTime: number,
    public movingEndFn: () => void
  ) {
    this.current = start
    this.pathLength = this.calculatePath()
  }

  private getDeltaTime = (time: number) => time - this.startTime

  private calculatePath(): number {
    const deltaX = Math.abs(this.start.x - this.end.x)
    const deltaY = Math.abs(this.start.y - this.end.y)
    if (this.start.x === this.end.x) {
      return deltaY
    } else if (this.start.y === this.end.y) {
      return deltaX
    } else {
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    }
  }

  private calculateCurrentAxisPoint(
    time: number,
    delta: number,
    isDeltaPositive: boolean
  ): number {
    const deltaTime = this.getDeltaTime(time)
    const deltaCoordinate = (delta / this.pathLength) * deltaTime
    return isDeltaPositive ? deltaCoordinate : -deltaCoordinate
  }

  private calculateCurrentPoint(time: number): TPoint {
    const currentX =
      this.start.x +
      this.calculateCurrentAxisPoint(
        time,
        Math.abs(this.start.x - this.end.x),
        this.end.x > this.start.x
      )
    const currentY =
      this.start.y +
      this.calculateCurrentAxisPoint(
        time,
        Math.abs(this.start.y - this.end.y),
        this.end.y > this.start.y
      )
    return { x: currentX, y: currentY }
  }

  // TODO: rename, try to update object coordinates with the same ref
  public getCurrentPoint(time: number): TPoint {
    const deltaTime = this.getDeltaTime(time)

    if (deltaTime > this.pathLength) {
      this.pathEnded = true
    } else {
      this.current = this.calculateCurrentPoint(time)
    }

    return this.current
  }

  public isPathEnded = () => this.pathEnded
}

export default Trajectory
