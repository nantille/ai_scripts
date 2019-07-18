
// Function copied from allPoints.jsx
// https://github.com/johnwun/js4ai
function drawLine(anchor1,anchor2) 
{
    //draw a single line from point a to point b
    var linePath = shapeGroup.pathItems.add();
    var offset=0; // [anchor1[0]-offset,anchor1[1]-offset]
    linePath.setEntirePath(Array(anchor1,anchor2));
    linePath.closed = false;
    linePath.stroked = true;
    linePath.filled = false;
    linePath.strokeWidth = 1;
    return linePath;
}

function scaleStrokes(selection, factor)
{
    var i = 0;
    var obj, path;
    for (i = 0; i < selection.length; i++)
    {
        obj = selection[i];
        if (obj.typename == "GroupItem") 
        {
            scaleStrokes(obj.pageItems, factor);
        } 
        else if(obj.typename == "CompoundPathItem") 
        {
            path = obj.pathItems[0];
            path.strokeWidth *= factor;
        } 
        else if(obj.typename == "PathItem") 
        {
            if (obj.stroked == true) 
            {
                obj.strokeWidth *= factor;
            }
        }
    }
}

scaleFactor = prompt("Scale stroke factor", 1.0, "Rescale strokes");
if(scaleFactor != null)
{
    scaleStrokes(activeDocument.selection, parseFloat(scaleFactor));
}