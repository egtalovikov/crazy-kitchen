import { TPoint } from './commonTypes'
import { Animatable } from '@/game/types/interfaces'

export interface Hoverable {
  isHovered: boolean
  setHover(intersects: boolean, object: Draggable): void
  objectFits(object: Draggable): boolean
  addObject(object: Draggable): void
}

export interface DragSource {
  getDraggable(): Draggable | null
  reset(): void
}

export interface Draggable extends Animatable {
  setCoordinates(point: TPoint): void
  revertToSource(callback: () => void): void
  getTargets(): Hoverable[]
  intersects(target: Hoverable): boolean
}
