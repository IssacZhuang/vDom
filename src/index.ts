import { createNode as e } from './vdom/vnode'
import vDom from './vdom/vdom'

window.addEventListener('load', () => {
    const vdom=new vDom('app');
    const node1 =
        e('p', { class: 'test' }, [
            'title',
            e('div', { class: 'btn primary' }, ['save'])
        ]);

    vdom.render([node1]);

    console.log();
    //console.log(node1.props);
    //vdom.render(test);
})