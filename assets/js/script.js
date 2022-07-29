import Pacman from '/assets/js/pacman.js';
import Ghost from '/assets/js/ghost.js';
import Game from '/assets/js/game.js';
import Map from '/assets/js/map.js';

const pacman = new Pacman();
const ghosts = [
    new Ghost({
        color: 'red'
    }),
    new Ghost({
        color: 'green'
    }),
    new Ghost({
        color: 'blue'
    }),
    new Ghost({
        color: 'purple'
    })
];
const map = new Map();
const game = new Game({
    selector: '.game',
    pacman,
    ghosts,
    map
});