import type {Graph, GraphCell} from "@/types";

export function useGraph(graph: Graph) {
  const table: string[][] = [];
  const all: Record<string, GraphCell> = {};
  const arrows: string[][] = [];
  const divider = "_";

  const transform = (item: Graph, path: number[]) => {
    if (!item.text) {
      return
    }

    const id = path.join(divider);

    if (item.parent && path.length > 1) {
      const numArrow = path.length - 2;
      if (!arrows[numArrow]) {
        arrows[numArrow] = [];
      }
      arrows[numArrow].push(id);
    }

    const newItem: GraphCell = {
      text: item.text,
      children: []
    };

    if (item.nodes && Array.isArray(item.nodes)) {
      item.nodes.forEach((node, i) => {
        if (!node.parent) {
          return;
        }
        newItem.children.push(node.parent);
        transform(node, [...path, i])
      })
    }
    all[id] = newItem;
    const numColumn = path.length - 1;
    if (!table[numColumn]) {
      table[numColumn] = [];
    }
    table[numColumn].push(id);
  }

  transform(graph, [0]);

  return {
    all,
    table,
    arrows
  }
}
