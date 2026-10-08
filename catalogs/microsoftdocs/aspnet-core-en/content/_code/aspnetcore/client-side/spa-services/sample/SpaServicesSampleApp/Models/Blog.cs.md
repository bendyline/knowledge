# Source code: aspnetcore/client-side/spa-services/sample/SpaServicesSampleApp/Models/Blog.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;

namespace SpaServicesSampleApp.Models
{
    public class Blog
    {
        public int BlogId { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }

        public List<Post> Posts { get; set; }
    }
}

```
