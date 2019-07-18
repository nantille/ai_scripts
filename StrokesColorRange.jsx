function strokesColorRange(selection, colorA, colorB, random)
{
    var i = 0;
    var obj, path;
    var redStep = (colorB.red - colorA.red) / selection.length;
    var greenStep = (colorB.blue - colorA.blue) / selection.length;
    var blueStep = (colorB.blue - colorA.green) / selection.length;
    // Ignore first two reference objects
    for (i = 0; i < selection.length; i++)
    {
        obj = selection[i];
        if (obj.typename == "GroupItem") 
        {
            strokesColorRange(obj.pageItems, colorA, colorB, random);
        } 
        else if(obj.typename == "CompoundPathItem") 
        {
            path = obj.pathItems[0];
            if (random == 1)
            {
                path.strokeColor.red = Math.min(Math.max(Math.random() * (colorB.red - colorA.red) + colorA.red, 0), 255);
                path.strokeColor.blue = Math.min(Math.max(Math.random() * (colorB.blue - colorA.blue) + colorA.blue, 0), 255);
                path.strokeColor.green = Math.min(Math.max(Math.random() * (colorB.green - colorA.green) + colorA.green, 0), 255);
            }
            else
            {
                path.strokeColor.red = Math.min(Math.max(colorA.red + i * redStep, 0), 255);
                path.strokeColor.blue = Math.min(Math.max(colorA.blue + i * blueStep, 0), 255);
                path.strokeColor.green = Math.min(Math.max(colorA.green + i * greenStep, 0), 255);
            }
        } 
        else if(obj.typename == "PathItem") 
        {
            if (obj.stroked == true) 
            {
                if (random == 1)
                {
                    obj.strokeColor.red = Math.min(Math.max(Math.random() * (colorB.red - colorA.red) + colorA.red, 0), 255);
                    obj.strokeColor.blue = Math.min(Math.max(Math.random() * (colorB.blue - colorA.blue) + colorA.blue, 0), 255);
                    obj.strokeColor.green = Math.min(Math.max(Math.random() * (colorB.green - colorA.green) + colorA.green, 0), 255);
                }
                else
                {
                    obj.strokeColor.red = Math.min(Math.max(colorA.red + i * redStep, 0), 255);
                    obj.strokeColor.blue = Math.min(Math.max(colorA.blue + i * blueStep, 0), 255);
                    obj.strokeColor.green = Math.min(Math.max(colorA.green + i * greenStep, 0), 255);
                }
            }
        }
    }
}

title = "Interpolate between two colors (select two objects with fill colors) and set them to strokes";
random = prompt("Random color within given range (1 yes, 0 no)", 0, title);
if(activeDocument.selection.length > 2)
{
    var objA = activeDocument.selection[0];
    var objB = activeDocument.selection[1];
    objA.selected = false;
    objB.selected = false;
    var colorA = objA.strokeColor;
    var colorB = objB.strokeColor;
    if(!objA.stroked)
    {
        colorA = objA.fillColor;
    }
    if(!objB.stroked)
    {
        colorB = objB.fillColor;
    }
    strokesColorRange(activeDocument.selection, colorA, colorB, parseFloat(random));
}