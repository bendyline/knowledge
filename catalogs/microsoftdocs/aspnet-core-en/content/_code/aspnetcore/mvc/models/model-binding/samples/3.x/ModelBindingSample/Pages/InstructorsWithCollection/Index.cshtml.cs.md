# Source code: aspnetcore/mvc/models/model-binding/samples/3.x/ModelBindingSample/Pages/InstructorsWithCollection/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using ModelBindingSample.Models;
using System.Collections.Generic;

namespace ModelBindingSample.Pages.InstructorsWithCollection
{
    public class IndexModel : InstructorsPageModel
    {
        public IndexModel() : base()
        {
        }

        public List<InstructorWithCollection> Instructors { get; set; }

        public void OnGet()
        {
            Instructors = _instructorsInMemoryStore;
        }
    }
}

```
