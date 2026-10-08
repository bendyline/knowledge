# Source code: docs/orleans/deployment/snippets/service-fabric/stateless/Orleans.ServiceFabric.Stateless.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <RootNamespace>ServiceFabric.Stateless</RootNamespace>
    <IsServiceFabricServiceProject>True</IsServiceFabricServiceProject>
    <ServerGarbageCollection>True</ServerGarbageCollection>
    <TargetLatestRuntimePatch>False</TargetLatestRuntimePatch>
    <RuntimeIdentifier>win-x64</RuntimeIdentifier>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.ServiceFabric.Services" Version="8.8.121" />
    <PackageReference Include="Microsoft.Extensions.Hosting" Version="10.0.0" />
    <PackageReference Include="Microsoft.Orleans.Server" Version="10.0.1" />
  </ItemGroup>

</Project>

```
