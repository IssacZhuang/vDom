import vNode, { createDefalutNode, createNode } from './vdom/vnode'
import vDom from './vdom/vdom'

window.addEventListener('load',()=>{
    const test=new vNode('p','hello world');
    const vdom=new vDom('app');

    vdom.render(test);
})