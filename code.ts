figma.showUI(__html__);

figma.ui.resize(300, 300);

let xPosition = 0;

figma.currentPage.children.forEach(node => {
  if (node.type === 'FRAME') {
    const nodeX = node.x + node.width;
    if (nodeX > xPosition) {
      xPosition = nodeX;
    }
  }
});

figma.ui.onmessage = msg => {
  if (msg.type === 'create-frame') {
    const frame = figma.createFrame();
    frame.name = msg.name;
    frame.resize(msg.width, msg.height);

    frame.x = xPosition + 100;
    xPosition += frame.width + 100;

    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView([frame]);
  }
  figma.closePlugin();
};
