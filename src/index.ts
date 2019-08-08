import { createNode as e } from './vdom/vnode'
import vDom from './vdom/vdom'

window.addEventListener('load', () => {
    
    const testFunction = function(){
        console.log(this);
    }

    const vdom = new vDom('app');
    const node1 =
        e('p', { class: 'test' }, [
            'title',
            e('div', { class: 'btn primary', onclick: testFunction }, ['save'])
        ]);

    vdom.render([node1]);
})