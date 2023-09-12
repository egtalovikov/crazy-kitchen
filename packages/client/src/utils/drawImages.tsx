export function drawImages(parameters: drawImg) {
  const { ctx, icon, size, coordinateX, coordinateY } = parameters
  if (!ctx) {
    return
  }
  const Img = new Image()
  Img.src = icon
  Img.onload = () => {
    ctx.drawImage(Img, coordinateX, coordinateY, size, size)
  }
}

export interface drawImg {
  ctx: CanvasRenderingContext2D | null
  icon: string
  size: number
  coordinateX: number
  coordinateY: number
}
