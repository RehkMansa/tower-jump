import kaboom from "kaboom";

const HEIGHT = window.innerHeight;
/* const WIDTH = window.innerWidth; */
const MOVE_SPEED = 200;

kaboom({
    debug: true,
    stretch: false,
});

const bgImage = await loadSprite("background", "/assets/gfx/example.png");

const background = add([sprite("background"), scale(1), fixed()]);
background.scaleTo(Math.max(width() / bgImage.tex.width, height() / bgImage.tex.height));

loadSprite("player", "/assets/gfx/player.svg");
loadSprite("floor", "/assets/gfx/floor_0.png");

const player = add([sprite("player"), scale(1), body(), area(), pos(0, 20), "player"]);

keyDown("right", () => {
    player.move(MOVE_SPEED, 0);
});

keyDown("left", () => {
    player.move(-MOVE_SPEED, 0);
});

onKeyPress("up", () => {
    player.jump(MOVE_SPEED * 2);
});

addLevel(["0000000000", "0000000000", "xxxxxxxxxx"], {
    width: 200,
    height: 100,
    x: () => [sprite("floor"), solid(), area(), pos(0, HEIGHT - 250)],
});
