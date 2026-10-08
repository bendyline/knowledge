# Source code: aspnetcore/data/entity-framework-6/sample/EF6/Models/Student.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;

namespace EF6.Models
{
    public class Student
    {
        public int ID { get; set; }
        public string LastName { get; set; }
        public string FirstMidName { get; set; }
        public DateTime EnrollmentDate { get; set; }

        public virtual ICollection<Enrollment> Enrollments { get; set; }
    }
}
```
