# Source code: aspnetcore/web-api/index/samples/7.x/ApiController/SystemDateTime.cs

Complete source file; linked examples may select a region or line range.

```
public class SystemDateTime : IDateTime
{
    public string Now => DateTime.Now.ToString();
}

public interface IDateTime
{
    string Now { get; }
}

```
