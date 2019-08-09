import vNode, { createNode, cloneNode } from './vnode'

export default class vDom {
    elm: HTMLElement;
    tree: vNode;
    oldTree:vNode;

    constructor(id: string) {
        this.elm = document.getElementById(id) as HTMLElement;
        this.tree = createNode('div', { id: id});
    }

    public render(nodes: Array<string | vNode>) {
        this.tree.children = nodes;
        this.oldTree=cloneNode(this.tree);

        const result = this.tree.render();

        this.elm.replaceWith(result);
        this.elm = result;
    }

    public update() {

    }
}

