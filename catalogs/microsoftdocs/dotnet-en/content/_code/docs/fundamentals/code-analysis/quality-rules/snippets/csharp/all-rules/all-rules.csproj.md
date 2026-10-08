# Source code: docs/fundamentals/code-analysis/quality-rules/snippets/csharp/all-rules/all-rules.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <RootNamespace>all_rules</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="System.Data.SqlClient" Version="4.9.1" />
    <PackageReference Include="Microsoft.Extensions.Logging" Version="10.0.12" />
    <PackageReference Include="System.Data.OleDb" Version="10.0.12" />
    <PackageReference Include="System.Security.Permissions" Version="10.0.12" />
  </ItemGroup>

  <ItemGroup>
    <None Include=".editorconfig" />
  </ItemGroup>

</Project>

```
