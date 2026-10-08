# Source code: aspnetcore/host-and-deploy/windows-service/samples/7.x/WebAppServiceSample/SampleApp.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net7.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
	<IsTransformWebConfigDisabled>true</IsTransformWebConfigDisabled>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Hosting.WindowsServices" Version="7.0.0" />
  </ItemGroup>

</Project>

```
