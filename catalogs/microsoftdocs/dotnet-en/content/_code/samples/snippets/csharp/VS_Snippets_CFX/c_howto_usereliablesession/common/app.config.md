# Source code: samples/snippets/csharp/VS_Snippets_CFX/c_howto_usereliablesession/common/app.config

Complete source file; linked examples may select a region or line range.

```
<!-- This is the config for the topic: HowTo Use Reliable Session -->
<!-- <snippet2211> -->
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <system.serviceModel>

    <client>
      <!-- 
        Specify wsHttpBinding binding and a binding configuration 
        to use
      -->
      <endpoint 
          address="http://localhost/servicemodelsamples/service.svc" 
          binding="wsHttpBinding" 
          bindingConfiguration="Binding1" 
          contract="Microsoft.ServiceModel.Samples.ICalculator" />
    </client>

    <!-- 
      Configures WSHttpBinding for reliable sessions with ordered 
      delivery
    -->
    <bindings>
      <wsHttpBinding>
        <binding name="Binding1">
          <reliableSession enabled="true" ordered="true" />
        </binding>
      </wsHttpBinding>
    </bindings>

  </system.serviceModel>
</configuration>
<!-- </snippet2211> -->
```
