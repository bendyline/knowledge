# Source code: docs/csharp/language-reference/compiler-messages/snippets/WarningWaves/WarningWaves.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <ImplicitUsings>enable</ImplicitUsings>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <WarningLevel>10</WarningLevel>
    <AnalysisLevel>preview</AnalysisLevel>
    <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\ImportedTypes\ImportedTypes.csproj" />
  </ItemGroup>

</Project>

```
