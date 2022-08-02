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
        const currentBox = this.space;
        const game = qs('.game');
        const index = Array.from(game.children).indexOf(currentBox);
        if(index < 0 || index >= game.childElementCount) return;
        const [ rows, cols ] = getGridTemplate(game);
        switch(dir) {
            case DIR.UP: {
                if(index-cols < 0) return;
                if(game.children[index-cols].classList.contains('space')) {
                    this.direction = dir;
                    this.targetBox = game.children[index-cols];
                    this.moveToTarget();
                }
                break;
            }
            case DIR.RIGHT: {
                this.el.classList.remove('left');
                if(game.children[index+1].classList.contains('space')) {
                    this.direction = dir;
                    this.targetBox = game.children[index+1];
                    this.moveToTarget();
                }
                break;
            }
            case DIR.DOWN: {
                if(index+cols >= game.childElementCount) return;
                if(game.children[index+cols].classList.contains('space')) {
                    this.direction = dir;
                    this.targetBox = game.children[index+cols];
                    this.moveToTarget();
                }
                break;
            }
            case DIR.LEFT: {
                this.el.classList.add('left');
                if(game.children[index-1].classList.contains('space')) {
                    this.direction = dir;
                    this.targetBox = game.children[index-1];
                    this.moveToTarget();
                }
                break;
            }
        }
    }

    moveToTarget = () => {
        this.el.removeEventListener('transitionend', this.transitionEnd);
        const rect = this.targetBox.getBoundingClientRect();
        this.el.style.left = `${rect.left}px`;
        this.el.style.top = `${rect.top}px`;
        this.el.addEventListener('transitionend', this.transitionEnd);
        this.el.classList.add('moving');
    }

    transitionEnd = (e) => {
        this.el.classList.remove('moving');
        this.space = this.targetBox;
        if(this.space) this.game.eatDot(this.space);
        this.targetBox = null;
        this.moveEl(this.direction);
    }
}

export default Pacman