export class Text {
  // 글씨가 들어갈 canvas를 생성
  constructor() {
    this.canvas = document.createElement("canvas");
    // this.canvas.style.position = "absolute";
    // this.canvas.style.left = "0";
    // this.canvas.style.top = "0";
    // document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
  }

  /**
   *
   * @param {출력할 글자} str
   * @param {밀도} density
   * @param {너비} stageWidth
   * @param {높이} stageHeight
   * @returns {밀도에 따른 좌표}
   */

  setText(str, density, stageWidth, stageHeight) {
    this.canvas.width = stageWidth;
    this.canvas.height = stageHeight;

    const myText = str;
    const fontWidth = 700;
    const fontSize = 800;
    const fontName = "Hind";

    this.ctx.clearRect(0, 0, stageWidth, stageHeight);
    this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    this.ctx.fillStyle = "rgba(0,0,0,0.3)";
    this.ctx.textBaseline = "middle";
    const fontPost = this.ctx.measureText(myText);
    this.ctx.fillText(
      myText,
      (stageWidth - fontPost.width) / 2,
      fontPost.actualBoundingBoxAscent +
        fontPost.actualBoundingBoxDescent +
        (stageHeight - fontSize) / 2
    );
    return this.dotPos(density, stageWidth, stageHeight);
  }

  /**
   *
   * @param {밀도} density
   * @param {너비} stageWidth
   * @param {높이} stageHeight
   * @returns {밀도에 따른 좌표}
   *
   * 캔버스의 데이터를 getImageData로 얻어 height 값을 점차 내려 가면서 width 값을 반복문으로 반복해
   * 픽셀 값을 조회하고 픽셀 값이 0이 아니면 좌표를 저장하는 배열에 좌표를 저장한다.
   */

  dotPos(density, stageWidth, stageHeight) {
    const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;

    const particles = [];
    let i = 0;
    let width = 0;
    let pixel = 0;

    for (let height = 0; height < stageHeight; height += density) {
      ++i;
      const slide = i % 2 == 0;
      width = 0;
      if (slide == 1) {
        width += 6;
      }

      for (width; width < stageWidth; width += density) {
        pixel = imageData[(width + height * stageWidth) * 4 - 1];
        if (
          pixel != 0 &&
          width > 0 &&
          width < stageWidth &&
          height > 0 &&
          height < stageHeight
        ) {
          particles.push({
            x: width,
            y: height,
          });
        }
      }
    }

    return particles;
  }
}
