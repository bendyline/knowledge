# Source code: samples/core/Spatial/SqlServer/Models/StateProvince.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations.Schema;
using NetTopologySuite.Geometries;

namespace SqlServer.Models;

[Table("StateProvinces", Schema = "Application")]
internal class StateProvince
{
    public int StateProvinceID { get; set; }

    public string StateProvinceName { get; set; }

    public Geometry Border { get; set; }
}
```
