# Source code: aspnetcore/signalr/streaming/samples/3.0/SignalRStreaming.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.App" Version="3.0.0-*" />
    <PackageReference Include="System.Reactive.Linq" Version="4.0.0" />
  </ItemGroup>

  <Target Name="CopySignalR" BeforeTargets="AfterBuild">
    <ItemGroup>
      <SignalRJSClientFiles Include="$(MSBuildThisFileDirectory)node_modules\@aspnet\signalr\dist\browser\*" />
    </ItemGroup>
    <Copy SourceFiles="@(SignalRJSClientFiles)" DestinationFolder="$(MSBuildThisFileDirectory)wwwroot\lib\signalr" />
  </Target>

</Project>

```
