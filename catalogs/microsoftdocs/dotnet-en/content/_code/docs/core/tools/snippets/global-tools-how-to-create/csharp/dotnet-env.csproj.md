# Source code: docs/core/tools/snippets/global-tools-how-to-create/csharp/dotnet-env.csproj

Complete source file; linked examples may select a region or line range.

```
<!--<full>-->
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>

    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>

    <!--<toolsettings>-->
    <PackAsTool>true</PackAsTool>
    <ToolCommandName>dotnet-env</ToolCommandName>
    <PackageOutputPath>./nupkg</PackageOutputPath>
    <!--</toolsettings>-->

  </PropertyGroup>

</Project>
<!--</full>-->

```
