# Source code: aspnetcore/data/ef-rp/intro/samples/cu20snapshots/cu-part8/Models/SchoolViewModels/EnrollmentDateGroup.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.ComponentModel.DataAnnotations;

namespace ContosoUniversity.Models.SchoolViewModels
{
    public class EnrollmentDateGroup
    {
        [DataType(DataType.Date)]
        public DateTime? EnrollmentDate { get; set; }

        public int StudentCount { get; set; }
    }
}
```
