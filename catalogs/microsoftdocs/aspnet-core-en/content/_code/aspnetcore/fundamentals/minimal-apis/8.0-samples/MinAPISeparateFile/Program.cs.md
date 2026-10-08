# Source code: aspnetcore/fundamentals/minimal-apis/8.0-samples/MinAPISeparateFile/Program.cs

Complete source file; linked examples may select a region or line range.

```
using MinAPISeparateFile;

var builder = WebApplication.CreateSlimBuilder(args);

var app = builder.Build();

TodoEndpoints.Map(app);

app.Run();

```
