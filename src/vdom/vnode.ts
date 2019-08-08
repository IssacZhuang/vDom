"use strict";

type callback = () => void
type propstype = { [key: string]: string | callback }

export default class vNode {
    tag: string = "div";
    props: propstype;
    children: Array<string | vNode>;
    parent: vNode;

    constructor(
        tag?: string,
        props?: propstype,
        children?: Array<string | vNode>,
    ) {
        this.tag = tag;
        this.props = props;
        this.children = children;
    }

    render(): HTMLElement {
        const elm: HTMLElement = document.createElement(this.tag);
        const props = this.props;

        for (const propKey in props) {
            if (typeof props[propKey] == typeof '') {
                elm.setAttribute(propKey, props[propKey] as string);
                continue;
            }

            switch (propKey) {
                case 'onclick':
                    elm.onclick = props[propKey] as callback;
                    break;
            }
        }

        this.children.forEach(child => {
            const node: HTMLElement | Text = (child instanceof vNode) ? child.render() : document.createTextNode(String(child));
            elm.appendChild(node);
        });

        return elm;
    }
}

export const createNode = (
    tag: string,
    props: propstype = {},
    children: Array<string | vNode> = [],
) => {
    const node = new vNode(tag, props, children);
    return node;
}

export const createEmptyNode = () => {
    return createNode('div');
}
