# Source code: samples/snippets/csharp/VS_Snippets_CFX/c_howto-wcfserviceandasmxclient/common/app.config

Complete source file; linked examples may select a region or line range.

```
<?xml version="1.0" encoding="utf-8" ?>
<!-- <snippet1> -->
<configuration>
  <system.serviceModel>
    <services>
      <service name="MyService" behaviorConfiguration="HttpGetMetadata">
        <endpoint address="echo2" contract="IEcho" binding="basicHttpBinding" />
      </service>
    </services>
    <behaviors>
      <serviceBehaviors>
        <behavior name="HttpGetMetadata">
          <serviceMetadata httpGetEnabled="true" />
        </behavior>
      </serviceBehaviors>
    </behaviors>
  </system.serviceModel>
</configuration>
<!-- </snippet1> -->


```
