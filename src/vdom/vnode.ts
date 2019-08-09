"use strict";
import { isFunction, isString } from "util";

type callback = (event?: Event) => void
type propstype = { [key: string]: string | callback }
type node = string | vNode;

export default class vNode {
    tag: string = "div";
    props: propstype;
    children: Array<node>;

    constructor(
        tag?: string,
        props?: propstype,
        children?: Array<node>,
    ) {
        this.tag = tag;
        this.props = props;
        this.children = children;
    }

    render(): HTMLElement {
        const elm: HTMLElement = document.createElement(this.tag);
        const props = this.props;

        for (const propKey in props) {
            if (isString(props[propKey])) {
                elm.setAttribute(propKey, props[propKey] as string);
                continue;
            }

            if (isFunction(props[propKey])) {
                elm.addEventListener(propKey, props[propKey] as callback);
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
    children: Array<node> = [],
): vNode => {
    const node = new vNode(tag, props, children);
    return node;
}

export const createEmptyNode = (): vNode => {
    return createNode('div');
}

export const cloneNode = (source: vNode):vNode => {
    let newNode: vNode = new vNode(source.tag, source.props,[]);

    source.children.forEach(child=>{
        if (isString(child)) {
            newNode.children=newNode.children.concat(child);
        }else{
            newNode.children=newNode.children.concat(cloneNode(child));
        }
    })

    return newNode;
}
