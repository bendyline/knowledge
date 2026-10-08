---
 ms.topic: include
 author: duongau
 ms.service: azure-vpn-gateway
 ms.date: 08/04/2023
 ms.author: duau

# This include is used for both Virtual WAN and VPN Gateway articles. Any changes you make must apply address both services.
---

## <a name="rootcert"></a>Create a self-signed root certificate

Use the New-SelfSignedCertificate cmdlet to create a self-signed root certificate. For additional parameter information, see [New-SelfSignedCertificate](https://learn.microsoft.com/powershell/module/pki/new-selfsignedcertificate).

1. From a computer running Windows 10 or later, or Windows Server 2016, open a Windows PowerShell console with elevated privileges.
1. Create a self-signed root certificate. The following example creates a self-signed root certificate named 'P2SRootCert' that's automatically installed in 'Certificates-Current User\Personal\Certificates'. You can view the certificate by opening *certmgr.msc*, or *Manage User Certificates*.

   Make any needed modifications before using this sample. The 'NotAfter' parameter is optional. By default, without this parameter, the certificate expires in 1 year.

   ```powershell
   $params = @{
       Type = 'Custom'
       Subject = 'CN=P2SRootCert'
       KeySpec = 'Signature'
       KeyExportPolicy = 'Exportable'
       KeyUsage = 'CertSign'
       KeyUsageProperty = 'Sign'
       KeyLength = 2048
       HashAlgorithm = 'sha256'
       NotAfter = (Get-Date).AddMonths(24)
       CertStoreLocation = 'Cert:\CurrentUser\My'
   }
   $cert = New-SelfSignedCertificate @params
   ```

1. Leave the PowerShell console open and proceed with the next steps to generate a client certificate.

## <a name="clientcert"></a>Generate a client certificate

Each client computer that connects to a VNet using point-to-site must have a client certificate installed. You generate a client certificate from the self-signed root certificate, and then export and install the client certificate. If the client certificate isn't installed, authentication fails.

The following steps walk you through generating a client certificate from a self-signed root certificate. You may generate multiple client certificates from the same root certificate. When you generate client certificates using the steps below, the client certificate is automatically installed on the computer that you used to generate the certificate. If you want to install a client certificate on another client computer, export the certificate.

The examples use the [New-SelfSignedCertificate](https://learn.microsoft.com/powershell/module/pki/new-selfsignedcertificate) cmdlet to generate a client certificate.

### Example 1 - PowerShell console session still open

Use this example if you haven't closed your PowerShell console after creating the self-signed root certificate. This example continues from the previous section and uses the declared '$cert' variable. If you closed the PowerShell console after creating the self-signed root certificate, or are creating additional client certificates in a new PowerShell console session, use the steps in [Example 2](#ex2).

Modify and run the example to generate a client certificate. If you run the following example without modifying it, the result is a client certificate named 'P2SChildCert'. If you want to name the child certificate something else, modify the CN value. Don't change the TextExtension when running this example. The client certificate that you generate is automatically installed in 'Certificates - Current User\Personal\Certificates' on your computer.

```powershell

   $params = @{
       Type = 'Custom'
       Subject = 'CN=P2SChildCert'
       DnsName = 'P2SChildCert'
       KeySpec = 'Signature'
       KeyExportPolicy = 'Exportable'
       KeyLength = 2048
       HashAlgorithm = 'sha256'
       NotAfter = (Get-Date).AddMonths(18)
       CertStoreLocation = 'Cert:\CurrentUser\My'
       Signer = $cert
       TextExtension = @(
        '2.5.29.37={text}1.3.6.1.5.5.7.3.2')
   }
   New-SelfSignedCertificate @params
```

### <a name="ex2"></a>Example 2 - New PowerShell console session

If you're creating additional client certificates, or aren't using the same PowerShell session that you used to create your self-signed root certificate, use the following steps:

1. Identify the self-signed root certificate that is installed on the computer. This cmdlet returns a list of certificates that are installed on your computer.

   ```powershell
   Get-ChildItem -Path "Cert:\CurrentUser\My"
   ```

1. Locate the subject name from the returned list, then copy the thumbprint that is located next to it to a text file. In the following example, there are two certificates. The CN name is the name of the self-signed root certificate from which you want to generate a child certificate. In this case, 'P2SRootCert'.

   ```
   Thumbprint                                Subject
   ----------                                -------
   AED812AD883826FF76B4D1D5A77B3C08EFA79F3F  CN=P2SChildCert4
   7181AA8C1B4D34EEDB2F3D3BEC5839F3FE52D655  CN=P2SRootCert
   ```

1. Declare a variable for the root certificate using the thumbprint from the previous step. Replace THUMBPRINT with the thumbprint of the root certificate from which you want to generate a child certificate.

   ```powershell
   $cert = Get-ChildItem -Path "Cert:\CurrentUser\My\<THUMBPRINT>"
   ```

   For example, using the thumbprint for P2SRootCert in the previous step, the variable looks like this:

   ```powershell
   $cert = Get-ChildItem -Path "Cert:\CurrentUser\My\7181AA8C1B4D34EEDB2F3D3BEC5839F3FE52D655"
   ```

1. Modify and run the example to generate a client certificate. If you run the following example without modifying it, the result is a client certificate named 'P2SChildCert'. If you want to name the child certificate something else, modify the CN value. Don't change the TextExtension when running this example. The client certificate that you generate is automatically installed in 'Certificates - Current User\Personal\Certificates' on your computer.

   ```powershell
   $params = @{
       Type = 'Custom'
       Subject = 'CN=P2SChildCert'
       DnsName = 'P2SChildCert1'
       KeySpec = 'Signature'
       KeyExportPolicy = 'Exportable'
       KeyLength = 2048
       HashAlgorithm = 'sha256'
       NotAfter = (Get-Date).AddMonths(18)
       CertStoreLocation = 'Cert:\CurrentUser\My'
       Signer = $cert
       TextExtension = @(
        '2.5.29.37={text}1.3.6.1.5.5.7.3.2')
   }
   New-SelfSignedCertificate @params
   ```

## <a name="cer"></a>Export the root certificate public key (.cer)

After you create a self-signed root certificate, export the root certificate .cer file (not the private key). You'll later upload the necessary certificate data contained in the file to Azure. The following steps help you export the .cer file for your self-signed root certificate and retrieve the necessary certificate data.

1. To get the certificate *.cer* file, open **Manage user certificates**.

   Locate the self-signed root certificate, typically in **Certificates - Current User\Personal\Certificates**, and right-click. Select **All Tasks** -> **Export**. This opens the **Certificate Export Wizard**.

   If you can't find the certificate under "Current User\Personal\Certificates", you might have accidentally opened **Certificates - Local Computer**, rather than **Certificates - Current User**.

   Screenshot shows the Certificates window with All Tasks  then Export selected.

1. In the wizard, select **Next**.

1. Select **No, do not export the private key**, and then select **Next**.

1. On the **Export File Format** page, select **Base-64 encoded X.509 (.CER).**, and then select **Next**.

1. For **File to Export**, **Browse** to the location to which you want to export the certificate. For **File name**, name the certificate file. Then, select **Next**.

1. Select **Finish** to export the certificate.

1. You see a confirmation saying **The export was successful**.

1. Go to the location where you exported the certificate and open it using a text editor, such as Notepad. If you exported the certificate in the required Base-64 encoded X.509 (.CER) format, you see text similar to the following example. The section highlighted in blue contains the information that you copy and upload to Azure.

   Screenshot shows the CER file open in Notepad with the certificate data highlighted.

   If your file doesn't look similar to the example, typically that means you didn't export it using the Base-64 encoded X.509(.CER) format. Additionally, if you use a text editor other than Notepad, understand that some editors can introduce unintended formatting in the background. This can create problems when uploaded the text from this certificate to Azure.


### Export the self-signed root certificate and private key to store it (optional)

You may want to export the self-signed root certificate and store it safely as backup. If need be, you can later install it on another computer and generate more client certificates. To export the self-signed root certificate as a .pfx, select the root certificate and use the same steps as described in [Export a client certificate](#clientexport).

## <a name="clientexport"></a>Export the client certificate

When you generate a client certificate, it's automatically installed on the computer that you used to generate it. If you want to install the client certificate on another client computer, you need to first export the client certificate.

1. To export a client certificate, open **Manage user certificates**. The client certificates that you generated are, by default, located in 'Certificates - Current User\Personal\Certificates'. Right-click the client certificate that you want to export, click **all tasks**, and then click **Export** to open the **Certificate Export Wizard**.

   Screenshot shows the Certificates window with All Tasks and Export selected.

1. In the Certificate Export Wizard, click **Next** to continue.

1. Select **Yes, export the private key**, and then click **Next**.

1. On the **Export File Format** page, leave the defaults selected. Make sure that **Include all certificates in the certification path if possible** is selected. This setting additionally exports the root certificate information that is required for successful client authentication. Without it, client authentication fails because the client doesn't have the trusted root certificate. Then, click **Next**.

   Screenshot for export file format page.

1. On the **Security** page, you must protect the private key. If you select to use a password, make sure to record or remember the password that you set for this certificate. Then, click **Next**.

1. On the **File to Export**, **Browse** to the location to which you want to export the certificate. For **File name**, name the certificate file. Then, click **Next**.

1. Click **Finish** to export the certificate.
