# Source code: aspnetcore/mvc/models/model-binding/samples/3.x/ModelBindingSample/Models/ObjectId.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json.Serialization;
using ModelBindingSample.Converters;

namespace ModelBindingSample.Models
{
    // <snippet_Class>
    [JsonConverter(typeof(ObjectIdConverter))]
    public struct ObjectId
    {
        public ObjectId(int id) =>
            Id = id;

        public int Id { get; }
    }
    // </snippet_Class>
}

```
