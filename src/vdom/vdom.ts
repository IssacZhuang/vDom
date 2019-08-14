import vNode, { createNode, cloneNode } from './vnode'

type method = () => void;

export default class vDom {
    elm: HTMLElement;
    tree: vNode;
    oldTree: vNode;//只用于vDom比对，不用于Dom操作

    constructor(id: string) {
        this.elm = document.getElementById(id) as HTMLElement;
        this.tree = createNode('div', { id: id });
    }

    public render(nodes: Array<string | vNode>) {
        this.tree.children = nodes;
        this.oldTree = cloneNode(this.tree);

        const result = this.tree.render();

        this.elm.replaceWith(result);
        this.elm = result;
    }

    public update() {

    }

    patch(oldTree: vNode, newTree: vNode) {
        newTree.patch(oldTree);
    }
}

