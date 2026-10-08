# Source code: aspnetcore/mvc/models/model-binding/samples/3.x/ModelBindingSample/Models/Instructor.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;

namespace ModelBindingSample.Models
{
    // <snippet_FromQuery>
    public class Instructor
    {
        public int ID { get; set; }

        [FromQuery(Name = "Note")]
        public string NoteFromQueryString { get; set; }
        // </snippet_FromQuery>
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Display(Name = "First Name")]
        public string FirstMidName { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Hire Date")]
        public DateTime? HireDate { get; set; }

        public OfficeAssignment OfficeAssignment { get; set; }
    }
}

```
