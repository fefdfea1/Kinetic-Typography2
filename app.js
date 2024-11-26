import { Visual } from "./visual.js";
class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.clearBtn = document.querySelector(".clear");
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    WebFont.load({
      google: {
        families: ["Hind:700"],
      },
      // 폰트 로드 완료시 setText를 실행하여 텍스트 그리기
      fontactive: () => {
        this.visual = new Visual();

        window.addEventListener("resize", this.resize.bind(this), false);
        this.clearBtn.addEventListener("click", this.resize.bind(this));
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
      },
    });
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.visual.show(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.visual.animate(this.ctx, t);
  }
}

window.onload = () => {
  new App();
};
