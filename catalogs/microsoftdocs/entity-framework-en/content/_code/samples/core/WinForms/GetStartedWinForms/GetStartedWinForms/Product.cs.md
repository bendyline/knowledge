# Source code: samples/core/WinForms/GetStartedWinForms/GetStartedWinForms/Product.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel;

namespace GetStartedWinForms;

public class Product
{
    public int ProductId { get; set; }

    public string? Name { get; set; }

    public int CategoryId { get; set; }
    public virtual Category Category { get; set; } = null!;
}

```
