# Source code: aspnetcore/data/ef-rp/intro/samples/cu30snapshots/1-intro/Models/Student.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;

namespace ContosoUniversity.Models
{
    public class Student
    {
        public int ID { get; set; }
        public string LastName { get; set; }
        public string FirstMidName { get; set; }
        public DateTime EnrollmentDate { get; set; }

        public ICollection<Enrollment> Enrollments { get; set; }
    }
}
```
