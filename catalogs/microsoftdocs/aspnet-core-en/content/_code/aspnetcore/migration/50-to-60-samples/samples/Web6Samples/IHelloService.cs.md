# Source code: aspnetcore/migration/50-to-60-samples/samples/Web6Samples/IHelloService.cs

Complete source file; linked examples may select a region or line range.

```
public interface IHelloService
{
    public string HelloMessage { get; }
}

public class HelloService : IHelloService
{
    public string HelloMessage => "Hello World";
}
```
