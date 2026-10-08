# Source code: aspnetcore/fundamentals/http-logging/samples-snapshot/9.x/Program.cs

Complete source file; linked examples may select a region or line range.

```
// <snippet7>
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.Duration;
});

builder.Services.AddRedaction();
builder.Services.AddHttpLoggingRedaction(op => { });
// </snippet7>

```
