# Source code: aspnetcore/fundamentals/minimal-apis/samples/todo/cp2do.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    <Nullable>enable</Nullable>
	  <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
	  <PackageReference Include="Swashbuckle.AspNetCore" Version="6.1.5" />
	  <PackageReference Include="Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore" Version="6.0.0-rc.2.21480.10" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.InMemory" Version="6.0.0-rc.2.21480.5" />
  </ItemGroup>
</Project>
```
