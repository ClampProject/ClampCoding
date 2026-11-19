export default (Blockly, config) => {
    // patch Blockly to fix zooming with the toolbox
    Blockly.VerticalFlyout.prototype.getFlyoutScale = function () {
        return config.zoom.startScale;
    };
    
    const oldGetWidth = Blockly.VerticalFlyout.prototype.getWidth;
    Blockly.VerticalFlyout.prototype.getWidth = function() {
        return Math.min(250, oldGetWidth.call(this));
    }
};