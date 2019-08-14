import vNode from './vnode';

export default class callbackApi {
    private node: vNode;
    constructor(node: vNode) {
        this.node = node;
    }

    addClass(value: string) {
        if (!this.node.props['class']) {
            this.node.props['class'] = value;
            return;
        }

        let classes = (this.node.props['class'] as string).split(' ');

        if (!classes.includes(value)) {
            classes = classes.concat(value);
        }
        
        this.node.props['class'] = classes.join(' ');
    }

    removeClass(value: string) {
        if (!this.node.props['class']) {
            return;
        }

        let classes = (this.node.props['class'] as string).split(' ');
        classes.forEach((item, index) => {
            if (item == value) {
                classes.splice(index, 1);
            }
        });
        this.node.props['class'] = classes.join(' ');
    }

    toggleClass(value: string) {
        if (!this.node.props['class']) {
            return;
        }

        let classes = (this.node.props['class'] as string).split(' ');

        if (classes.includes(value)) {
            this.removeClass(value);
        } else {
            this.addClass(value);
        }
    }

    setText(value: string) {

    }
}