# Source code: samples/core/Modeling/DataSeeding/Language.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;

namespace EFModeling.DataSeeding;

public class Language
{
    public int Id { get; set; }
    public string Name { get; set; }

    public LanguageDetails Details { get; set; }
    public List<Country> UsedIn { get; set; }
}

```
