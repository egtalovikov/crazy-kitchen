import Painter from '../core/painter'
import { TPoint } from './commonTypes'

export interface Drawable {
  draw(painter: Painter): void
}

export interface Draggable {
  setCoordinates(point: TPoint): void
  revertToSource(): void
  getTargets(): Hoverable[]
  intersects(target: Hoverable): boolean
}

export interface Hoverable {
  setHover(intersects: boolean, objetc: Draggable): void
  objectFits(object: Draggable): boolean
  addObject(object: Draggable): void
}

export interface DragSource {
  getDraggable(): Draggable | null
  reset(): void
}
