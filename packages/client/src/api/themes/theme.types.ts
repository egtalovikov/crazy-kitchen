export type TThemeData = {
  name: string
  description: string
}

export type TThemeListData = {
  Themes: TThemeData[]
}

export type TChangeThemeRequestData = {
  themeName: string
  userId: number | null
}
