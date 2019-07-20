import vNode, { createNode } from './vnode'

export default class vDom {
    el: HTMLElement;
    root: vNode;

    constructor(id: string) {
        this.el = document.getElementById(id) as HTMLElement;
        this.root = createNode('div', { id: id });
    }

    public render(nodes: Array<string | vNode>) {
        this.root.children = nodes;
        const result = this.root.render();

        this.el.replaceWith(result);
    }

    public update() {

    }
}

