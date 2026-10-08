# Source code: aspnetcore/fundamentals/owin/sample/src/NowinWebSockets/web.config

Complete source file; linked examples may select a region or line range.

```
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModule" resourceType="Unspecified" />
    </handlers>
    <aspNetCore processPath="%LAUNCHER_PATH%" arguments="%LAUNCHER_ARGS%" forwardWindowsAuthToken="false" stdoutLogEnabled="false" />
  </system.webServer>
</configuration>
```
