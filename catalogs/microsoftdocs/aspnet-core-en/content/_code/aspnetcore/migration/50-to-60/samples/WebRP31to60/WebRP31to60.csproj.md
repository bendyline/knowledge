# Source code: aspnetcore/migration/50-to-60/samples/WebRP31to60/WebRP31to60.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
  </PropertyGroup>

  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|AnyCPU'">
    <DefineConstants>$(DefineConstants)TRACE;V60E</DefineConstants>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Autofac.Extensions.DependencyInjection" Version="7.2.0" />
  </ItemGroup>

</Project>

```
