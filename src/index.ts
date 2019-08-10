import vNode, { createNode as e } from './vdom/vnode'
import vDom from './vdom/vdom'

window.addEventListener('load', () => {

    type test = {
        a: string
        b?: test
    }

    const testFunction = function (node: vNode, e: Event) {
        console.log(node);
        console.log(e);
        console.log(this);
    }

    const vdom = new vDom('app');
    const node1 =
        e('p', { class: 'test' }, [
            'title',
            e('div', { class: 'btn primary', click: testFunction }, ['save'])
        ]);

    vdom.render([node1]);
})