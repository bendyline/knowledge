# Source code: aspnetcore/grpc/aspnetcore/Server.csproj

Complete source file; linked examples may select a region or line range.

```
<Project Sdk="Microsoft.NET.Sdk">

  <ItemGroup>
    <PackageReference Include="Grpc.AspNetCore" Version="2.47.0" />
    <Protobuf Include="Protos\greet.proto" GrpcServices="Server" />
    
    <FrameworkReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>

</Project>

```
