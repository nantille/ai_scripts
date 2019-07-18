function setGradient(selection, gradient)
{
    var i = 0;
    var obj, path;
    // Ignore first two reference objects
    for (i = 0; i < selection.length; i++)
    {
        obj = selection[i];
        if (obj.typename == "GroupItem") 
        {
            setGradient(obj.pageItems, gradient);
        } 
        else if(obj.typename == "CompoundPathItem") 
        {
            path = obj.pathItems[0];
            var gradientFill = new GradientColor;
            gradientFill.gradient = gradient;
            path.fillColor = gradientFill;
        } 
        else if(obj.typename == "PathItem") 
        {
            var gradientFill = new GradientColor;
            gradientFill.gradient = gradient;
            obj.fillColor = gradientFill;
        }
    }
}

if(activeDocument.selection.length > 2)
{
    var objA = activeDocument.selection[0];
    var objB = activeDocument.selection[1];
    objA.selected = false;
    objB.selected = false;
    var colorA = objA.fillColor;
    var colorB = objB.fillColor;
    var gradient = activeDocument.gradients.add();
    gradient.gradientStops[0].color = colorA;  
    gradient.gradientStops[1].color = colorB;
    setGradient(activeDocument.selection, gradient);
}