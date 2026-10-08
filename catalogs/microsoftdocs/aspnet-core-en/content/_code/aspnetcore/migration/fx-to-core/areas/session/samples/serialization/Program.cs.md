# Source code: aspnetcore/migration/fx-to-core/areas/session/samples/serialization/Program.cs

Complete source file; linked examples may select a region or line range.

```
var builder = WebApplication.CreateBuilder(args);

// <snippet_Serialization>
builder.Services.AddSystemWebAdapters()
    .AddJsonSessionSerializer(options =>
    {
        // Serialization/deserialization requires each session key to be registered to a type
        options.RegisterKey<int>("test-value");
    });
// </snippet_Serialization>

var app = builder.Build();
app.Run();

```
