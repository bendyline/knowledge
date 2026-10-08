# Source code: docs/orleans/deployment/snippets/consul/Silo/Program.cs

Complete source file; linked examples may select a region or line range.

```
IHostBuilder builder = Host.CreateDefaultBuilder(args)
    .UseOrleans(silo =>
    {
        silo.UseConsulSiloClustering(options =>
        {
            // The address of the Consul server
            var address = new Uri("http://localhost:8500");
            options.ConfigureConsulClient(address);
        });
    })
    .UseConsoleLifetime();

using IHost host = builder.Build();
host.Run();

```
