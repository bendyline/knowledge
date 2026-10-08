# Source code: docs/csharp/tour-of-csharp/snippets/shared/LinqExample.cs

Complete source file; linked examples may select a region or line range.

```
namespace TourOfCsharp;
internal class LinqExample
{
    private record Student(string FirstName, string LastName, double GPA);

    private static List<Student> Students = [];

    private static void LinqExampleQuery()
    {
        // <LinqExampleQuery>
        var honorRoll = from student in Students
                        where student.GPA > 3.5
                        select student;
        // </LinqExampleQuery>
    }
}

```
