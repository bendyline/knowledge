# Source code: docs/framework/wcf/snippets/specifying-an-endpoint-address/serviceapp2.config

Complete source file; linked examples may select a region or line range.

```
<?xml version="1.0" encoding="utf-8" ?>
<!-- <snippet5> -->
<configuration>
  <system.serviceModel>
    <services>
      <service name="UE.Samples.HelloService"
               behaviorConfiguration="HelloServiceBehavior">
        <endpoint address="/Address1"
                  binding="basicHttpBinding" 
                  contract="UE.Samples.IHello"/>

        <endpoint address="mex"
                  binding="mexHttpBinding"
                  contract="IMetadataExchange" />
      </service>
    </services>
    <behaviors>
      <serviceBehaviors>
        <behavior name="HelloServiceBehavior">
          <serviceMetadata httpGetEnabled="true" />
        </behavior>
      </serviceBehaviors>
    </behaviors>
  </system.serviceModel>
</configuration>
<!-- </snippet5> -->
```
