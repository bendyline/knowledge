# Source code: samples/snippets/visualbasic/VS_Snippets_CFX/c_howto_createcontractwithinterface/vb/source.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.ServiceModel

Namespace Samples

    '<snippet1>

    <ServiceContract()> _
    Public Interface ICalculator
        <OperationContract()> _
        Function Add(ByVal n1 As Double, ByVal n2 As Double) As Double
        <OperationContract()> _
        Function Subtract(ByVal n1 As Double, ByVal n2 As Double) As Double
        <OperationContract()> _
        Function Multiply(ByVal n1 As Double, ByVal n2 As Double) As Double
        <OperationContract()> _
        Function Divide(ByVal n1 As Double, ByVal n2 As Double) As Double
    End Interface

    '</snippet1>


    Public Class Test
        Public Shared Sub Main()
        End Sub

    End Class
End Namespace

```
