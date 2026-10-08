# Source code: docs/standard/serialization/system-text-json/snippets/populate-properties/ClassA.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json.Serialization;

// <ClassA>
[JsonObjectCreationHandling(JsonObjectCreationHandling.Populate)]
class A
{
    public List<int> Numbers1 { get; } = [1, 2, 3];
    public List<int> Numbers2 { get; set; } = [1, 2, 3];
}
// </ClassA>

```
