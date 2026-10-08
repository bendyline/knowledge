# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/ADApplicationBase/VB/source2.vb

Complete source file; linked examples may select a region or line range.

```
' <snippet2>
Imports System.Reflection

Class AppDomain4
    Public Shared Sub Main()
        ' Create application domain setup information.
        Dim domaininfo As new AppDomainSetup()
        domaininfo.ApplicationBase = "f:\work\development\latest"

        ' Create the application domain.
        Dim domain As AppDomain = AppDomain.CreateDomain("MyDomain", Nothing, domaininfo)

        ' Write application domain information to the console.
        Console.WriteLine("Host domain: " + AppDomain.CurrentDomain.FriendlyName)
        Console.WriteLine("child domain: " + domain.FriendlyName)
        Console.WriteLine("Application base is: " + domain.SetupInformation.ApplicationBase)

        ' Unload the application domain.
        AppDomain.Unload(domain)
    End Sub
End Class
' </snippet2>

```
