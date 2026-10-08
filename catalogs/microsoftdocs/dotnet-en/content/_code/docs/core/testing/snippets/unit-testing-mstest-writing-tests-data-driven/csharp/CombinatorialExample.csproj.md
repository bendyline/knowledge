# Source code: docs/core/testing/snippets/unit-testing-mstest-writing-tests-data-driven/csharp/CombinatorialExample.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <MSTestVersion Condition="'$(MSTestVersion)' == ''">4.4.1</MSTestVersion>
    <RestoreAdditionalProjectSources>$(RestoreAdditionalProjectSources);https://pkgs.dev.azure.com/dnceng/public/_packaging/test-tools/nuget/v3/index.json</RestoreAdditionalProjectSources>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="MSTest" Version="$(MSTestVersion)" />
  </ItemGroup>

</Project>

```
