
export default function(defaultFontSize, defaultScreenWidth) {
  let htmlNode = document.getElementsByTagName('html')[0];

  function resize() {
    let screenWidth = document.body.offsetWidth;
    if(screenWidth <= 700){
      htmlNode.style.fontSize = screenWidth / defaultScreenWidth * defaultFontSize + 'px';
    } else {
      htmlNode.style.fontSize = 700 / defaultScreenWidth * defaultFontSize + 'px';
    }
  }
  document.addEventListener('DOMContentLoaded', function() {
    resize();
  });
  window.addEventListener('resize', resize);
}
