# Source code: docs/csharp/language-reference/keywords/snippets/keywords.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <ImplicitUsings>enable</ImplicitUsings>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net11.0-windows</TargetFramework>
    <LangVersion>preview</LangVersion>
    <Nullable>enable</Nullable>
    <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
    <StartupObject>Keywords.Program</StartupObject>
    <GenerateDocumentationFile>False</GenerateDocumentationFile>
    <UseWPF>true</UseWPF>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.VisualBasic" Version="10.4.0-preview.18571.3" />
  </ItemGroup>
</Project>

```
