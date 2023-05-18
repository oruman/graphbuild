export interface CustomNode {
  text: string,
  child:  CustomNodeChild[]
}

interface CustomNodeChild {
  tags: string
  goto?: number
}
