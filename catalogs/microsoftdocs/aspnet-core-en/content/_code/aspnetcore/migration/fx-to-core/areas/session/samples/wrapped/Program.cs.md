# Source code: aspnetcore/migration/fx-to-core/areas/session/samples/wrapped/Program.cs

Complete source file; linked examples may select a region or line range.

```
var builder = WebApplication.CreateBuilder(args);

// <snippet_WrapAspNetCoreSession>
builder.Services.AddSystemWebAdapters()
    .AddJsonSessionSerializer(options =>
    {
        // Serialization/deserialization requires each session key to be registered to a type
        options.RegisterKey<int>("test-value");
        options.RegisterKey<SessionDemoModel>("SampleSessionItem");
    })
    .AddWrappedAspNetCoreSession();
// </snippet_WrapAspNetCoreSession>

var app = builder.Build();
app.Run();

```
