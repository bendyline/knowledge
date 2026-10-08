# Source code: aspnetcore/data/ef-rp/intro/samples/cu30snapshots/2-crud/Models/StudentVM.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace ContosoUniversity.Models
{
    public class StudentVM
    {
        public int ID { get; set; }
        public string LastName { get; set; }
        public string FirstMidName { get; set; }
        public DateTime EnrollmentDate { get; set; }
    }
}

```
