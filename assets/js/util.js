const DIR = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
}
const directions = {
    ArrowUp: DIR.UP,
    ArrowRight: DIR.RIGHT,
    ArrowDown: DIR.DOWN,
    ArrowLeft: DIR.LEFT
}

const qs = (selector, el = document) => { return el.querySelector(selector); }

const qsa = (selector, el = document) => { return el.querySelectorAll(selector) }

const crEl = (tag, options = {}) => {
    const el = document.createElement(tag);
    Object.entries(options).forEach(([key, value]) => {
        if(key == 'class') return el.classList = value;
        if(key == 'dataset') return Object.entries(value).forEach(([dataKey, dataValue]) => {
            el.dataset[dataKey] = dataValue;
        });
        if(key == 'text') return el.textContent = value;
        if(key == 'disabled') return el.disabled = value;
        el.setAttribute(key, value);
    });
    return el;
}

const getRandomNumber = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min; }

const getGridTemplate = (grid) => {
    const gridComputedStyle = window.getComputedStyle(grid);
    const gridRowCount = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
    const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
    return [ gridRowCount, gridColumnCount ];
}

export {
    qs, qsa, crEl, getRandomNumber, getGridTemplate, DIR, directions
}