function strokesWidthRange(selection, minWidth, maxWidth, random)
{
    var i = 0;
    var obj, path;
    var strokeIncrement = (maxWidth - minWidth) / selection.length;
    for (i = 0; i < selection.length; i++)
    {
        obj = selection[i];
        if (obj.typename == "GroupItem") 
        {
            strokesWidthRange(obj.pageItems, minWidth, maxWidth, random);
        } 
        else if(obj.typename == "CompoundPathItem") 
        {
            path = obj.pathItems[0];
            if (random == 1)
            {
                path.strokeWidth = Math.random() * (maxWidth - minWidth) + minWidth;
            }
            else
            {
                path.strokeWidth = minWidth + strokeIncrement * i;
            }
        } 
        else if(obj.typename == "PathItem") 
        {
            if (obj.stroked == true) 
            {
                if (random == 1)
                {
                    obj.strokeWidth = Math.random() * (maxWidth - minWidth) + minWidth;
                }
                else
                {
                    obj.strokeWidth = minWidth + strokeIncrement * i;
                }
            }
        }
    }
}

title = "Set stroke widths within the given range";
minWidth = prompt("Step 1/3: min stroke width", 0.5, title);
if (minWidth != null)
{
    maxWidth = prompt("Step 2/3: max stroke width", 2.0, title);
    random = prompt("Step 3/3: random? 1 is yes, 0 is no", 0, title);
    if(minWidth != null && maxWidth != null)
    {
        strokesWidthRange(activeDocument.selection, parseFloat(minWidth), parseFloat(maxWidth), parseInt(random));
    }
}