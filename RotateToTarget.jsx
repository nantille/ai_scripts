function rotateToTarget(obj, target, addedAngle, naiveCenter)
{
    var xt = target.position[0];
    var yt = target.position[1];
    var xo = obj.position[0];
    var yo = obj.position[1];
    if(!naiveCenter)
    {
        xt = target.left + target.width / 2;
        yt = target.top - target.height / 2;
        xo = obj.left + obj.width / 2;
        yo = obj.top - obj.height / 2;
    }
    angle = Math.atan2(yo - yt, xo - xt) * 180 / Math.PI + addedAngle;
    var changePositions = true;
    var changeFillPatterns = true;
    var changeFillGradients = true;
    var changeStrokePattern = true;
    var rotationCenter = Transformation.CENTER;
    if (angle != NaN)
    {
        obj.rotate(angle, changePositions, changeFillPatterns, changeFillGradients, changeStrokePattern, rotationCenter);
    }
}

function rotateAllToTarget(selection, target, addedAngle)
{
    var i = 0;
    var obj, path;
    for (i = 1; i < selection.length; i++)
    {
        obj = selection[i];
        if (obj.typename == "GroupItem") 
        {
            rotateAllToTarget(obj.pageItems, target, addedAngle);
        } 
        else if(obj.typename == "CompoundPathItem") 
        {
            path = obj.pathItems[0];
            rotateToTarget(path, target, addedAngle, true);
        } 
        else if(obj.typename == "PathItem") 
        {
            rotateToTarget(obj, target, addedAngle, true);
        }
    }
}

addedAngle = prompt("Angle value to add to the rotated objects after tracking", 0.0, "");
if(addedAngle != null)
{
    rotateAllToTarget(activeDocument.selection, activeDocument.selection[0], parseFloat(addedAngle));
}