# Source code: aspnetcore/mvc/models/model-binding/samples/6.x/ModelBindingSample/Snippets/Instructor.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace ModelBindingSample.Snippets;

// <snippet_Class>
public class Instructor
{
    public int Id { get; set; }

    [FromQuery(Name = "Note")]
    public string? NoteFromQueryString { get; set; }

    // ...
}
// </snippet_Class>

```
