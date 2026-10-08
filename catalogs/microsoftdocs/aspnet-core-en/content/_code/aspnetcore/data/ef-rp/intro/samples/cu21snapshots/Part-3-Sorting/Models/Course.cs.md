# Source code: aspnetcore/data/ef-rp/intro/samples/cu21snapshots/Part-3-Sorting/Models/Course.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ContosoUniversity.Models
{
    public class Course
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CourseID { get; set; }
        public string Title { get; set; }
        public int Credits { get; set; }

        public ICollection<Enrollment> Enrollments { get; set; }
    }
}
```
