# Source code: aspnetcore/web-api/advanced/custom-formatters/samples/6.x/CustomFormattersSample/Models/Contact.cs

Complete source file; linked examples may select a region or line range.

```
namespace CustomFormattersSample.Models;

public record Contact(Guid Id, string FirstName, string LastName)
{
    public Contact(string FirstName, string LastName)
        : this(Guid.Empty, FirstName, LastName) { }
}

```
