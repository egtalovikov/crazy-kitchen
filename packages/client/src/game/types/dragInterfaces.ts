import Painter from '../core/painter'
import { TPoint } from './commonTypes'

export interface Drawable {
  draw(painter: Painter): void
}

export interface Draggable {
  setCoordinates(point: TPoint): void
  revertToSource(source: DragSource, callback: () => void): void
  getTargets(): Hoverable[]
  intersects(target: Hoverable): boolean
}

export interface Hoverable {
  setHover(intersects: boolean, object: Draggable): void
  objectFits(object: Draggable): boolean
  addObject(object: Draggable): void
}

export interface DragSource {
  getDraggable(): Draggable | null
  reset(): void
}
