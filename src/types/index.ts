export interface Graph {
  text: string,
  parent: string,
  nodes?: Graph[]
}

export interface GraphCell {
  text: string,
  children: string[]
}
