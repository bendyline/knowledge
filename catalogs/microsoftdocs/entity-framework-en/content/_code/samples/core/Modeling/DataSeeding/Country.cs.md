# Source code: samples/core/Modeling/DataSeeding/Country.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;

namespace EFModeling.DataSeeding;

public class Country
{
    public int CountryId { get; set; }
    public string Name { get; set; }
    public virtual ICollection<Language> OfficialLanguages { get; set; }
}

```
