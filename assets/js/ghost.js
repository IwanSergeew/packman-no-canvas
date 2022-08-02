import { qs, crEl, DIR, getRandomNumber, getGridTemplate } from '/assets/js/util.js';

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
        this.direction = null;
    }

    startMoving = () => {
        this.el.classList.add('moving');
        const turnDirections = this.getTurnDirections();
        if(!turnDirections.length) return console.error('No direction found to move.');
        this.moveEl(turnDirections[getRandomNumber(0, turnDirections.length-1)]);
    }

    getTurnDirections = () => {
        const arrTurnDir = new Array();
        const index = Array.from(this.game.el.children).indexOf(this.space);
        if(index < 0 || index >= this.game.el.childElementCount) return [];
        const [ rows, cols ] = getGridTemplate(this.game.el);
        if(index-cols >= 0 && this.game.el.children[index-cols].classList.contains('space')) arrTurnDir.push(DIR.UP);
        if(index+cols < this.game.el.childElementCount && this.game.el.children[index+cols].classList.contains('space')) arrTurnDir.push(DIR.DOWN);
        if(index-1 >= 0 && this.game.el.children[index-1].classList.contains('space')) arrTurnDir.push(DIR.LEFT);
        if(index+1 < this.game.el.childElementCount && this.game.el.children[index+1].classList.contains('space')) arrTurnDir.push(DIR.RIGHT);
        return arrTurnDir;
    }

    moveEl = (dir) => {
        // console.log(this.el);
        // console.log(dir);
        const index = Array.from(this.game.el.children).indexOf(this.space);
        const [ rows, cols ] = getGridTemplate(this.game.el);
        this.direction = dir;
        switch(dir) {
            case DIR.UP: {
                this.targetBox = this.game.el.children[index-cols];
                break;
            }
            case DIR.RIGHT: {
                this.targetBox = this.game.el.children[index+1];
                break;
            }
            case DIR.DOWN: {
                this.targetBox = this.game.el.children[index+cols];
                break;
            }
            case DIR.LEFT: {
                this.targetBox = this.game.el.children[index-1];
                break;
            }
        }
        this.moveToTarget();
    }

    moveToTarget = () => {
        this.el.removeEventListener('transitionend', this.transitionEnd);
        const rect = this.targetBox.getBoundingClientRect();
        this.el.style.left = `${rect.left}px`;
        this.el.style.top = `${rect.top}px`;
        this.el.addEventListener('transitionend', this.transitionEnd);
    }

    transitionEnd = (e) => {
        console.log(Array.from(this.el.classList).join('').replace('ghost','').replace('moving',''));
        this.space = this.targetBox;
        this.targetBox = null;
        const turnDirections = this.getTurnDirections();
        if(!turnDirections.length) return console.error('No direction found to move.');
        if(!getRandomNumber(0, 5) || !turnDirections.includes(this.direction)) {
            const moveto = turnDirections[getRandomNumber(0, turnDirections.length-1)];
            console.log(`moveto: ` + moveto);
            this.moveEl(moveto);
        }
        else {
            console.log(`this.directiton: ` + this.direction);
            this.moveEl(this.direction);
        }
    }
}

export default Ghost