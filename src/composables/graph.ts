import type { CustomNode } from "@/types/custom";

export function useGraph(graph: CustomNode[]) {
  const table: number[][] = [];
  const arrows: number[][][] = [];

  const transform = (num: number, path: number[]) => {
    if (!graph[num]) {
      return false;
    }
    const item = graph[num];
    const newPath = [...path, num];

    const numColumn = path.length;
    if (!table[numColumn]) {
      table[numColumn] = [];
    }
    table[numColumn].push(num);

    if (item.child && Array.isArray(item.child)) {
      item.child.forEach((child, i) => {
        if (!child.goto || path.includes(child.goto) || !transform(child.goto, newPath)) {
          return
        }
        if (!arrows[numColumn]) {
          arrows[numColumn] = [];
        }
        arrows[numColumn].push([table[numColumn].length - 1, i, table[numColumn + 1].length - 1]);
      })
    }

    return true;
  }

  transform(0, []);

  return {
    table,
    arrows
  }
}
