"use strict";
import { isFunction, isString } from "util";
import callbackApi from './callbackApi'

type callback = (event?: Event) => void
type propstype = { [key: string]: string | callback }
type node = string | vNode;
type patchOperation = 0 | 1 | 2 | 3;
/*Dom操作类型,用于diff算法
0:更改text(当子节点发生变化且只有文本节点时)
1:重新排序(当子节点发生变化而且有vNode时)
2:更改参数(当参数发生变化时)
3:替换(当tag发生变化时)
*/

export default class vNode {
    tag: string = "div";
    props: propstype;
    children: Array<node>;
    elm: HTMLElement;
    patchs: Array<patchOperation>;

    constructor(
        tag?: string,
        props?: propstype,
        children?: Array<node>,
    ) {
        //为了避免触发patch，直接调用变量本身，而不是setter
        this.tag = tag;
        this.props = props;
        this.children = children;
        this.elm = null;
        this.patchs = [];
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
                const cb=props[propKey] as callback;
                elm.addEventListener(propKey,cb);
            }
        }

        this.children.forEach(child => {
            const node: HTMLElement | Text = (child instanceof vNode) ? child.render() : document.createTextNode(String(child));
            elm.appendChild(node);
        });

        this.elm = elm;
        return elm;
    }

    //返回值如果为false，说明没有替换根节点
    //如果跟节点发生了替换，则会返回渲染好的dom节点给vDom
    patch(old: vNode): HTMLElement | false {
        for (const operation of this.patchs) {
            switch (operation) {
                case 0:

                    break;
                case 1:

                    break;
                case 2:
                    this.patchProps(old.props);
                    break;
                case 3:
                    return this.render();
                    break;
            }
        }
        return false;
    }

    //-------------------此部分的函数会触发patch---------------

    setTag(value: string) {
        if (this.tag == value) {
            return;
        }

        this.tag = value;
        this.setPatchStatus(3);
    }

    setProps(key: string, value: string | callback) {
        if (this.props[key] == value) {
            return;
        }

        this.props[key] = value;
        this.setPatchStatus(2);
    }

    setChildren(values: Array<node>) {
        if (this.children = values) {
            return;
        }

        this.children = values;
        this.setPatchStatus(1);
    }

    setText(value: string) {
        this.children = [value];
        this.setPatchStatus(0);
    }
    //-------------------/此部分的函数会触发patch---------------

    private setPatchStatus(value: patchOperation) {
        if (this.patchs = [3]) {
            return;
        }

        switch (value) {
            case 0:
                if (this.patchs.includes(1) || this.patchs.includes(0)) {
                    return;
                }
                this.patchs = this.patchs.concat(0);
                break;
            case 1:
                if (this.patchs.includes(1)) {
                    return;
                }

                for (const index in this.patchs) {
                    if (this.patchs[index] == 0) {
                        this.patchs[index] = 1;
                        return;
                    }
                }

                this.patchs = this.patchs.concat(1);
                break;
            case 2:
                if (this.patchs.includes(2)) {
                    break;
                }
                this.patchs = this.patchs.concat(2);
                break;
            case 3:
                this.patchs = [3];
                break;
        }
    }

    private patchProps(oldProps: propstype) {
        const newProps = this.props;

        let oldKeys: string[] = [];
        for (const key in oldProps) { oldKeys = oldKeys.concat(key) }
        let newKeys: string[] = [];
        for (const key in newKeys) { newKeys = newKeys.concat(key) }

        //去重合并
        let keyList: string[] = [];
        Object.assign(keyList, oldKeys);
        for (const item of newKeys) {
            if (!keyList.includes(item)) {
                keyList = keyList.concat(item);
            }
        }

        for (const key of keyList) {
            if (isFunction(newProps[key])) {
                continue;
            }

            if (valueExist(newProps[key]) && newProps[key] != oldProps[key]) {
                this.elm.setAttribute(key, newProps[key] as string);
            }

            if (!valueExist(newProps[key]) && valueExist(oldProps[key])) {
                this.elm.removeAttribute(key);
            }
        }
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

export const cloneNode = (source: vNode): vNode => {
    let newNode: vNode = new vNode(source.tag, source.props, []);

    source.children.forEach(child => {
        if (isString(child)) {
            newNode.children = newNode.children.concat(child);
        } else {
            newNode.children = newNode.children.concat(cloneNode(child));
        }
    })

    return newNode;
}

function onlyText(list: Array<node>): boolean {
    for (const item of list) {
        if (!isString(item)) {
            return false;
        }
    }
    return true;
}

function valueExist(value: any) {
    return value != undefined && value != null;
}