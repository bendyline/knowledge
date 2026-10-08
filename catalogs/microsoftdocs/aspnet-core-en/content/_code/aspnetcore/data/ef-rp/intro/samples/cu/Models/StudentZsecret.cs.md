# Source code: aspnetcore/data/ef-rp/intro/samples/cu/Models/StudentZsecret.cs

Complete source file; linked examples may select a region or line range.

```
#if Intro
#region snippet_Intro
public class Student
{
    public int ID { get; set; }
    public string LastName { get; set; }
    public string FirstMidName { get; set; }
    public DateTime EnrollmentDate { get; set; }
    public string Secret { get; set; }
}
#endregion
#endif
```
