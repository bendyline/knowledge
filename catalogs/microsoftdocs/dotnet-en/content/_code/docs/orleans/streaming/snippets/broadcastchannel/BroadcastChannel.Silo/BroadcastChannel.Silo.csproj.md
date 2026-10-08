# Source code: docs/orleans/streaming/snippets/broadcastchannel/BroadcastChannel.Silo/BroadcastChannel.Silo.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Http" Version="10.0.12" />
    <PackageReference Include="Microsoft.Extensions.Hosting" Version="10.0.12" />
    <PackageReference Include="Microsoft.Orleans.Server" Version="10.3.1" />
    <PackageReference Include="Microsoft.Orleans.BroadcastChannel" Version="10.3.1" />
    <PackageReference Include="Microsoft.Orleans.Serialization.SystemTextJson" Version="10.3.1" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\BroadcastChannel.GrainInterfaces\BroadcastChannel.GrainInterfaces.csproj" />
  </ItemGroup>

</Project>

```
