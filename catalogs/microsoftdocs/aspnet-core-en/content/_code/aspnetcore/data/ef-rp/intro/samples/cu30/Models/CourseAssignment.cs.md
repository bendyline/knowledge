# Source code: aspnetcore/data/ef-rp/intro/samples/cu30/Models/CourseAssignment.cs

Complete source file; linked examples may select a region or line range.

```
namespace ContosoUniversity.Models
{
    public class CourseAssignment
    {
        public int InstructorID { get; set; }
        public int CourseID { get; set; }
        public Instructor Instructor { get; set; }
        public Course Course { get; set; }
    }
}
```
