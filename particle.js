import { RANDOM_TEXT } from "./visual.js";

const FRICTION = 0.86; // 마찰 계수
const COLOR_SPEED = 0.12; // 색상 변경 속도

export class Particle {
  // x = 입자의 x 위치 y = 입자의 y 위치 vx = 입자의 x 속도 vy = 입자의 y 속도
  constructor(pos) {
    this.savedX = pos.x;
    this.savedY = pos.y;
    this.x = pos.x;
    this.y = pos.y;
    this.vx = 0;
    this.vy = 0;
    this.radius = 10;

    this.textArr = RANDOM_TEXT.split("");
    this.cur = 0;
    this.total = this.textArr.length;

    this.fps = 15;
    this.fpsTime = 1000 / this.fps;

    this.savedRgb = 0x000000;
    this.rgb = 0x000000;
  }

  //  충돌시 실행
  collide() {
    this.rgb = 0xf3316e;
    this.textArr = this.shuffle(this.textArr);
  }

  // 입자를 화면에 그리는 매서드
  draw(ctx, t) {
    this.rgb += (this.savedRgb - this.rgb) * COLOR_SPEED;
    if (!this.time) {
      this.time = t;
    }

    const now = t - this.time;
    if (now > this.fpsTime) {
      this.time = t;
      this.cur += 1;
      if (this.cur == this.total) {
        this.cur = 0;
      }
    }

    this.vx *= FRICTION;
    this.vy *= FRICTION;

    this.x += this.vx;
    this.y += this.vy;

    const red = ((this.rgb >> 16) & 0xff) | 0;
    const green = ((this.rgb >> 8) & 0xff) | 0;
    const blue = (this.rgb & 0xff) | 0;
    const color = `rgb(${red},${green},${blue})`;

    const str = this.textArr[this.cur];
    ctx.beginPath();
    ctx.fillStyle = color;
    const fontWeight = 700;
    const fontSize = 14;
    const fontName = "Hind";
    ctx.font = `${fontWeight} ${fontSize}px ${fontName}`;
    ctx.textBaseline = "middle";
    const textPos = ctx.measureText(str);
    ctx.fillText(
      str,
      this.x - textPos.width / 2,
      this.y + (fontSize - textPos.actualBoundingBoxAscent) / 2
    );
  }

  // 배열을 무작위로 섞는 매서드 arr = visual의 RANDOM_TEXT
  shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
}
