# Source code: aspnetcore/mvc/models/model-binding/samples/8.x/ModelBindingSample/Snippets/ObjectId.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json.Serialization;

namespace ModelBindingSample.Snippets;

// <snippet_Type>
[JsonConverter(typeof(ObjectIdConverter))]
public record ObjectId(int Id);
// </snippet_Type>

```
