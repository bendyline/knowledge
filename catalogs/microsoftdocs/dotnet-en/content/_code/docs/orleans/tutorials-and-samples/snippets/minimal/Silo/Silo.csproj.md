# Source code: docs/orleans/tutorials-and-samples/snippets/minimal/Silo/Silo.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Hosting" Version="10.0.12" />
    <PackageReference Include="Microsoft.Extensions.Logging.Abstractions" Version="10.0.12" />
    <PackageReference Include="Microsoft.Extensions.Logging.Console" Version="10.0.12" />
    <PackageReference Include="Microsoft.Orleans.Server" Version="10.3.1" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\Grains\Grains.csproj" />
  </ItemGroup>

</Project>

```
