# Source code: aspnetcore/mvc/models/model-binding/samples/3.x/ModelBindingSample/Pages/Instructors/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using ModelBindingSample.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace ModelBindingSample.Pages.Instructors
{
    public class IndexModel : InstructorsPageModel
    {
        // <snippet_SupportsGet>
        [BindProperty(Name = "ai_user", SupportsGet = true)]
        public string ApplicationInsightsCookie { get; set; }
        // </snippet_SupportsGet>

        public List<Instructor> Instructors { get; set; }

        // <snippet_FromHeader>
        public void OnGet([FromHeader(Name = "Accept-Language")] string language)
        // </snippet_FromHeader>
        {
            Instructors = _instructorsInMemoryStore;
            ViewData["Language"] = language;
        }
    }
}

```
