# Source code: docs/orleans/tutorials-and-samples/snippets-v3/custom-storage/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Orleans.Hosting;

namespace GrainStorage;

public class Program
{
    // <silo_host_builder>
    public static void ConfigureSilo()
    {
        var silo = new SiloHostBuilder()
            .UseLocalhostClustering()
            .AddFileGrainStorage("File", opts =>
            {
                opts.RootDirectory = "C:/TestFiles";
            })
            .Build();
    }
    // </silo_host_builder>
}

```
