# Source code: samples/core/Spatial/SqlServer/Models/Country.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations.Schema;
using NetTopologySuite.Geometries;

namespace SqlServer.Models;

#region snippet_Country
[Table("Countries", Schema = "Application")]
public class Country
{
    public int CountryID { get; set; }

    public string CountryName { get; set; }

    // Database includes both Polygon and MultiPolygon values
    public Geometry Border { get; set; }
}
#endregion
```
