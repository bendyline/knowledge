# Source code: aspnetcore/mvc/controllers/testing/samples/2.x/TestingControllersSample/src/TestingControllersSample/ViewModels/IdeaViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace TestingControllersSample.ViewModels
{
    public class IdeaViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTimeOffset DateCreated { get; set; }
    }
}

```
