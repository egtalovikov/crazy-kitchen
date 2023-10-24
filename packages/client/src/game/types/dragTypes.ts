import { TPoint } from './commonTypes'
import { Animatable } from '@gameTypes/interfaces'

export interface Hoverable {
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
  revertToSource(source: DragSource, callback: () => void): void
  getTargets(): Hoverable[]
  intersects(target: Hoverable): boolean
}

export class CurrentDraggingState {
  constructor(
    public source: DragSource,
    public object: Draggable,
    public targets: Hoverable[]
  ) {}
}

export type DraggingState = {
  current: CurrentDraggingState | null
  revertedObjects: Draggable[]
}
