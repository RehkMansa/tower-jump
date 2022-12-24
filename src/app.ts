import kaboom from "kaboom";

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
const MOVE_SPEED = 200;

kaboom({
    debug: true,
    width: WIDTH,
    height: HEIGHT,
    stretch: false,
    letterbox: true,
});

loadSprite("player", "/assets/gfx/player.svg");
loadSprite("floor", "/assets/gfx/floor_0.png");

const player = add([sprite("player"), scale(1), body(), area(), pos(0, 20)]);

keyDown("right", () => {
    player.move(MOVE_SPEED, 0);
});

keyDown("left", () => {
    player.move(-MOVE_SPEED, 0);
});

addLevel(["        ", "        ", "xxxxxxxx"], {
    width: MOVE_SPEED,
    height: 80,
    x: () => [sprite("floor"), solid(), area()],
});
