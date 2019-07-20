import vNode from './vnode'

export default class vDom {
    el: HTMLElement

    constructor(id: string) {
        this.el = document.getElementById(id) as HTMLElement;
    }

    render(vNode: vNode) {
        let node = document.createElement(vNode.tag);
        node.textContent = vNode.text;
        this.el.appendChild(node);
    }
}

