# Source code: aspnetcore/performance/caching/memory/samples/3.x/WebCacheSample/Models/DependentViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace WebCacheSample.Models
{
    public class DependentViewModel
    {
        public DateTime? ParentCachedTime { get; set; }
        public DateTime? ChildCachedTime { get; set; }
        public string Message { get; set; }
    }
}

```
