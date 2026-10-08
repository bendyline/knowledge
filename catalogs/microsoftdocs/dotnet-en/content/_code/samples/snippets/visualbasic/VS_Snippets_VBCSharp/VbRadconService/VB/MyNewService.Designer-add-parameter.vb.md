# Source code: samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbRadconService/VB/MyNewService.Designer-add-parameter.vb

Complete source file; linked examples may select a region or line range.

```
Shared Sub Main(ByVal cmdArgs() As String)
    Dim ServicesToRun() As System.ServiceProcess.ServiceBase = New System.ServiceProcess.ServiceBase() {New MyNewService(cmdArgs)}
    System.ServiceProcess.ServiceBase.Run(ServicesToRun)
End Sub

```
