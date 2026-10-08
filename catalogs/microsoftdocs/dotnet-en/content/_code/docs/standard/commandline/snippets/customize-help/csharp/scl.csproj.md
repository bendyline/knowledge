# Source code: docs/standard/commandline/snippets/customize-help/csharp/scl.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Logging" Version="10.0.12" />
    <PackageReference Include="Microsoft.Extensions.Logging.Console" Version="10.0.12" />
    <PackageReference Include="Spectre.Console" Version="0.57.2" />
    <PackageReference Include="System.CommandLine" Version="2.0.12" />
  </ItemGroup>

</Project>

```
