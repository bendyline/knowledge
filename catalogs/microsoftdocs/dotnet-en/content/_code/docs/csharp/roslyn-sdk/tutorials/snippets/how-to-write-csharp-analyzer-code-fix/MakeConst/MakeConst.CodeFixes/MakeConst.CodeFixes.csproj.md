# Source code: docs/csharp/roslyn-sdk/tutorials/snippets/how-to-write-csharp-analyzer-code-fix/MakeConst/MakeConst.CodeFixes/MakeConst.CodeFixes.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
    <IsPackable>false</IsPackable>
    <RootNamespace>MakeConst</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.CodeAnalysis.CSharp" Version="5.9.0" />
    <PackageReference Include="Microsoft.CodeAnalysis.CSharp.Workspaces" Version="5.9.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\MakeConst\MakeConst.csproj" />
  </ItemGroup>

  <ItemGroup>
    <Compile Update="CodeFixResources.Designer.cs" DesignTime="True" AutoGen="True" DependentUpon="CodeFixResources.resx" />
    <EmbeddedResource Update="CodeFixResources.resx" Generator="ResXFileCodeGenerator" LastGenOutput="CodeFixResources.Designer.cs" />
  </ItemGroup>

</Project>

```
