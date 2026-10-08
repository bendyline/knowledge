# Source code: samples/core/Modeling/DataSeeding/City.cs

Complete source file; linked examples may select a region or line range.

```
namespace EFModeling.DataSeeding;

public class City
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int LocatedInId { get; set; }
    public Country LocatedIn { get; set; }
}

```
