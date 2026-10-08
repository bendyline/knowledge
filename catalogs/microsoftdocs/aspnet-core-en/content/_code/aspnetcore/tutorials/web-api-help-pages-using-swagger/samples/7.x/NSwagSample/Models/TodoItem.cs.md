# Source code: aspnetcore/tutorials/web-api-help-pages-using-swagger/samples/7.x/NSwagSample/Models/TodoItem.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace NSwagSample.Models;

public class TodoItem
{
    public long Id { get; set; }

    [Required]
    public string Name { get; set; } = null!;

    [DefaultValue(false)]
    public bool IsComplete { get; set; }
}
```
