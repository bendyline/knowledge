# Source code: aspnetcore/fundamentals/minimal-apis/min-api-filters/7samples/todo/EndpointFilters/Utilities.cs

Complete source file; linked examples may select a region or line range.

```
namespace TodoApi.EndpointFilters;

public static class Utilities
{
    public static string IsValid(Todo td)
    {
        if (td.Id < 0)
        {
            return "ID is less than 0";
        }
        else if (td.Name!.Length < 3)
        {
            return "Name length < 3";
        }
        else
        {
            return string.Empty;
        }
    }
}

```
