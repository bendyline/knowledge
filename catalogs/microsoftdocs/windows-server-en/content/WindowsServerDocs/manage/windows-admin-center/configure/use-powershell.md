---
title: Use PowerShell to manage Windows Admin Center settings
description: Learn how to use PowerShell to Manage Windows Admin Center Settings and Configuration
ms.topic: how-to
author: robinharwood
ms.author: roharwoo
ms.date: 11/21/2019
---

# Use PowerShell to manage Windows Admin Center settings

If you have a large organization with multiple Windows Admin Center servers, you can use PowerShell to configure the list of connections and extensions on multiple servers at a time.

## Use PowerShell to import or export your connections (with tags)


```powershell
# Load the module
Import-Module "$env:'Program Files'\WindowsAdminCenter\PowerShellModules\Microsoft.WindowsAdminCenter.ConnectionTools"
# Available cmdlets: Export-WACConnection, Import-WACConnection

# Export connections (including tags) to a .csv file
Export-WACConnection "https://wac.contoso.com" -fileName "WAC-connections.csv"
# Import connections (including tags) from a .csv file
Import-WACConnection "https://wac.contoso.com" -fileName "WAC-connections.csv" -AccessKey "<key string>"
# Import connections (including tags) from .csv files, and remove any connections that are not explicitly in the imported file by using the -prune switch parameter 
Import-WACConnection "https://wac.contoso.com" -fileName "WAC-connections.csv" -AccessKey "<key string>" -prune
```
> **Important:**
> The `-AccessKey` field is required when importing connections, but it's not required for exporting connections. Your can find your Windows Admin Center access key can be found in the **Advanced** tab in Windows Admin Center settings.
>
> When you use form login authentication to access Windows Admin Center, you need to provide credentials to import and export connections. You can pass credentials by using the following command:
> ```powershell
> # Export connections by using credentials
> Export-WACConnection "https://wac.contoso.com" -fileName "WAC-connections.csv" -AccessKey "<key string>" -Credentials (Get-Credential)
> # Import connections by using credentials
> Import-WACConnection -Endpoint "https://wac.contoso.com" -FileName "WAC-connections.csv" -AccessKey "<key string>" -Credentials (Get-Credential)

### CSV file format for importing connections

The format of the CSV file starts with the following four headings, followed by each connection on a new line.

- `name`: The FQDN of the connection.

- `type`: The connection type. For the default connections included with Windows Admin Center, use one of the following strings:

  | Connection type | Connection string |
  | --- | --- |
  | Windows Server | `msft.sme.connection-type.server` |
  | Failover cluster | `msft.sme.connection-type.cluster` |

- `tags`: Pipe-separated tags.

- `groupId`: The column for shared connections. Use the value `global` in this column to make a shared connection.

> **Note:**
> Modifying the shared connections is limited to gateway administrators. Any user can use PowerShell to modify their personal connection list.

### Example CSV file for importing connections

```
"name","type","tags","groupId"
"myServer.contoso.com","msft.sme.connection-type.server","hyperv"
"myDesktop.contoso.com","msft.sme.connection-type.windows-server","hyperv"
"teamcluster.contoso.com","msft.sme.connection-type.cluster","legacyCluster|WS2016","global"
"myHCIcluster.contoso.com,"msft.sme.connection-type.cluster","myHCIcluster|hyperv|JIT|WS2019"
"teamclusterNode.contoso.com","msft.sme.connection-type.server","legacyCluster|WS2016","global"
"myHCIclusterNode.contoso.com","msft.sme.connection-type.server","myHCIcluster|hyperv|JIT|WS2019"
```

> **Note:**
> The CSV file is case-sensitive.

## Import RDCMan connections

Use the following script to export saved connections in [RDCMan](https://blogs.technet.microsoft.com/rmilne/2014/11/19/remote-desktop-connection-manager-download-rdcman-2-7/) to a file. You can then import the file into Windows Admin Center and maintain your RDCMan grouping hierarchy by using tags.

1. Copy and paste the following code into your PowerShell session:

   ```powershell
   #Helper function for RdgToWacCsv
   function AddServers {
    param (
    [Parameter(Mandatory = $true)]
    [Xml.XmlLinkedNode]
    $node,
    [Parameter()]
    [String[]]
    $tags,
    [Parameter(Mandatory = $true)]
    [String]
    $csvPath
    )
    if ($node.LocalName -eq 'server') {
        $serverName = $node.properties.name
        $tagString = $tags -join "|"
        Add-Content -Path $csvPath -Value ('"'+ $serverName + '","msft.sme.connection-type.server","'+ $tagString +'"')
    } 
    elseif ($node.LocalName -eq 'group' -or $node.LocalName -eq 'file') {
        $groupName = $node.properties.name
        $tags+=$groupName
        $currNode = $node.properties.NextSibling
        while ($currNode) {
            AddServers -node $currNode -tags $tags -csvPath $csvPath
            $currNode = $currNode.NextSibling
        }
    } 
    else {
        # Node type isn't relevant to tagging or adding connections in Windows Admin Center
    }
    return
   }

   <#
   .SYNOPSIS
   Convert an .rdg file from Remote Desktop Connection Manager into a .csv that can be imported into Windows Admin Center, maintaining groups via server tags. This will not modify the existing .rdg file and will create a new .csv file

    .DESCRIPTION
    This converts an .rdg file into a .csv that can be imported into Windows Admin Center.

    .PARAMETER RDGfilepath
    The path of the .rdg file to be converted. This file will not be modified, only read.

    .PARAMETER CSVdirectory
    Optional. The directory you want to export the new .csv file. If it's not provided, the new file is created in the same directory as the .rdg file.

    .EXAMPLE
    C:\PS> RdgToWacCsv -RDGfilepath "rdcmangroup.rdg"
    #>
   function RdgToWacCsv {
    param(
        [Parameter(Mandatory = $true)]
        [String]
        $RDGfilepath,
        [Parameter(Mandatory = $false)]
        [String]
        $CSVdirectory
    )
    [xml]$RDGfile = Get-Content -Path $RDGfilepath
    $node = $RDGfile.RDCMan.file
    if (!$CSVdirectory){
        $csvPath = [System.IO.Path]::GetDirectoryName($RDGfilepath) + [System.IO.Path]::GetFileNameWithoutExtension($RDGfilepath) + "_WAC.csv"
    } else {
        $csvPath = $CSVdirectory + [System.IO.Path]::GetFileNameWithoutExtension($RDGfilepath) + "_WAC.csv"
    }
    New-item -Path $csvPath
    Add-Content -Path $csvPath -Value '"name","type","tags"'
    AddServers -node $node -csvPath $csvPath
    Write-Host "Converted $RDGfilepath `nOutput: $csvPath"
   }
   ```

2. To create a CSV file, run the following command:

   ```powershell
   RdgToWacCsv -RDGfilepath "path\to\myRDCManfile.rdg"
   ```

3. Import the resulting CSV file into Windows Admin Center. Tags in the connection list represent your RDCMan grouping hierarchy.


## Manage Windows Admin Center extensions with PowerShell


```powershell
# Add the module to the current session
Import-Module "$env:ProgramFiles\windows admin center\PowerShell\Modules\ExtensionTools"
# Available cmdlets: Get-Feed, Add-Feed, Remove-Feed, Get-Extension, Install-Extension, Uninstall-Extension, Update-Extension

# List feeds
Get-Feed "https://wac.contoso.com"

# Add a new extension feed
Add-Feed -GatewayEndpoint "https://wac.contoso.com" -Feed "\\WAC\our-private-extensions"

# Remove an extension feed
Remove-Feed -GatewayEndpoint "https://wac.contoso.com" -Feed "\\WAC\our-private-extensions"

# List all extensions
Get-Extension "https://wac.contoso.com"

# Install an extension (locate the latest version from all feeds and install it)
Install-Extension -GatewayEndpoint "https://wac.contoso.com" "msft.sme.containers"

# Install an extension (latest version from a specific feed, if the feed is not present, it will be added)
Install-Extension -GatewayEndpoint "https://wac.contoso.com" "msft.sme.containers" -Feed "https://aka.ms/sme-extension-feed"

# Install an extension (install a specific version)
Install-Extension "https://wac.contoso.com" "msft.sme.certificate-manager" "0.133.0"

# Uninstall-Extension
Uninstall-Extension "https://wac.contoso.com" "msft.sme.containers"

# Update-Extension
Update-Extension "https://wac.contoso.com" "msft.sme.containers"
```

> **Note:**
> You must be gateway administrator to modify Windows Admin Center extensions with PowerShell.

### Additional References

* [Deploy a highly available Windows Admin Center gateway on a cluster](../deploy/high-availability.md)
* [Deploy a Windows Admin Center gateway in Azure using Cloud Shell](../azure/deploy-wac-in-azure.md)
