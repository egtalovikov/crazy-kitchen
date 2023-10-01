import { TPoint } from '@/game/types/commonTypes'

class Trajectory {
  public current: TPoint

  private pathLength: number

  constructor(
    private start: TPoint,
    private end: TPoint,
    private startTime: number
  ) {
    this.current = start
    this.pathLength = this.calculatePath()
  }

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

  private calculateCurrentAxisPoint(time: number, delta: number): number {
    const deltaTime = time - this.startTime
    return (delta / this.pathLength) * deltaTime
  }

  private calculateCurrentPoint(time: number): TPoint {
    const currentX = this.calculateCurrentAxisPoint(
      time,
      Math.abs(this.start.x - this.end.x)
    )
    const currentY = this.calculateCurrentAxisPoint(
      time,
      Math.abs(this.start.y - this.end.y)
    )
    return { x: currentX, y: currentY }
  }

  public updateCurrentPoint(time: number) {
    const deltaTime = time - this.startTime

    if (deltaTime > this.pathLength) {
      // stop moving
      console.log('stop moving')
    } else {
      this.current = this.calculateCurrentPoint(time)
    }

    //return this.current
  }

  public getCurrentPoint(time: number): TPoint {
    const deltaTime = time - this.startTime

    if (deltaTime > this.pathLength) {
      // stop moving
      console.log('stop moving')
    } else {
      this.current = this.calculateCurrentPoint(time)
    }

    return this.current
  }
}

export default Trajectory
