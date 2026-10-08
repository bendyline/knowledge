# Source code: aspnetcore/mvc/advanced/custom-model-binding/samples/2.x/CustomModelBindingSample/Data/Author.cs

Complete source file; linked examples may select a region or line range.

```
using CustomModelBindingSample.Binders;
using Microsoft.AspNetCore.Mvc;

namespace CustomModelBindingSample.Data
{
    [ModelBinder(BinderType = typeof(AuthorEntityBinder))]
    public class Author
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string GitHub { get; set; }
        public string Twitter { get; set; }
        public string BlogUrl { get; set; }
    }
}

```
