# Source code: aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Snippets/Models/SampleModel.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;

namespace ResponseFormattingSample.Snippets.Models;

// <snippet_Class>
public class SampleModel
{
    [Range(1, 10)]
    public int Value { get; set; }
}
// </snippet_Class>

```
