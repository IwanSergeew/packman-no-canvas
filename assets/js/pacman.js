import { qs, crEl, DIR, getGridTemplate } from '/assets/js/util.js';

class Pacman {
    constructor() {
        this.el = crEl('div', {
            class: 'pacman'
        });
        this.el.append(
            crEl('div', {
                class: 'pacman_eye'
            }),
            crEl('div', {
                class: 'pacman_mouth'
            })
        );
        this.direction = null;
    }

    moveEl = (dir) => {
        if(this.direction == dir) return;
        const [ rows, cols ] = getGridTemplate(qs('.game'));
        switch(dir) {
            case DIR.UP: {
                this.targetBox = 0;
                break;
            }
            case DIR.RIGHT: {
                
                break;
            }
            case DIR.DOWN: {
                
                break;
            }
            case DIR.LEFT: {
                
                break;
            }
        }
    }
}

export default Pacman