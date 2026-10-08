# Source code: docs/orleans/tutorials-and-samples/snippets/minimal/Grains/Grains.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <ItemGroup>
    <PackageReference Include="Microsoft.Orleans.Sdk" Version="10.3.1" />
    <PackageReference Include="Microsoft.Extensions.Logging.Abstractions" Version="10.0.12" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\GrainInterfaces\GrainInterfaces.csproj" />
  </ItemGroup>

</Project>

```
