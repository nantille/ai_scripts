function sampleSelection(selection, sampling)
{
    var i = 0;
    var obj, path;
    for (i = 0; i < selection.length; i++)
    {
        obj = selection[i];
        if (obj.typename == "GroupItem") 
        {
            sampleSelection(obj.pageItems, sampling);
        } 
        else if(obj.typename == "CompoundPathItem") 
        {
            path = obj.pathItems[0];
            path.selected = Math.random() >= sampling / 100;
        } 
        else if(obj.typename == "PathItem") 
        {
            obj.selected = Math.random() >= sampling / 100;
        }
    }
}

sampling = prompt("Percentage of samples", 50, "");
if (sampling != null)    
{
    sampleSelection(activeDocument.selection, parseFloat(sampling));
}