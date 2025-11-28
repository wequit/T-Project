export enum ProsthesisSide {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export const prosthesisSides = Object.values(ProsthesisSide)

export const prosthesisSideOptions = [
  { label: 'Левый', value: ProsthesisSide.LEFT },
  { label: 'Правый', value: ProsthesisSide.RIGHT },
]
