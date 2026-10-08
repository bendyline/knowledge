# Source code: docs/orleans/tutorials-and-samples/snippets/custom-grain-storage/Program.cs

Complete source file; linked examples may select a region or line range.

```
using GrainStorage;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);
builder.UseOrleans(siloBuilder =>
{
    siloBuilder.UseLocalhostClustering()
        .AddFileGrainStorage("File", options =>
        {
            string path = Environment.GetFolderPath(
                Environment.SpecialFolder.ApplicationData);

            options.RootDirectory = Path.Combine(path, "Orleans/GrainState/v1");
        });
});

using var host = builder.Build();
await host.RunAsync();

```
