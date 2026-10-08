# Source code: docs/framework/windows-services/snippets/MyNewService/csharp/Project.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net481</TargetFramework>
    <StartupObject>Class1</StartupObject>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="System.ServiceProcess.ServiceController" Version="10.0.12" />
  </ItemGroup>

</Project>

```
