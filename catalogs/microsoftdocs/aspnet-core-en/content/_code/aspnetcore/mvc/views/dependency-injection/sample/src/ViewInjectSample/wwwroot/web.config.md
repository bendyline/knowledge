# Source code: aspnetcore/mvc/views/dependency-injection/sample/src/ViewInjectSample/wwwroot/web.config

Complete source file; linked examples may select a region or line range.

```
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="httpPlatformHandler" path="*" verb="*" modules="httpPlatformHandler" resourceType="Unspecified"/>
    </handlers>
    <httpPlatform processPath="%DNX_PATH%" arguments="%DNX_ARGS%" stdoutLogEnabled="false" startupTimeLimit="3600"/>
  </system.webServer>
</configuration>

```
