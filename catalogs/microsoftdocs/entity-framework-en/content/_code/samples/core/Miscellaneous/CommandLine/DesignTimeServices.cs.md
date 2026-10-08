# Source code: samples/core/Miscellaneous/CommandLine/DesignTimeServices.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Migrations.Design;
using Microsoft.Extensions.DependencyInjection;

#region DesignTimeServices
internal class MyDesignTimeServices : IDesignTimeServices
{
    public void ConfigureDesignTimeServices(IServiceCollection services)
        => services.AddSingleton<IMigrationsCodeGenerator, MyMigrationsCodeGenerator>();
}
#endregion

internal class MyMigrationsCodeGenerator : CSharpMigrationsGenerator
{
    public MyMigrationsCodeGenerator(
        MigrationsCodeGeneratorDependencies dependencies,
        CSharpMigrationsGeneratorDependencies csharpDependencies)
        : base(dependencies, csharpDependencies)
    {
    }
}

```
