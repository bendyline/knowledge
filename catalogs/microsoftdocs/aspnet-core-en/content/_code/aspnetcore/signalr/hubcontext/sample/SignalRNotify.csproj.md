# Source code: aspnetcore/signalr/hubcontext/sample/SignalRNotify.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp2.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.App" />
    <PackageReference Include="Microsoft.AspNetCore.SignalR" Version="1.0.1" />
  </ItemGroup>

  <Target Name="CopySignalR" BeforeTargets="AfterBuild">
    <ItemGroup>
      <SignalRJSClientFiles Include="$(MSBuildThisFileDirectory)node_modules\@aspnet\signalr\dist\browser\*" />
    </ItemGroup>
    <Copy SourceFiles="@(SignalRJSClientFiles)" DestinationFolder="$(MSBuildThisFileDirectory)wwwroot\lib\signalr" />
  </Target>

</Project>

```
