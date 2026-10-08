# Source code: samples/snippets/visualbasic/VS_Snippets_CFX/c_referencingcertificatesconsistently/vb/source.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.ServiceModel
Imports System.ServiceModel.Channels
Imports System.ServiceModel.Security.Tokens

Namespace HowToReferenceCertificates
    Public Class Test

        Shared Sub Main()
        End Sub

        '<snippet1>
        Public Function CreateClientBinding() As Binding

            Dim abe As AsymmetricSecurityBindingElement = CType(SecurityBindingElement.CreateMutualCertificateDuplexBindingElement _
                (MessageSecurityVersion.WSSecurity10WSTrustFebruary2005WSSecureConversationFebruary2005WSSecurityPolicy11BasicSecurityProfile10), _
                AsymmetricSecurityBindingElement)

            abe.SetKeyDerivation(False)

            Dim istp As X509SecurityTokenParameters = TryCast(abe.InitiatorTokenParameters, X509SecurityTokenParameters)

            If istp IsNot Nothing Then
                istp.X509ReferenceStyle = X509KeyIdentifierClauseType.IssuerSerial
            End If

            Dim rstp As X509SecurityTokenParameters = TryCast(abe.RecipientTokenParameters, X509SecurityTokenParameters)
            If rstp IsNot Nothing Then
                rstp.X509ReferenceStyle = X509KeyIdentifierClauseType.IssuerSerial
            End If

            Return New CustomBinding(abe, New HttpTransportBindingElement())
        End Function
        '</snippet1>

    End Class
End Namespace

```
