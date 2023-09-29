import Painter from '../core/painter'

export interface Drawable {
  draw(painter: Painter): void
}

export interface Animatable {
  update(): void
}
