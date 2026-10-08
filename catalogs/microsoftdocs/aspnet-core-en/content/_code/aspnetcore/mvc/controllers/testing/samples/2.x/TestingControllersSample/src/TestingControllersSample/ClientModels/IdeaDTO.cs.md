# Source code: aspnetcore/mvc/controllers/testing/samples/2.x/TestingControllersSample/src/TestingControllersSample/ClientModels/IdeaDTO.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace TestingControllersSample.ClientModels
{
    public class IdeaDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTimeOffset DateCreated { get; set; }
    }
}

```
