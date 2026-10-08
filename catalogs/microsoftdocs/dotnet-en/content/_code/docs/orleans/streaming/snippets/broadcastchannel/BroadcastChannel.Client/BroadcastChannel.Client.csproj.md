# Source code: docs/orleans/streaming/snippets/broadcastchannel/BroadcastChannel.Client/BroadcastChannel.Client.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Hosting" Version="10.0.0" />
    <PackageReference Include="Microsoft.Orleans.Client" Version="10.0.1" />
    <PackageReference Include="Microsoft.Orleans.BroadcastChannel" Version="10.0.1" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\BroadcastChannel.GrainInterfaces\BroadcastChannel.GrainInterfaces.csproj" />
  </ItemGroup>

</Project>

```
