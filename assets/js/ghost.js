import { crEl } from '/assets/js/util.js';

class Ghost {
    constructor({
        color = 'red'
    }) {
        this.el = crEl('div', {
            class: `ghost ${color}`
        });
        this.el.append(
            crEl('div', {
                class: 'ghost_left_eye'
            }),
            crEl('div', {
                class: 'ghost_right_eye'
            })
        );
    }
}

export default Ghost