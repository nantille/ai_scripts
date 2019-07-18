// Simple script to duplicate an object (reference) along a 2D Fibonacci spiral

function fibonacci_scatter(reference, baseRadius)
{
    var i, r, phi, dupli;
    var baseSize = 100;
    //var increment = Math.pi * (3. - Math.sqrt(5.));
    for (i = 1; i < samples; i++)
    {
        r = baseRadius * Math.sqrt(i / samples);
        //std naive way: phi = 137.5 * Math.PI / 180 * i;
        phi = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
        dupli = reference.duplicate(reference);
        dupli.translate(r * Math.cos(phi), r * Math.sin(phi));
        if (scaleFactor != 1.0)
        {
            dupli.resize(baseSize + scaleFactor * r, baseSize + scaleFactor * r);
        }
    }
}

var scriptID = "2D Fibonacci spiral aka sunflower pattern";
var doc = app.activeDocument;
var reference = doc.selection[0];
var sizeReference;
var samples = prompt("Step 1/3: number of duplicates", 100, scriptID);
if (samples != null)
{
    var radius = prompt("Step 2/3: radius", -1, "Radius of the spiral. If -1, the selection's width will be used.");
    if ((radius == -1 || radius == null) && doc.selection.length > 1)
    {
        sizeReference = doc.selection[1];
        radius = sizeReference.width / 2;
    }
    var scaleFactor = prompt("Step 3/3: scale factor", 1.0, "Uniform scaling factor, 1.0 means no scaling");

    if (reference == undefined)
    {
        alert("Please select an object to duplicate and run the script again");
    }
    else
    {
        fibonacci_scatter(reference, parseFloat(radius));
        
        // Cleanup and group the result
        if (sizeReference != undefined)
        {
            sizeReference.selected = false;
        }
        if(doc.selection.length){
            app.executeMenuCommand("group");
        }
    }
}