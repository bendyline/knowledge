# Source code: docs/csharp/programming-guide/classes-and-structs/snippets/properties/CompleteEmployee.cs

Complete source file; linked examples may select a region or line range.

```
namespace EmployeeExample;

// <EmployeeExample>
public class Employee
{
    public static int NumberOfEmployees;
    private static int _counter;
    private string _name;

    // A read-write instance property:
    public string Name
    {
        get => _name;
        set => _name = value;
    }

    // A read-only static property:
    public static int Counter => _counter;

    // A Constructor:
    public Employee() => _counter = ++NumberOfEmployees; // Calculate the employee's number:
}
// </EmployeeExample>

```
