# Source code: aspnetcore/fundamentals/apis/APIWithControllers/Program.cs

Complete source file; linked examples may select a region or line range.

```

namespace APIWithControllers;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        var app = builder.Build();

        app.UseHttpsRedirection();

        app.MapControllers();

        app.Run();
    }
}

```
