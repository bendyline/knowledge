# Source code: aspnetcore/fundamentals/logging/index/samples/3.x/TodoApiSample/TodoApiSample.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.0</TargetFramework>
  </PropertyGroup>

  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|AnyCPU'">
    <DefineConstants>TRACE</DefineConstants>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Logging.AzureAppServices" Version="3.0.0-*" />
    <PackageReference Include="Microsoft.Extensions.Logging.Debug" Version="3.0.0-*" />
  </ItemGroup>

</Project>

```
