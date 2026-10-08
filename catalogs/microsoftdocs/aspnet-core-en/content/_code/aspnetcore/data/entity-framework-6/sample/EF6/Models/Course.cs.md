# Source code: aspnetcore/data/entity-framework-6/sample/EF6/Models/Course.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace EF6.Models
{
    public class Course
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CourseID { get; set; }
        public string Title { get; set; }
        public int Credits { get; set; }

        public virtual ICollection<Enrollment> Enrollments { get; set; }
    }
}
```
