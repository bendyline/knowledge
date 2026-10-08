# Source code: aspnetcore/mvc/controllers/testing/samples/3.x/TestingControllersSample/src/TestingControllersSample/ViewModels/StormSessionViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace TestingControllersSample.ViewModels
{
    public class StormSessionViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public int IdeaCount { get; set; }
    }
}

```
