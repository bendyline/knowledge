# Source code: docs/core/extensions/snippets/logging/log-buffering/global/file-based/GlobalLogBufferingFileBased.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <Description>Demonstrates how to use log buffering feature.</Description>
    <OutputType>Exe</OutputType>
    <NoWarn>$(NoWarn);EXTEXP0003</NoWarn>
    <TargetFrameworks>$(LatestTargetFramework)</TargetFrameworks>
    <RootNamespace>GlobalLogBufferingFileBased</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Hosting" Version="9.0.5" />
    <PackageReference Include="Microsoft.Extensions.Logging.Console" Version="9.0.5" />
    <PackageReference Include="Microsoft.Extensions.Telemetry" Version="9.5.0" />
  </ItemGroup>

  <ItemGroup>
    <None Update="appsettings.json">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </None>
  </ItemGroup>

</Project>

```
