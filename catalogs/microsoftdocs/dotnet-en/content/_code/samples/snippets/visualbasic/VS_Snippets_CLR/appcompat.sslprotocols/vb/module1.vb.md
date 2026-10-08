# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/appcompat.sslprotocols/vb/module1.vb

Complete source file; linked examples may select a region or line range.

```
Module Module1

    Sub Main()
        ' <Snippet1>
        Const DisableCachingName As String = "TestSwitch.LocalAppContext.DisableCaching"
        Const DontEnableSchUseStrongCryptoName As String = "Switch.System.Net.DontEnableSchUseStrongCrypto"
        AppContext.SetSwitch(DisableCachingName, True)
        AppContext.SetSwitch(DontEnableSchUseStrongCryptoName, True)
        ' </Snippet1>
    End Sub

End Module

```
