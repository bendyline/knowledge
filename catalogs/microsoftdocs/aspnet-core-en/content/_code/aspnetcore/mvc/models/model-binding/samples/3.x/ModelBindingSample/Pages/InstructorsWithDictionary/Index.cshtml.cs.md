# Source code: aspnetcore/mvc/models/model-binding/samples/3.x/ModelBindingSample/Pages/InstructorsWithDictionary/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using ModelBindingSample.Models;
using System.Collections.Generic;

namespace ModelBindingSample.Pages.InstructorsWithDictionary
{
    public class IndexModel : InstructorsPageModel
    {
        public List<InstructorWithDictionary> Instructors { get; set; }

        public void OnGet()
        {
            Instructors = _instructorsInMemoryStore;
        }
    }
}

```
