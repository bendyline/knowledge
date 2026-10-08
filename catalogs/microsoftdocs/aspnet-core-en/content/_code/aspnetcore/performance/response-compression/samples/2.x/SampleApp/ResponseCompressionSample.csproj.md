# Source code: aspnetcore/performance/response-compression/samples/2.x/SampleApp/ResponseCompressionSample.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFrameworks>netcoreapp2.2</TargetFrameworks>
    <AspNetCoreHostingModel>InProcess</AspNetCoreHostingModel>
  </PropertyGroup>

  <ItemGroup>
    <Content Include="banner.svg;testfile1kb.txt" CopyToPublishDirectory="PreserveNewest" CopyToOutputDirectory="PreserveNewest" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>

</Project>

```
