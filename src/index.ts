import vNode, { createNode as e } from './vdom/vnode'
import vDom from './vdom/vdom'

window.addEventListener('load', () => {
    const testFunction = function (node: any, e: Event) {
        console.log(node);
        node.toggleClass('wide');
    }

    const vdom = new vDom('app');
    const node1 =
        e('p', { class: 'test' }, [
            'title',
            e('div', { class: 'btn primary', click: testFunction }, ['yes'])
        ]);

    vdom.render([node1]);
})