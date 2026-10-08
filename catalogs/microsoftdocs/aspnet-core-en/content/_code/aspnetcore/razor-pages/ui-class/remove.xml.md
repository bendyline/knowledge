# Source code: aspnetcore/razor-pages/ui-class/remove.xml

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Razor">

  <PropertyGroup>
    // Markup removed for brevity.
    <TypescriptOutDir>wwwroot</TypescriptOutDir>
    <PrepareForBuildDependsOn>
      CompileTypeScriptWithTSConfig;
      GetTypeScriptOutputForPublishing;$(PrepareForBuildDependsOn)
    </PrepareForBuildDependsOn>
  </PropertyGroup>

  <ItemGroup>
    <Content Remove="wwwroot\{path-to-typescript-outputs}" />
  </ItemGroup>

</Project>

```
