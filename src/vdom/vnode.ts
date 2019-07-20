export default class vNode {
    tag: string = "div";
    text: string;
    elm: Node | void;
    children: vNode[];
    parent: vNode | void;

    constructor(
        tag?: string,
        text?: string,
        elm?: Node,
        children?: vNode[],
        parent?: vNode
    ) {
        this.tag = tag;
        this.text = text;
        this.elm = elm;
        this.children = children;
        this.parent = parent;
    }
}

export const createDefalutNode = (text: string = "") => {
    const node = new vNode('div', text);
    return node;
}

export const createNode = (tag: string, text: string = "") => {

}
