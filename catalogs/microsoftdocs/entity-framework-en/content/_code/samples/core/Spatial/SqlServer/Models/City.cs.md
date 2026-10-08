# Source code: samples/core/Spatial/SqlServer/Models/City.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations.Schema;
using NetTopologySuite.Geometries;

namespace SqlServer.Models;

#region snippet_City
[Table("Cities", Schema = "Application")]
public class City
{
    public int CityID { get; set; }

    public string CityName { get; set; }

    public Point Location { get; set; }
}
#endregion
```
