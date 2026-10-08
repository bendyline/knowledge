# Source code: aspnetcore/mvc/models/model-binding/samples/3.x/ModelBindingSample/Models/OfficeAssignment.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;

namespace ModelBindingSample.Models
{
    public class OfficeAssignment
    {
        [Display(Name = "Office Location")]
        public string Location { get; set; }
    }
}

```
