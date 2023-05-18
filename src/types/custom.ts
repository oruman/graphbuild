export interface CustomNode {
  text: string,
  child:  CustomNodeChild[]
}

interface CustomNodeChild {
  tag: string
  goto?: number
}
