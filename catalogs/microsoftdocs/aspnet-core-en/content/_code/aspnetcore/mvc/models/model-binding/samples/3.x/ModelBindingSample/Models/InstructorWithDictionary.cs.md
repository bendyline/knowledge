# Source code: aspnetcore/mvc/models/model-binding/samples/3.x/ModelBindingSample/Models/InstructorWithDictionary.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ModelBindingSample.Models
{
    // <snippet_BindNever>
    public class InstructorWithDictionary
    {
        [BindNever]
        public int ID { get; set; }
        // </snippet_BindNever>
        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [Display(Name = "First Name")]
        public string FirstMidName { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Hire Date")]
        public DateTime? HireDate { get; set; }

        public Dictionary<string, string> Courses { get; set; }
    }
}

```
