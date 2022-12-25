/* eslint-disable @typescript-eslint/ban-ts-comment */
import kaboom from "kaboom";

kaboom({
    debug: true,
    stretch: false,
});

// import sprites
loadSprite("player", "/assets/gfx/player.svg");
loadSprite("floor", "/assets/gfx/floor_0.png");
loadSprite("wall", "/assets/gfx/wall.png");

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 300;

const bgImage = await loadSprite("background", "/assets/gfx/example.png");

// @ts-ignore
const centered = origin("center");
// @ts-ignore
const botLeft = origin("botleft");
// const position  = origin("center");

// declare background

// load player files

scene("game", () => {
    const background = add([
        sprite("background"),
        scale(1),
        pos(width() / 2, height() / 2),
        fixed(),
        centered,
    ]);

    background.scaleTo(
        Math.max(width() / bgImage.tex.width, height() / bgImage.tex.height)
    );

    const player = add([
        sprite("player"),
        area(),
        body({ weight: 1.5 }),
        pos(80, 40),
    ]);

    const jump = () => {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
        }
    };

    onKeyPress(["space", "up"], jump);
    onClick(jump);

    add([
        rect(width(), FLOOR_HEIGHT),
        pos(0, height() - FLOOR_HEIGHT),
        outline(4),
        area(),
        solid(),
        color(127, 200, 255),
    ]);

    const spawnTree = () => {
        add([
            rect(48, rand(32, 85)),
            area(),
            outline(4),
            pos(width(), height() - FLOOR_HEIGHT),
            botLeft,
            color(255, 180, 255),
            move(LEFT, SPEED),
            "tree",
        ]);

        wait(rand(0.9, 1.8), spawnTree);
    };

    spawnTree();

    player.onCollide("tree", () => {
        // addKaboom(player.pos);
        shake(3);
        go("lose", Math.floor(score / 10));
    });

    // keep track of score
    let score = 0;
    const scoreLabel = add([
        text(score.toString()),
        pos(width() - 200, 30),
        // origin("topleft"),
    ]);

    // increment score every frame
    onUpdate(() => {
        score = score + 1;

        // debug.log(sczzz);
        scoreLabel.text = Math.floor(score / 10).toString();
    });
});

scene("lose", (score) => {
    const background = add([
        sprite("background"),
        scale(1),
        pos(width() / 2, height() / 2),
        fixed(),
        centered,
    ]);

    background.scaleTo(
        Math.max(width() / bgImage.tex.width, height() / bgImage.tex.height)
    );
    add([sprite("player"), pos(width() / 2, height() / 2 - 80), centered]);

    // display score
    add([text(score), pos(width() / 2, height() / 2 + 20), centered]);

    // go back to game with space is pressed
    onKeyPress(["space", "up"], () => go("game"));
    onClick(() => go("game"));
});

go("game");
