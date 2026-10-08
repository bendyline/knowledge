# Source code: aspnetcore/grpc/authn-and-authz/sample/6.x/TicketerClient/TicketerClient.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Google.Protobuf" Version="3.20.0" />
    <PackageReference Include="Grpc.Net.Client" Version="2.52.0" />
    <PackageReference Include="Grpc.Tools" Version="2.43.0" PrivateAssets="All" />
  </ItemGroup>

  <ItemGroup>
    <Protobuf Include="Protos\ticket.proto" GrpcServices="Client" />
  </ItemGroup>

</Project>

```
