# Source code: aspnetcore/data/entity-framework-6/3.xsample/MVCCore/Models/Enrollment.cs

Complete source file; linked examples may select a region or line range.

```
namespace ContosoUniversity.Models
{
    public enum Grade
    {
        A, B, C, D, F
    }

    public class Enrollment
    {
        public int EnrollmentID { get; set; }
        public int CourseID { get; set; }
        public int StudentID { get; set; }
        public Grade? Grade { get; set; }

        public virtual Course Course { get; set; }
        public virtual Student Student { get; set; }
    }
}

```
