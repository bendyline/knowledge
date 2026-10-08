# Source code: aspnetcore/tutorials/first-web-api/samples/3.0/TodoApi/Models/TodoItem.cs

Complete source file; linked examples may select a region or line range.

```
#define First

namespace TodoApi.Models
{
#if First
    #region snippet
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
    }
    #endregion
#else
    // Use this to test you can over-post
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
        public string Secret { get; set; }
    }
#endif
}
```
