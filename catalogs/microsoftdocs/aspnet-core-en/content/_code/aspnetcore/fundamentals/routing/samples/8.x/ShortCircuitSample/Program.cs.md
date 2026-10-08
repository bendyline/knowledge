# Source code: aspnetcore/fundamentals/routing/samples/8.x/ShortCircuitSample/Program.cs

Complete source file; linked examples may select a region or line range.

```

// <all>
var app = WebApplication.Create();

app.UseHttpLogging();

app.MapGet("/", () => "No short-circuiting!");
// <mapget>
app.MapGet("/short-circuit", () => "Short circuiting!").ShortCircuit();
// </mapget>
// <mapshortcircuit>
app.MapShortCircuit(404, "robots.txt", "favicon.ico");
// </mapshortcircuit>

app.Run();
// </all>

```
