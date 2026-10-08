# Source code: aspnetcore/metrics/samples/custom-metrics/Program.cs

Complete source file; linked examples may select a region or line range.

```
// <snippet_RegisterMetrics>
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<ContosoMetrics>();
// </snippet_RegisterMetrics>

var app = builder.Build();

// <snippet_InjectAndUseMetrics>
app.MapPost("/complete-sale", (SaleModel model, ContosoMetrics metrics) =>
{
    // ... business logic such as saving the sale to a database ...

    metrics.ProductSold(model.ProductName, model.QuantitySold);
});
// </snippet_InjectAndUseMetrics>

app.Run();

```
