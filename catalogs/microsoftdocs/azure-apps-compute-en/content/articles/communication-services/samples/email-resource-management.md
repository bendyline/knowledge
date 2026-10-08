---
title: Automate email resource management
titleSuffix: An Azure Communication Services Automation Sample
description: This article describes how to automate the creation of Communication Services and Email Communication Services. This article also describes how to manage custom domains, configure DNS records, and verify domains.
author: ddouglas-msft
manager: komivi.agbakpem
services: azure-communication-services

ms.author: ddouglas
ms.date: 01/16/2025
ms.topic: tutorial
ms.service: azure-communication-services
ms.subservice: email
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-ps-azclips-azclipython
---

# Automate email resource management


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


**Applies to: platform-powershell**


Get started with Azure PowerShell to automate the creation of Azure Communication Services, Email Communication Services, manage custom domains, configure DNS records, verify domains, and domain linking to communication resource.

In this sample, we describe what the sample does and the prerequisites you need before running it locally on your machine.

This article describes how to use Azure PowerShell to automate the creation of Azure Communication Services and Email Communication Services. It also describes the process of managing custom domains, configuring DNS records (such as Domain, SPF, DKIM, DKIM2), verifying domains, and domain linking to communication resource.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A DNS zone in Azure to manage your domains.
- The latest [Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azps-windows).

## Prerequisite check

- In a command prompt, run the `powershell -command $PSVersionTable.PSVersion` command to check whether PowerShell is installed.

## Initialize all the Parameters

Before proceeding, define the variables needed for setting up the ACS, ECS, and domains, along with DNS configuration for the domains. Modify these variables based on your environment:

```azurepowershell-interactive
# Parameters for configuration

# Define the name of the Azure resource group where resources are created
$resourceGroup = "ContosoResourceProvider1"

# Specify the region where the resources are created
$dataLocation = "United States"

# Define the name of the Azure Communication Service resource
$commServiceName = "ContosoAcsResource1"

# Define the name of the Email Communication Service resource
$emailServiceName = "ContosoEcsResource1"

# Define the DNS zone name where the domains are managed (replace with actual DNS zone)
$dnsZoneName = "contoso.net"

# Define the list of domains to be created and managed (replace with your own list of domains)
$domains = @(
    "sales.contoso.net",
    "marketing.contoso.net",
    "support.contoso.net",
    "technical.contoso.net",
    "info.contoso.net"
)
```

## Connect to Azure Account

Before performing any actions with Azure resources, authenticate using the `Connect-AzAccount` cmdlet. This process enables you to sign in and authenticate your Azure account for further tasks:

```azurepowershell-interactive
# Attempt to authenticate the Azure session using the Connect-AzAccount cmdlet
try {
    # Output message to indicate the authentication process is starting
    Write-Host "Authenticating to Azure"

    # The Connect-AzAccount cmdlet is used to authenticate the Azure account
    Connect-AzAccount
}
catch {
    # If there is an error during authentication, display the error message
    Write-Host "Error authenticating to Azure"

    # Exit the script with an error code (1) if authentication fails
    exit 1
}
```

## Create an Azure Communication Service (ACS) resource

This part of the script creates an Azure Communication Service resource:

```azurepowershell-interactive
# Attempt to create the Communication Service resource in the specified resource group
try {
    # Output message to indicate the creation of the Communication Service resource is starting
    Write-Host "Creating Communication resource - $commServiceName"

    # The New-AzCommunicationService cmdlet is used to create a new Communication Service resource
    New-AzCommunicationService -ResourceGroupName $resourceGroup -Name $commServiceName -Location "Global" -DataLocation $dataLocation
}
catch {
    # If there is an error during the creation of the Communication Service resource, display the error message
    Write-Host "Error creating Communication resource"

    # Exit the script with an error code (1) if the creation of the Communication Service resource fails
    exit 1
}
```

## Create Email Communication Service (ECS) resource

This part of the script creates an Email Communication Service resource:

```azurepowershell-interactive
# Attempt to create the Email Communication Service resource in the specified resource group
try {
    # Output message to indicate the creation of the Email Communication Service resource is starting
    Write-Host "Creating Email Communication resource - $emailServiceName"

    # The New-AzEmailService cmdlet is used to create a new Email Communication Service resource
    New-AzEmailService -ResourceGroupName $resourceGroup -Name $emailServiceName -DataLocation $dataLocation
}
catch {
    # If there is an error during the creation of the Email Communication Service resource, display the error message
    Write-Host "Error creating Email Communication resource: $_"

    # Exit the script with an error code (1) if the creation of the Email Communication Service resource fails
    exit 1
}
```

## Create domains and add records set to DNS

Automate domain creation, configuration, and DNS record setup (including Domain, SPF, DKIM, DKIM2) for each domain:

> **Note:**
> The maximum limit for domain creation is 800 per Email Communication Service.

> **Note:**
> In our code, we work with five predefined domains, for which DNS records are added and configured.

```azurepowershell-interactive
# Loop through each domain in the predefined list of domains to create and configure them
foreach ($domainName in $domains){
    # Extract the subdomain prefix from the fully qualified domain name (for example: "sales" from "sales.contoso.net")
    $subDomainPrefix = $domainName.split('.')[0]

    # Output the domain name that is being created
    Write-Host "Creating domain: $domainName"
    try {
        # Attempt to create the domain in the Email Communication Service resource
        # The "CustomerManaged" option means that the domain management is handled by the customer
        New-AzEmailServiceDomain -ResourceGroupName $resourceGroup -EmailServiceName $emailServiceName -Name $domainName -DomainManagement "CustomerManaged"
    }
    catch {
        # If domain creation fails, display an error message and continue with the next domain
        Write-Host "Error creating domain $domainName"
        continue
    }

    # Wait for 5 seconds before proceeding to provide time for the domain creation to be processed
    Start-Sleep -Seconds 5

    # Retrieve the domain details after creation
    # The domain details are used during the DNS record setting request
    $domainDetailsJson = Get-AzEmailServiceDomain -ResourceGroupName $resourceGroup -EmailServiceName $emailServiceName -Name $domainName
    $domainDetails = $domainDetailsJson | ConvertFrom-Json
    
    # Add DNS records for the domain
    Add-RecordSetToDNS -subDomainPrefix $subDomainPrefix -domainName $domainName -dnsZoneName $dnsZoneName -resourceGroup $resourceGroup -emailServiceName $emailServiceName -domainDetails $domainDetails    
    
    # Check if domain details were successfully retrieved
    if ($domainDetails) {
        # Initiate domain verification process (Domain, SPF, DKIM, DKIM2)
        $result = Verify-Domain -domainName $domainName -resourceGroup $resourceGroup -emailServiceName $emailServiceName
        if ($result) {
            # If the domain is successfully verified, add it to the list of linked domains
            $linkedDomainIds += $($domainDetails.Id)
        }
        else {
            # If domain verification fails, display an error message
            Write-Host "Domain $domainName verification failed."
        }
    }
    else {
        # If domain details were not retrieved, display an error message
        Write-Host "Failed to add DNS records for domain $domainName."
    }
}

# Function to add DNS records (DKIM, DKIM2) for the domain
function Add-DkimRecord {
    param (
        [string]$dnsZoneName,
        [string]$resourceGroup,
        [string]$recordName,
        [string]$recordValue,
        [string]$recordType
    )
    try {
        # Output the attempt to check if the DNS record already exists
        Write-Host "Checking for existing $recordType record: $recordName"

        # Retrieves the DNS record set for the given subdomain prefix and type (CNAME) in the specified DNS zone and resource group. 
        # The first instance uses -ErrorAction SilentlyContinue to suppress any errors if the record set doesn't exist.
        $recordSet = Get-AzDnsRecordSet -ZoneName $dnsZoneName -ResourceGroupName $resourceGroup -name $recordName -RecordType $recordType -ErrorAction SilentlyContinue

        # If no existing record set is found (i.e., recordSet.Count is 0)
        if ($recordSet.Count -eq 0) {
            # Output a message stating that a new record is being created
            Write-Host "Creating new $recordType record: $recordName"

            # Creates a new DNS record set for the specified record type (CNAME) in the given zone and resource group
            # The TTL is set to 3600 seconds (1 hour)
            New-AzDnsRecordSet -Name $recordName -RecordType $recordType -ZoneName $dnsZoneName -ResourceGroupName $resourceGroup -Ttl 3600
            
            # Retrieve the newly created record set to add the record value
            $recordSet = Get-AzDnsRecordSet -ZoneName $dnsZoneName -ResourceGroupName $resourceGroup -name $recordName -RecordType $recordType
            
            # Add the provided record value to the newly created record set (such as CNAME)
            Add-AzDnsRecordConfig -RecordSet $recordSet -Cname $recordValue
            
            # Apply the changes and save the updated record set back to Azure DNS
            Set-AzDnsRecordSet -RecordSet $recordSet
        }
        else {
            # If the record already exists, notify that it has been found
            Write-Host "$recordType record already exists for: $recordName"
        }
    }
    catch {
        # If an error occurs during the execution of the try block, output an error message
        Write-Host "Error adding $recordType record for $recordName"
    }
}

# Function to add DNS records (Domain, SPF, DKIM, DKIM2) for the domain
function Add-RecordSetToDNS {
    param (
        [string]$subDomainPrefix,
        [string]$domainName,
        [string]$dnsZoneName,
        [string]$resourceGroup,
        [string]$emailServiceName,
        [PSObject]$domainDetails
    )
    try {
        # Output message indicating that DNS records are being added for the domain
        Write-Host "Adding DNS records for domain: $domainName"

        # Check if domain details are available
        if ($domainDetails) {
            # Retrieve the TXT record set for the domain
            # Retrieves the DNS record set for the given subdomain prefix and type (TXT) in the specified DNS zone and resource group. 
            # The first instance uses -ErrorAction SilentlyContinue to suppress any errors if the record set doesn't exist.
            $recordSetDomain = Get-AzDnsRecordSet -ZoneName $dnsZoneName -ResourceGroupName $resourceGroup -name $subDomainPrefix -recordtype txt -ErrorAction SilentlyContinue

            # If the TXT record set does not exist, create a new one
            if ($recordSetDomain.Count -eq 0) {
                New-AzDnsRecordSet -Name $subDomainPrefix -RecordType "TXT" -ZoneName $dnsZoneName -ResourceGroupName $resourceGroup -Ttl 3600
                $recordSetDomain = Get-AzDnsRecordSet -ZoneName $dnsZoneName -ResourceGroupName $resourceGroup -name $subDomainPrefix -recordtype txt
            }

            # Add the Domain verification record to the TXT record set
            Add-AzDnsRecordConfig -RecordSet $recordSetDomain -Value $($domainDetails.properties.VerificationRecords.Domain.Value)
            Set-AzDnsRecordSet -RecordSet $recordSetDomain

            # Check if the SPF record already added; if not, create and add it
            $existingSpfRecord = $recordSetDomain.Records | Where-Object { $_.Value -eq $domainDetails.properties.VerificationRecords.SPF.Value }
            if (-not $existingSpfRecord) {
                # Create and add the SPF record
                $RecordSetSPF = Get-AzDnsRecordSet -ZoneName $dnsZoneName -ResourceGroupName $resourceGroup -name $subDomainPrefix -recordtype txt
                Add-AzDnsRecordConfig -RecordSet $RecordSetSPF -Value $($domainDetails.properties.VerificationRecords.SPF.Value)
                Set-AzDnsRecordSet -RecordSet $RecordSetSPF                    
            }
            else {
                # If SPF record already exists, notify the user
                Write-Host "SPF record already exists for domain: $domainName"
            }

            # Call the Add-DkimRecord function for DKIM
            Add-DkimRecord -dnsZoneName $dnsZoneName -resourceGroup $resourceGroup -recordName "$($domainDetails.properties.VerificationRecords.DKIM.Name).$subDomainPrefix" -recordValue $domainDetails.properties.VerificationRecords.DKIM.Value -recordType "CNAME"

            # Call the Add-DkimRecord function for DKIM2
            Add-DkimRecord -dnsZoneName $dnsZoneName -resourceGroup $resourceGroup -recordName "$($domainDetails.properties.VerificationRecords.DKIM2.Name).$subDomainPrefix" -recordValue $domainDetails.properties.VerificationRecords.DKIM2.Value -recordType "CNAME"
        }
        else {
            # If domain details are not found, output an error message
            Write-Host "No domain details found for $domainName"
        }
    }
    catch {     
        # If an error occurs during the DNS record setup, output an error message
        Write-Host "Error adding DNS records for domain $domainName"
    }
}
```

## Verification of domains

Initiates the domain verification process for the domains, including Domain, SPF, DKIM, and DKIM2 verifications.

```azurepowershell-interactive
# This function initiates the domain verification process for the specified domain.
# It checks verification for four types: Domain, SPF, DKIM, and DKIM2.
function Verify-Domain {
    param (
        [string]$domainName,
        [string]$resourceGroup,
        [string]$emailServiceName
    )
    try {
        Write-Host "Initiating domain verification for $domainName"

        # Define the verification types: Domain, SPF, DKIM, and DKIM2
        $verificationTypes = @('Domain', 'SPF', 'DKIM', 'DKIM2')

        # Loop through each verification type and initiate the verification process
        foreach ($verificationType in $verificationTypes) {
            Invoke-AzEmailServiceInitiateDomainVerification -ResourceGroupName $resourceGroup -EmailServiceName $emailServiceName -DomainName $domainName -VerificationType $verificationType
        }

        # After initiating the verification, call the Poll function to check the verification status
        return Poll-ForDomainVerification -domainName $domainName -resourceGroup $resourceGroup -emailServiceName $emailServiceName
    }
    catch {
        Write-Host "Error during domain verification for $domainName" # Handle any error during the process
        return $false # Return false if verification fails
    }
}
```

## Link domains to the communication service

Once the domains are verified and DNS records are configured, you can link the domains to the Azure Communication Service:

> **Note:**
> The maximum limit for domain linking is 1000 per Azure Communication Service.

```azurepowershell-interactive
# Link domains to the communication service

# Once the domains have been verified and the necessary DNS records are configured, 
# this section of the script links those domains to the Azure Communication Service.
# Ensure that domain verification and DNS setup are completed before linking.

# Check if there are any domains that need to be linked (i.e., domains that were successfully verified)
if ($linkedDomainIds.Count -gt 0) {
    try {
        # Output message indicating that the domains are being linked to the communication service
        Write-Host "Linking domains to communication service."

        # Link the verified domains to the Azure Communication Service
        Update-AzCommunicationService -ResourceGroupName $resourceGroup -Name $commServiceName -LinkedDomain $linkedDomainIds

        # Output message indicating that the domains have been successfully linked
        Write-Host "Domains linked successfully."
    }
    catch {
        # If there is an error during the domain linking process, display an error message
        Write-Host "Error linking domains"
    }
}
else {
    # If there are no domains to link, output a message indicating that no domains are linked
    Write-Host "No domains linked."
}
```

## Complete PowerShell Script for Automating end to end resource creation

```azurepowershell-interactive
# Parameters for configuration

# Define the name of the Azure resource group where resources are created
$resourceGroup = "ContosoResourceProvider1"

# Specify the region where the resources are created
$dataLocation = "United States"

# Define the name of the Azure Communication Service resource
$commServiceName = "ContosoAcsResource1"

# Define the name of the Email Communication Service resource
$emailServiceName = "ContosoEcsResource1"

# Define the DNS zone name where the domains are managed (replace with actual DNS zone)
$dnsZoneName = "contoso.net"

# Define the list of domains to be created and managed (replace with your own list of domains)
$domains = @(
    "sales.contoso.net",
    "marketing.contoso.net",
    "support.contoso.net",
    "technical.contoso.net",
    "info.contoso.net"
)

# Function to add DNS records (DKIM, DKIM2) for the domain
function Add-DkimRecord {
    param (
        [string]$dnsZoneName,
        [string]$resourceGroup,
        [string]$recordName,
        [string]$recordValue,
        [string]$recordType
    )
    try {
        # Output the attempt to check if the DNS record already exists
        Write-Host "Checking for existing $recordType record: $recordName"

        # Retrieves the DNS record set for the given subdomain prefix and type (CNAME) in the specified DNS zone and resource group. 
        # The first instance uses -ErrorAction SilentlyContinue to suppress any errors if the record set doesn't exist.
        $recordSet = Get-AzDnsRecordSet -ZoneName $dnsZoneName -ResourceGroupName $resourceGroup -name $recordName -RecordType $recordType -ErrorAction SilentlyContinue

        # If no existing record set is found (i.e., recordSet.Count is 0)
        if ($recordSet.Count -eq 0) {
            # Output a message stating that a new record is being created
            Write-Host "Creating new $recordType record: $recordName"

            # Creates a new DNS record set for the specified record type (CNAME) in the given zone and resource group
            # The TTL is set to 3600 seconds (1 hour)
            New-AzDnsRecordSet -Name $recordName -RecordType $recordType -ZoneName $dnsZoneName -ResourceGroupName $resourceGroup -Ttl 3600
            
            # Retrieve the newly created record set to add the record value
            $recordSet = Get-AzDnsRecordSet -ZoneName $dnsZoneName -ResourceGroupName $resourceGroup -name $recordName -RecordType $recordType
            
            # Add the provided record value to the newly created record set (e.g., CNAME)
            Add-AzDnsRecordConfig -RecordSet $recordSet -Cname $recordValue
            
            # Apply the changes and save the updated record set back to Azure DNS
            Set-AzDnsRecordSet -RecordSet $recordSet
        }
        else {
            # If the record already exists, notify that it has been found
            Write-Host "$recordType record already exists for: $recordName"
        }
    }
    catch {
        # If an error occurs during the execution of the try block, output an error message
        Write-Host "Error adding $recordType record for $recordName"
    }
}

# Function to add DNS records (Domain, SPF, DKIM, DKIM2) for the domain
function Add-RecordSetToDNS {
    param (
        [string]$subDomainPrefix,
        [string]$domainName,
        [string]$dnsZoneName,
        [string]$resourceGroup,
        [string]$emailServiceName,
        [PSObject]$domainDetails
    )
    try {
        # Output message indicating that DNS records are being added for the domain
        Write-Host "Adding DNS records for domain: $domainName"

        # Check if domain details are available
        if ($domainDetails) {
            # Retrieve the TXT record set for the domain
            # Retrieves the DNS record set for the given subdomain prefix and type (TXT) in the specified DNS zone and resource group. 
            # The first instance uses -ErrorAction SilentlyContinue to suppress any errors if the record set doesn't exist.
            $recordSetDomain = Get-AzDnsRecordSet -ZoneName $dnsZoneName -ResourceGroupName $resourceGroup -name $subDomainPrefix -recordtype txt -ErrorAction SilentlyContinue

            # If the TXT record set does not exist, create a new one
            if ($recordSetDomain.Count -eq 0) {
                New-AzDnsRecordSet -Name $subDomainPrefix -RecordType "TXT" -ZoneName $dnsZoneName -ResourceGroupName $resourceGroup -Ttl 3600
                $recordSetDomain = Get-AzDnsRecordSet -ZoneName $dnsZoneName -ResourceGroupName $resourceGroup -name $subDomainPrefix -recordtype txt
            }

            # Add the Domain verification record to the TXT record set
            Add-AzDnsRecordConfig -RecordSet $recordSetDomain -Value $($domainDetails.properties.VerificationRecords.Domain.Value)
            Set-AzDnsRecordSet -RecordSet $recordSetDomain

            # Check if the SPF record already added; if not, create and add it
            $existingSpfRecord = $recordSetDomain.Records | Where-Object { $_.Value -eq $domainDetails.properties.VerificationRecords.SPF.Value }
            if (-not $existingSpfRecord) {
                # Create and add the SPF record
                $RecordSetSPF = Get-AzDnsRecordSet -ZoneName $dnsZoneName -ResourceGroupName $resourceGroup -name $subDomainPrefix -recordtype txt
                Add-AzDnsRecordConfig -RecordSet $RecordSetSPF -Value $($domainDetails.properties.VerificationRecords.SPF.Value)
                Set-AzDnsRecordSet -RecordSet $RecordSetSPF                    
            }
            else {
                # If SPF record already exists, notify the user
                Write-Host "SPF record already exists for domain: $domainName"
            }

            # Call the Add-DkimRecord function for DKIM
            Add-DkimRecord -dnsZoneName $dnsZoneName -resourceGroup $resourceGroup -recordName "$($domainDetails.properties.VerificationRecords.DKIM.Name).$subDomainPrefix" -recordValue $domainDetails.properties.VerificationRecords.DKIM.Value -recordType "CNAME"

            # Call the Add-DkimRecord function for DKIM2
            Add-DkimRecord -dnsZoneName $dnsZoneName -resourceGroup $resourceGroup -recordName "$($domainDetails.properties.VerificationRecords.DKIM2.Name).$subDomainPrefix" -recordValue $domainDetails.properties.VerificationRecords.DKIM2.Value -recordType "CNAME"
        }
        else {
            # If domain details are not found, output an error message
            Write-Host "No domain details found for $domainName"
        }
    }
    catch {     
        # If an error occurs during the DNS record setup, output an error message
        Write-Host "Error adding DNS records for domain $domainName"
    }
}

# Verification of domains
# This function initiates the domain verification process for the specified domain.
# It checks verification for four types: Domain, SPF, DKIM, and DKIM2.
function Verify-Domain {
    param (
        [string]$domainName,
        [string]$resourceGroup,
        [string]$emailServiceName
    )
    try {
        Write-Host "Initiating domain verification for $domainName"

        # Define the verification types: Domain, SPF, DKIM, and DKIM2
        $verificationTypes = @('Domain', 'SPF', 'DKIM', 'DKIM2')

        # Loop through each verification type and initiate the verification process
        foreach ($verificationType in $verificationTypes) {
            Invoke-AzEmailServiceInitiateDomainVerification -ResourceGroupName $resourceGroup -EmailServiceName $emailServiceName -DomainName $domainName -VerificationType $verificationType
        }

        # After initiating the verification, call the Poll function to check the verification status
        return Poll-ForDomainVerification -domainName $domainName -resourceGroup $resourceGroup -emailServiceName $emailServiceName
    }
    catch {
        Write-Host "Error during domain verification for $domainName" # Handle any error during the process
        return $false # Return false if verification fails
    }
}

# Function to poll for domain verification

# This function checks the verification status of a domain, including Domain, SPF, DKIM, and DKIM2.
# It keeps checking the verification status at regular intervals (defined by $delayBetweenAttempts)
# until the domain is verified or the maximum number of attempts ($maxAttempts) is reached.
function Poll-ForDomainVerification {
    param (
        [string]$domainName,
        [string]$resourceGroup,
        [string]$emailServiceName,
        [int]$maxAttempts = 10, # Maximum number of attempts to check the domain verification status (default: 10)
        [int]$delayBetweenAttempts = 10000 # Delay between attempts in milliseconds (default: 10 seconds)
    )

    try {
        # Loop through the attempts to check the domain verification status
        for ($attempt = 1; $attempt -le $maxAttempts; $attempt++) {
			# Fetch domain details to check the verification status
            $domainDetailsJson = Get-AzEmailServiceDomain -ResourceGroupName $resourceGroup -EmailServiceName $emailServiceName -Name $domainName
            $domainDetails = $domainDetailsJson | ConvertFrom-Json
			
            if ($domainDetails) {
				# Check if all verification states (Domain, SPF, DKIM, DKIM2) are 'Verified'
                if ($($domainDetails.properties.verificationStates.Domain.Status) -eq 'Verified' -and
                    $($domainDetails.properties.verificationStates.SPF.status) -eq 'Verified' -and
                    $($domainDetails.properties.verificationStates.DKIM.status) -eq 'Verified' -and
                    $($domainDetails.properties.verificationStates.DKIM2.status) -eq 'Verified') {
                    Write-Host "Domain verified successfully."
                    return $true # Return true if all verification states are 'Verified'
                }
            }
			
            # Wait for the specified delay before checking again
            Start-Sleep -Milliseconds $delayBetweenAttempts
        }
		
        # If the maximum attempts are reached and domain is still not verified, return false
        Write-Host "Domain verification failed or timed out."
        return $false
    }
    catch {
        # Catch any errors during the polling process and return false
        Write-Host "Error polling for domain verification"
        return $false
    }
}

# Connect to Azure
# Attempt to authenticate the Azure session using the Connect-AzAccount cmdlet
try {
    # Output message to indicate the authentication process is starting
    Write-Host "Authenticating to Azure"

    # The Connect-AzAccount cmdlet is used to authenticate the Azure account
    Connect-AzAccount
}
catch {
    # If there is an error during authentication, display the error message
    Write-Host "Error authenticating to Azure"

    # Exit the script with an error code (1) if authentication fails
    exit 1
}

# Create Communication resource
# Attempt to create the Communication Service resource in the specified resource group
try {
    # Output message to indicate the creation of the Communication Service resource is starting
    Write-Host "Creating Communication resource - $commServiceName"

    # The New-AzCommunicationService cmdlet is used to create a new Communication Service resource
    New-AzCommunicationService -ResourceGroupName $resourceGroup -Name $commServiceName -Location "Global" -DataLocation $dataLocation
}
catch {
    # If there is an error during the creation of the Communication Service resource, display the error message
    Write-Host "Error creating Communication resource"

    # Exit the script with an error code (1) if the creation of the Communication Service resource fails
    exit 1
}

# Create Email Communication resource
# Attempt to create the Email Communication Service resource in the specified resource group
try {
    # Output message to indicate the creation of the Email Communication Service resource is starting
    Write-Host "Creating Email Communication resource - $emailServiceName"

    # The New-AzEmailService cmdlet is used to create a new Email Communication Service resource
    New-AzEmailService -ResourceGroupName $resourceGroup -Name $emailServiceName -DataLocation $dataLocation
}
catch {
    # If there is an error during the creation of the Email Communication Service resource, display the error message
    Write-Host "Error creating Email Communication resource: $_"

    # Exit the script with an error code (1) if the creation of the Email Communication Service resource fails
    exit 1
}

# Initialize list to store linked domains
$linkedDomainIds = @()

# Create domains and DNS records
# Loop through each domain in the predefined list of domains to create and configure them
foreach ($domainName in $domains){
    # Extract the subdomain prefix from the fully qualified domain name (for example: "sales" from "sales.contoso.net")
    $subDomainPrefix = $domainName.split('.')[0]

    # Output the domain name that is being created
    Write-Host "Creating domain: $domainName"
    try {
        # Attempt to create the domain in the Email Communication Service resource
        # The "CustomerManaged" option means that the domain management is handled by the customer
        New-AzEmailServiceDomain -ResourceGroupName $resourceGroup -EmailServiceName $emailServiceName -Name $domainName -DomainManagement "CustomerManaged"
    }
    catch {
        # If domain creation fails, display an error message and continue with the next domain
        Write-Host "Error creating domain $domainName"
        continue
    }

    # Wait for 5 seconds before proceeding to provide time for the domain creation to be processed
    Start-Sleep -Seconds 5

    # Retrieve the domain details after creation
    $domainDetailsJson = Get-AzEmailServiceDomain -ResourceGroupName $resourceGroup -EmailServiceName $emailServiceName -Name $domainName
    $domainDetails = $domainDetailsJson | ConvertFrom-Json
    
    # Add DNS records for the domain
    Add-RecordSetToDNS -subDomainPrefix $subDomainPrefix -domainName $domainName -dnsZoneName $dnsZoneName -resourceGroup $resourceGroup -emailServiceName $emailServiceName -domainDetails $domainDetails    
    
    # Check if domain details were successfully retrieved
    if ($domainDetails) {
        # Initiate domain verification process (Domain, SPF, DKIM, DKIM2)
        $result = Verify-Domain -domainName $domainName -resourceGroup $resourceGroup -emailServiceName $emailServiceName
        if ($result) {
            # If the domain is successfully verified, add it to the list of linked domains
            $linkedDomainIds += $($domainDetails.Id)
        }
        else {
            # If domain verification fails, display an error message
            Write-Host "Domain $domainName verification failed."
        }
    }
    else {
        # If domain details were not retrieved, display an error message
        Write-Host "Failed to add DNS records for domain $domainName."
    }
}

# Link domains to the communication service
# Once the domains have been verified and the necessary DNS records are configured, 
# this section of the script links those domains to the Azure Communication Service.
# Ensure that domain verification and DNS setup are completed before linking.

# Check if there are any domains that need to be linked (i.e., domains that were successfully verified)
if ($linkedDomainIds.Count -gt 0) {
    try {
        # Output message indicating that the domains are being linked to the communication service
        Write-Host "Linking domains to communication service."

        # Link the verified domains to the Azure Communication Service
        Update-AzCommunicationService -ResourceGroupName $resourceGroup -Name $commServiceName -LinkedDomain $linkedDomainIds

        # Output message indicating that the domains have been successfully linked
        Write-Host "Domains linked successfully."
    }
    catch {
        # If there is an error during the domain linking process, display an error message
        Write-Host "Error linking domains"
    }
}
else {
    # If there are no domains to link, output a message indicating that no domains are linked
    Write-Host "No domains linked."
}
```



**Applies to: platform-azclips**


Get started with Azure CLI PowerShell to automate the creation of Azure Communication Services, Email Communication Services, manage custom domains, configure DNS records, verify domains, and domain linking to communication resource.

In this sample, we describe what the sample does and the prerequisites you need before running it locally on your machine.

This article describes how to use Azure CLI PowerShell to automate the creation of Azure Communication Services and Email Communication Services. It also describes the process of managing custom domains, configuring DNS records (such as Domain, SPF, DKIM, DKIM2), verifying domains and domain linking to communication resource.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A DNS zone in Azure to manage your domains.
- The latest [Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azps-windows).
- The latest [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).

## Prerequisite check

- In a command prompt, run the `powershell -command $PSVersionTable.PSVersion` command to check whether the PowerShell is installed.

```azurepowershell-interactive
powershell -command $PSVersionTable.PSVersion
```

- In a command prompt, run the `az --version` command to check whether the Azure CLI is installed.

```azurepowershell-interactive
az --version
```

- Before you can use the Azure CLI to manage your resources, [sign in to Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli). You can sign in running the ```az login``` command from the terminal and providing your credentials.

```azurepowershell-interactive
az login
```

## Initialize all the Parameters

Before proceeding, define the variables needed for setting up the ACS, ECS, and domains, along with DNS configuration for the domains. Modify these variables based on your environment:

```azurepowershell-interactive
# Variables
# Define the name of the Azure resource group where resources are created
$resourceGroup = "ContosoResourceProvider1"

# Specify the region where the resources are created. In this case, Europe.
$dataLocation = "europe"

# Define the name of the Azure Communication Service resource
$commServiceName = "ContosoAcsResource1"

# Define the name of the Email Communication Service resource
$emailServiceName = "ContosoEcsResource1"

# Define the DNS zone name where the domains are managed (replace with actual DNS zone)
$dnsZoneName = "contoso.net"

# Define the list of domains to be created and managed (replace with your own list of domains)
$domains = @(
    "sales.contoso.net",
    "marketing.contoso.net",
    "support.contoso.net",
    "technical.contoso.net",
    "info.contoso.net"
)
```

## Sign in to Azure account

Before performing any actions with Azure resources, authenticate using the `az login` cmdlet. This process enables you to sign in and authenticate your Azure account for further tasks:

```azurepowershell-interactive
# Log in to Azure
# Output message to indicate the authentication process is starting
Write-Host "Logging in to Azure..."
try {
    # Execute the Azure CLI login command
    az login
} catch {
    # If there is an error during authentication, display the error message
    Write-Host "Error during Azure login"

    # Exit the script with an error code (1) if authentication fails
    exit 1
}
```

## Create an Azure Communication Service (ACS) resource

This part of the script creates an Azure Communication Service resource:

```azurepowershell-interactive
# Create Communication resource
# Output message to indicate the creation of the Communication Service resource is starting
Write-Host "Creating Communication resource - $commServiceName"
try {
    # The az communication create cmdlet is used to create a new Communication Service resource
    az communication create --name $commServiceName --resource-group $resourceGroup --location global --data-location $dataLocation
} catch {
    # If there is an error during the creation of the Communication Service resource, display the error message
    Write-Host "Error while creating Communication resource"

    # Exit the script with an error code (1) if the creation of the Communication Service resource fails
    exit 1
}
```

## Create Email Communication Service (ECS) resource

This part of the script creates an Email Communication Service resource:

```azurepowershell-interactive
# Create Email Communication resource
# Output message to indicate the creation of the Email Communication Service resource is starting
Write-Host "Creating Email Communication resource - $emailServiceName"
try {
    # The az communication email create cmdlet is used to create a new Email Communication Service resource
    az communication email create --name $emailServiceName --resource-group $resourceGroup --location global --data-location $dataLocation
} catch {
    # If there is an error during the creation of the Email Communication Service resource, display the error message
    Write-Host "Error while creating Email Communication resource"

    # Exit the script with an error code (1) if the creation of the Email Communication Service resource fails
    exit 1
}
```

## Create domains

Automate the creation of email domains, by following command:

> **Note:**
> The maximum limit for domain creation is 800 per Email Communication Service.

> **Note:**
> In our code, we work with five predefined domains, for which DNS records are added and configured.

```azurepowershell-interactive
# Create the email domain in Email Communication Service.
# The command includes the domain name, resource group, email service name, location, and domain management type (CustomerManaged)
az communication email domain create --name $domainName --resource-group $resourceGroup --email-service-name $emailServiceName --location global --domain-management CustomerManaged
```

## Add records set to DNS

Add records to DNS record setup (including Domain, SPF, DKIM, DKIM2) for each domain.

```azurepowershell-interactive
# Function to add DNS records
function Add-RecordSetToDNS {
    param (
        [string]$domainName,
        [string]$subDomainPrefix
    )

    # Output a message indicating that DNS record sets are being added for the specified domain
    Write-Host "Adding DNS record sets for domain: $domainName"
    try {
        # Run the Azure CLI command to fetch domain details for the specified domain name
        $domainDetailsJson = az communication email domain show --resource-group $resourceGroup --email-service-name $emailServiceName --name $domainName
    } catch {
        # If an error occurs while fetching domain details, output an error message and exit the script
        Write-Host "Error fetching domain details for $domainName"
        exit 1
    }

    # If no domain details are returned, output a message and exit the script
    if (-not $domainDetailsJson) {
        Write-Host "Failed to fetch domain details for $domainName"
        exit 1
    }

    # Parse the JSON response to extract the necessary domain details
    $domainDetails = $domainDetailsJson | ConvertFrom-Json

    # Extract verification record values Domain, SPF and DKIM from the parsed JSON response
    # These values are used to create DNS records
    $dkimName = $domainDetails.verificationRecords.DKIM.name
    $dkimValue = $domainDetails.verificationRecords.DKIM.value
    $dkim2Name = $domainDetails.verificationRecords.DKIM2.name
    $dkim2Value = $domainDetails.verificationRecords.DKIM2.value
    $spfValue = $domainDetails.verificationRecords.SPF.value
    $domainValue = $domainDetails.verificationRecords.Domain.value
    try {
        # Create the TXT DNS record for the domain's verification value
        az network dns record-set txt create --name $subDomainPrefix --zone-name $dnsZoneName --resource-group $resourceGroup
        
        # Add the domain verification record to the TXT DNS record
        az network dns record-set txt add-record --resource-group $resourceGroup --zone-name $dnsZoneName --record-set-name $subDomainPrefix --value $domainValue
        
        # Add the SPF record value to the TXT DNS record
        az network dns record-set txt add-record --resource-group $resourceGroup --zone-name $dnsZoneName --record-set-name $subDomainPrefix --value "`"$spfValue`""
        
        # Create CNAME DNS records for DKIM verification
        az network dns record-set cname create --resource-group $resourceGroup --zone-name $dnsZoneName --name "$dkimName.$subDomainPrefix"
        
        # Add the DKIM record value to the CNAME DNS record
        az network dns record-set cname set-record --resource-group $resourceGroup --zone-name $dnsZoneName --record-set-name "$dkimName.$subDomainPrefix" --cname $dkimValue
        
        # Create a CNAME record for the second DKIM2 verification
        az network dns record-set cname create --resource-group $resourceGroup --zone-name $dnsZoneName --name "$dkim2Name.$subDomainPrefix"
        
        # Add the DKIM2 record value to the CNAME DNS record
        az network dns record-set cname set-record --resource-group $resourceGroup --zone-name $dnsZoneName --record-set-name "$dkim2Name.$subDomainPrefix" --cname $dkim2Value                
    } catch {
        # If an error occurs while adding DNS records, output an error message and exit the script
        Write-Host "Error while adding DNS records for domain $domainName"
        exit 1
    }

    # Return the domain details as an object for further use if needed
    return $domainDetails
}
```

## Verification of domains

Initiates the domain verification process for the domains, including Domain, SPF, DKIM, and DKIM2 verifications.

```azurepowershell-interactive
# Verify domain function
function Verify-Domain {
    param (
        [string]$domainName
    )

    Write-Host "Initiating domain verification for: $domainName"

    # Define the types of verification that need to be performed
    $verificationTypes = @("Domain", "SPF", "DKIM", "DKIM2")

    # Loop over each verification type and initiate the verification process via Azure CLI
    foreach ($verificationType in $verificationTypes) {
        try {
            # Run the Azure CLI command to initiate the verification process for each verification type
            az communication email domain initiate-verification --domain-name $domainName --email-service-name $emailServiceName --resource-group $resourceGroup --verification-type $verificationType
        } catch {
            Write-Host "Error initiating verification for $domainName"
            exit 1
        }
    }

    # Polling for domain verification
    $attempts = 0 # Track the number of verification attempts
    $maxAttempts = 10 # Set the maximum number of attempts to check domain verification status

    # Loop for polling and checking verification status up to maxAttempts times
    while ($attempts -lt $maxAttempts) {
        try {
            # Run the Azure CLI command to fetch the domain details
            $domainDetailsJson = az communication email domain show --resource-group $resourceGroup --email-service-name $emailServiceName --name $domainName
        } catch {
            # If an error occurs while fetching the domain verification status, output an error message and exit
            Write-Host "Error fetching domain verification status for $domainName"
            exit 1
        }

        # If no domain details are returned, output a message and exit the script
        if (-not $domainDetailsJson) {
            Write-Host "Failed to fetch domain verification details for $domainName"
            exit 1
        }

        # Parse the domain details JSON response
        $domainDetails = $domainDetailsJson | ConvertFrom-Json

        $dkimStatus = $domainDetails.verificationStates.DKIM.status
        $dkim2Status = $domainDetails.verificationStates.DKIM2.status
        $domainStatus = $domainDetails.verificationStates.Domain.status
        $spfStatus = $domainDetails.verificationStates.SPF.status

        # Check if all verification statuses are "Verified"
        if ($dkimStatus -eq 'Verified' -and $dkim2Status -eq 'Verified' -and $domainStatus -eq 'Verified' -and $spfStatus -eq 'Verified') {
            Write-Host "Domain verified successfully."
            return $true
        }

        # If verification is not yet complete, wait before checking again
        $attempts++
        Start-Sleep -Seconds 10
    }

    # If the maximum number of attempts is reached without successful verification, print failure message
    Write-Host "Domain $domainName verification failed or timed out."
    return $false
}
```

## Link domains to the communication service

Once the domains are verified and DNS records are configured, you can link the domains to the Azure Communication Service:

> **Note:**
> The maximum limit for domain linking is 1000 per Azure Communication Service.

```azurepowershell-interactive
# Linking domains to the communication service
if ($linkedDomainIds.Count -gt 0) {
    Write-Host "Linking domains to communication service."
    try {
        # Run the Azure CLI command to link the verified domains to the Communication service
        az communication update --name $commServiceName --resource-group $resourceGroup --linked-domains $linkedDomainIds

        # Output a success message if the domains were successfully linked
        Write-Host "Domains linked successfully."
    } catch {
        # If an error occurs while linking the domains, output an error message and exit the script
        Write-Host "Error linking domains"
        exit 1 # Exit the script with error code 1
    }
} else {
    # If no domains were linked, output a message indicating no domains to link
    Write-Host "No domains were linked."
}
```

## Complete PowerShell script with Azure CLI Commands for Automating End-to-End Resource Creation

```azurepowershell-interactive
# Variables
# Define the name of the Azure resource group where resources are created
$resourceGroup = "ContosoResourceProvider1"

# Specify the region where the resources are created. In this case, Europe.
$dataLocation = "europe"

# Define the name of the Azure Communication Service resource
$commServiceName = "ContosoAcsResource1"

# Define the name of the Email Communication Service resource
$emailServiceName = "ContosoEcsResource1"

# Define the DNS zone name where the domains are managed (replace with actual DNS zone)
$dnsZoneName = "contoso.net"

# Define the list of domains to be created and managed (replace with your own list of domains)
$domains = @(
    "sales.contoso.net",
    "marketing.contoso.net",
    "support.contoso.net",
    "technical.contoso.net",
    "info.contoso.net"
)

# Log in to Azure
# Output message to indicate the authentication process is starting
Write-Host "Logging in to Azure..."
try {
    # Execute the Azure CLI login command
    az login
} catch {
    # If there is an error during authentication, display the error message
    Write-Host "Error during Azure login"

    # Exit the script with an error code (1) if authentication fails
    exit 1
}

# Create Communication resource
# Output message to indicate the creation of the Communication Service resource is starting
Write-Host "Creating Communication resource - $commServiceName"
try {
    # The az communication create cmdlet is used to create a new Communication Service resource
    az communication create --name $commServiceName --resource-group $resourceGroup --location global --data-location $dataLocation
} catch {
    # If there is an error during the creation of the Communication Service resource, display the error message
    Write-Host "Error while creating Communication resource"

    # Exit the script with an error code (1) if the creation of the Communication Service resource fails
    exit 1
}

# Create Email Communication resource
# Output message to indicate the creation of the Email Communication Service resource is starting
Write-Host "Creating Email Communication resource - $emailServiceName"
try {
    # The az communication email create cmdlet is used to create a new Email Communication Service resource
    az communication email create --name $emailServiceName --resource-group $resourceGroup --location global --data-location $dataLocation
} catch {
    # If there is an error during the creation of the Email Communication Service resource, display the error message
    Write-Host "Error while creating Email Communication resource"

    # Exit the script with an error code (1) if the creation of the Email Communication Service resource fails
    exit 1
}

# Function to add DNS records
function Add-RecordSetToDNS {
    param (
        [string]$domainName,
        [string]$subDomainPrefix
    )

    # Output a message indicating that DNS record sets are being added for the specified domain
    Write-Host "Adding DNS record sets for domain: $domainName"
    try {
        # Run the Azure CLI command to fetch domain details for the specified domain name
        $domainDetailsJson = az communication email domain show --resource-group $resourceGroup --email-service-name $emailServiceName --name $domainName
    } catch {
        # If an error occurs while fetching domain details, output an error message and exit the script
        Write-Host "Error fetching domain details for $domainName"
        exit 1
    }

    # If no domain details are returned, output a message and exit the script
    if (-not $domainDetailsJson) {
        Write-Host "Failed to fetch domain details for $domainName"
        exit 1
    }

    # Parse the JSON response to extract the necessary domain details
    $domainDetails = $domainDetailsJson | ConvertFrom-Json

    # Extract verification record values Domain, SPF and DKIM from the parsed JSON response
    # These values are used to create DNS records
    $dkimName = $domainDetails.verificationRecords.DKIM.name
    $dkimValue = $domainDetails.verificationRecords.DKIM.value
    $dkim2Name = $domainDetails.verificationRecords.DKIM2.name
    $dkim2Value = $domainDetails.verificationRecords.DKIM2.value
    $spfValue = $domainDetails.verificationRecords.SPF.value
    $domainValue = $domainDetails.verificationRecords.Domain.value
    try {
        # Create the TXT DNS record for the domain's verification value
        az network dns record-set txt create --name $subDomainPrefix --zone-name $dnsZoneName --resource-group $resourceGroup
        
        # Add the domain verification record to the TXT DNS record
        az network dns record-set txt add-record --resource-group $resourceGroup --zone-name $dnsZoneName --record-set-name $subDomainPrefix --value $domainValue
        
        # Add the SPF record value to the TXT DNS record
        az network dns record-set txt add-record --resource-group $resourceGroup --zone-name $dnsZoneName --record-set-name $subDomainPrefix --value "`"$spfValue`""
        
        # Create CNAME DNS records for DKIM verification
        az network dns record-set cname create --resource-group $resourceGroup --zone-name $dnsZoneName --name "$dkimName.$subDomainPrefix"
        
        # Add the DKIM record value to the CNAME DNS record
        az network dns record-set cname set-record --resource-group $resourceGroup --zone-name $dnsZoneName --record-set-name "$dkimName.$subDomainPrefix" --cname $dkimValue
        
        # Create a CNAME record for the second DKIM2 verification
        az network dns record-set cname create --resource-group $resourceGroup --zone-name $dnsZoneName --name "$dkim2Name.$subDomainPrefix"
        
        # Add the DKIM2 record value to the CNAME DNS record
        az network dns record-set cname set-record --resource-group $resourceGroup --zone-name $dnsZoneName --record-set-name "$dkim2Name.$subDomainPrefix" --cname $dkim2Value                
    } catch {
        # If an error occurs while adding DNS records, output an error message and exit the script
        Write-Host "Error while adding DNS records for domain $domainName"
        exit 1
    }

    # Return the domain details as an object for further use if needed
    return $domainDetails
}

# Verify domain function
function Verify-Domain {
    param (
        [string]$domainName
    )

    Write-Host "Initiating domain verification for: $domainName"

    # Define the types of verification that need to be performed
    $verificationTypes = @("Domain", "SPF", "DKIM", "DKIM2")

    # Loop over each verification type and initiate the verification process via Azure CLI
    foreach ($verificationType in $verificationTypes) {
        try {
            # Run the Azure CLI command to initiate the verification process for each verification type
            az communication email domain initiate-verification --domain-name $domainName --email-service-name $emailServiceName --resource-group $resourceGroup --verification-type $verificationType
        } catch {
            Write-Host "Error initiating verification for $domainName"
            exit 1
        }
    }

    # Polling for domain verification
    $attempts = 0 # Track the number of verification attempts
    $maxAttempts = 10 # Set the maximum number of attempts to check domain verification status

    # Loop for polling and checking verification status up to maxAttempts times
    while ($attempts -lt $maxAttempts) {
        try {
            # Run the Azure CLI command to fetch the domain details
            $domainDetailsJson = az communication email domain show --resource-group $resourceGroup --email-service-name $emailServiceName --name $domainName
        } catch {
            # If an error occurs while fetching the domain verification status, output an error message and exit
            Write-Host "Error fetching domain verification status for $domainName"
            exit 1
        }

        # If no domain details are returned, output a message and exit the script
        if (-not $domainDetailsJson) {
            Write-Host "Failed to fetch domain verification details for $domainName"
            exit 1
        }

        # Parse the domain details JSON response
        $domainDetails = $domainDetailsJson | ConvertFrom-Json

        $dkimStatus = $domainDetails.verificationStates.DKIM.status
        $dkim2Status = $domainDetails.verificationStates.DKIM2.status
        $domainStatus = $domainDetails.verificationStates.Domain.status
        $spfStatus = $domainDetails.verificationStates.SPF.status

        # Check if all verification statuses are "Verified"
        if ($dkimStatus -eq 'Verified' -and $dkim2Status -eq 'Verified' -and $domainStatus -eq 'Verified' -and $spfStatus -eq 'Verified') {
            Write-Host "Domain verified successfully."
            return $true
        }

        # If verification is not yet complete, wait before checking again
        $attempts++
        Start-Sleep -Seconds 10
    }

    # If the maximum number of attempts is reached without successful verification, print failure message
    Write-Host "Domain $domainName verification failed or timed out."
    return $false
}

# Main loop to create and verify domains
# List to store the IDs of successfully verified domains
$linkedDomainIds = @()

# Loop through each domain in the domains list
foreach ($domainName in $domains) {
    # Extract the subdomain prefix from the fully qualified domain name (for example: "sales" from "sales.contoso.net")
    $subDomainPrefix = $domainName.Split('.')[0]
    try {
        # Output the domain name that is being created
        Write-Host "Creating domain: $domainName"
        # Create the email domain in Email Communication Service.
        # The command includes the domain name, resource group, email service name, location, and domain management type (CustomerManaged)
        az communication email domain create --name $domainName --resource-group $resourceGroup --email-service-name $emailServiceName --location global --domain-management CustomerManaged
    } catch {
        # If domain creation fails, display an error message and continue with the next domain
        Write-Host "Warning: Failed to create domain $domainName. Error"
        continue
    }

    # Add DNS records
    $domainDetails = Add-RecordSetToDNS $domainName $subDomainPrefix

    # Verify the domain
    if (Verify-Domain $domainName) {
        $linkedDomainIds += $domainDetails.id
    }
}

# Linking domains to the communication service
if ($linkedDomainIds.Count -gt 0) {
    Write-Host "Linking domains to communication service."
    try {
        # Run the Azure CLI command to link the verified domains to the Communication service
        az communication update --name $commServiceName --resource-group $resourceGroup --linked-domains $linkedDomainIds

        # Output a success message if the domains were successfully linked
        Write-Host "Domains linked successfully."
    } catch {
        # If an error occurs while linking the domains, output an error message and exit the script
        Write-Host "Error linking domains"
        exit 1 # Exit the script with error code 1
    }
} else {
    # If no domains were linked, output a message indicating no domains to link
    Write-Host "No domains were linked."
}
```



**Applies to: platform-azclipython**


Get started with Azure CLI Python to automate the creation of Azure Communication Services, Email Communication Services, manage custom domains, configure DNS records, verify domains, and domain linking to communication resource.

In this sample, we describe what the sample does and the prerequisites you need before running it locally on your machine.

This article describes how to use Azure CLI Python to automate the creation of Azure Communication Services and Email Communication Services. It also describes the process of managing custom domains, configuring DNS records (such as Domain, SPF, DKIM, DKIM2), verifying domains and domain linking to communication resource.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A DNS zone in Azure to manage your domains.
- The latest [Python.org](https://www.python.org/downloads/).
- The latest [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli-windows?tabs=azure-cli).

## Prerequisite check

- In a command prompt, run the `python --version` command to check whether Python is installed.

```console
python --version
```

- In a command prompt, run the `pip --version` command to check whether pip is installed.

```console
pip --version
```

- In a command prompt, run the `az --version` command to check whether the Azure CLI is installed.

```console
az --version
```

- Before you can use the Azure CLI Commands to manage your resources, [sign in to Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli). You can sign in running the ```az login``` command from the terminal and providing your credentials.

```console
az login
```

## Initialize all the Variables

Before proceeding, define the variables needed for setting up the ACS, ECS, and domains, along with DNS configuration for the domains. Modify these variables based on your environment:

```python
# Define the name of the Azure resource group where resources are created
resourceGroup = "ContosoResourceProvider1"

# Specify the region where the resources are created. In this case, Europe.
dataLocation = "europe"

# Define the name of the Azure Communication Service resource
commServiceName = "ContosoAcsResource1"

# Define the name of the Email Communication Service resource
emailServiceName = "ContosoEcsResource1"

# Define the DNS zone name where the domains are managed (replace with actual DNS zone)
dnsZoneName = "contoso.net"

# Define the list of domains to be created and managed (replace with your own list of domains)
domains = [
    "sales.contoso.net",
    "marketing.contoso.net",
    "support.contoso.net",
    "technical.contoso.net",
    "info.contoso.net"
]
```

## Sign in to Azure account

To sign in to your Azure account through python code, use the following code:

```python
def loginToAzure():
    try:
        # Print a message indicating that the Azure login process is starting
        print("Logging in to Azure...")

        # Call the runCommand function to execute the Azure CLI login command
        runCommand("az login")

    except Exception as e:
        # If any exception occurs during the Azure login process, handle it using the errorHandler
        errorHandler(f"Azure login failed: {e}")
```

## Create an Azure Communication Service (ACS) resource

This part of the script creates an Azure Communication Service resource:

```python
def createCommunicationResource():
    try:
        # Print a message indicating the creation of the Communication Service resource is starting
        print(f"Creating Communication resource - {commServiceName}")

        # Run the Azure CLI command to create the Communication resource.
        # The 'az communication create' command is used to create a Communication Service in Azure.
        # It requires the name of the service, the resource group, location, and data location.
        runCommand(f"az communication create --name {commServiceName} --resource-group {resourceGroup} --location global --data-location {dataLocation}")
    except Exception as e:
        # If an error occurs during the creation process, the errorHandler function is called
        # The error message is formatted and passed to the errorHandler for proper handling
        errorHandler(f"Failed to create Communication resource: {e}")
```

## Create an Email Communication Service (ECS) resource

This part of the script creates an Email Communication Service resource:

```python
def createEmailCommunicationResource():
    try:
        # Print a message indicating the creation of the Email Communication Service resource is starting
        print(f"Creating Email Communication resource - {emailServiceName}")

        # Run the Azure CLI command to create the Email Communication resource.
        # The 'az communication email create' command is used to create an Email Communication Service.
        # It requires the service name, the resource group, location, and data location.
        runCommand(f"az communication email create --name {emailServiceName} --resource-group {resourceGroup} --location global --data-location {dataLocation}")
    except Exception as e:
        # If an error occurs during the creation process, the errorHandler function is called
        # The error message is formatted and passed to the errorHandler for proper handling
        errorHandler(f"Failed to create Email Communication resource: {e}")
```

## Create domains

Automate the creation of email domains, by following command:

> **Note:**
> The maximum limit for domain creation is 800 per Email Communication Service.

> **Note:**
> In our code, we work with five predefined domains, for which DNS records are added and configured.

```python
# Create the email domain in Email Communication Service.
# The command includes the domain name, resource group, email service name, location, and domain management type (CustomerManaged)
runCommand(f"az communication email domain create --name {domainName} --resource-group {resourceGroup} --email-service-name {emailServiceName} --location global --domain-management CustomerManaged")
```

## Add records set to DNS

Add records to DNS record setup (including Domain, SPF, DKIM, DKIM2) for each domain.

```python
# Function to add DNS records
# Add records set to DNS
def addRecordSetToDns(domainName, subDomainPrefix):
    try:
        print(f"Adding DNS record sets for domain: {domainName}")

        # Run the Azure CLI command to fetch domain details for the specified domain name
        domainDetailsJson = runCommand(f"az communication email domain show --resource-group {resourceGroup} --email-service-name {emailServiceName} --name {domainName}")

        # If no details are returned, handle the error by exiting the process
        if not domainDetailsJson:
            errorHandler(f"Failed to fetch domain details for {domainName}")

        # Parse the JSON response to extract the necessary domain details
        domainDetails = json.loads(domainDetailsJson)
        print(f"Domain details are: {domainDetails}")

        # Extract verification record values Domain, SPF and DKIM from the parsed JSON response
        # These values are used to create DNS records
        domainValue = domainDetails['verificationRecords']['Domain']['value']
        spfValue = domainDetails['verificationRecords']['SPF']['value']
        dkimName = domainDetails['verificationRecords']['DKIM']['name']
        dkimValue = domainDetails['verificationRecords']['DKIM']['value']
        dkim2Name = domainDetails['verificationRecords']['DKIM2']['name']
        dkim2Value = domainDetails['verificationRecords']['DKIM2']['value']
        
        # Create the TXT DNS record for the domain's verification value
        runCommand(f"az network dns record-set txt create --name {subDomainPrefix} --zone-name {dnsZoneName} --resource-group {resourceGroup}")
        
        # Add the domain verification record to the TXT DNS record
        runCommand(f"az network dns record-set txt add-record --resource-group {resourceGroup} --zone-name {dnsZoneName} --record-set-name {subDomainPrefix} --value {domainValue}")
        
        # Add the SPF record value to the TXT DNS record
        runCommand(f"az network dns record-set txt add-record --resource-group {resourceGroup} --zone-name {dnsZoneName} --record-set-name {subDomainPrefix} --value \"{spfValue}\"")
        
        # Create CNAME DNS records for DKIM verification
        runCommand(f"az network dns record-set cname create --resource-group {resourceGroup} --zone-name {dnsZoneName} --name {dkimName}.{subDomainPrefix}")
        
        # Add the DKIM record value to the CNAME DNS record
        runCommand(f"az network dns record-set cname set-record --resource-group {resourceGroup} --zone-name {dnsZoneName} --record-set-name {dkimName}.{subDomainPrefix} --cname {dkimValue}")
        
        # Create a CNAME record for the second DKIM2 verification
        runCommand(f"az network dns record-set cname create --resource-group {resourceGroup} --zone-name {dnsZoneName} --name {dkim2Name}.{subDomainPrefix}")
        
        # Add the DKIM2 record value to the CNAME DNS record
        runCommand(f"az network dns record-set cname set-record --resource-group {resourceGroup} --zone-name {dnsZoneName} --record-set-name {dkim2Name}.{subDomainPrefix} --cname {dkim2Value}")

        # Return the domain details
        return domainDetails

    # Handle JSON decoding errors (in case the response is not valid JSON)
    except json.JSONDecodeError as e:
        errorHandler(f"Failed to parse domain details JSON: {e}")

    # Catch any other exceptions that might occur during the DNS record creation process
    except Exception as e:
        errorHandler(f"Error while adding DNS records for domain {domainName}: {e}")
```

## Verification of domains

Initiates the domain verification process for the domains, including Domain, SPF, DKIM, and DKIM2 verifications.

```python
# Verify domain function
def verifyDomain(domainName):
    try:
        print(f"Initiating domain verification for: {domainName}")

        # Define the types of verification that need to be performed
        verificationTypes = ["Domain", "SPF", "DKIM", "DKIM2"]

        # Loop over each verification type and initiate the verification process via Azure CLI
        for verificationType in verificationTypes:
            # Run the Azure CLI command to initiate the verification process for each verification type
            runCommand(f"az communication email domain initiate-verification --domain-name {domainName} --email-service-name {emailServiceName} --resource-group {resourceGroup} --verification-type {verificationType}")

        # Polling for domain verification
        attempts = 0 # Track the number of verification attempts
        maxAttempts = 10 # Set the maximum number of attempts to check domain verification status

        # Loop for polling and checking verification status up to maxAttempts times
        while attempts < maxAttempts:
            # Run the Azure CLI command to fetch the domain details
            domainDetailsJson = runCommand(f"az communication email domain show --resource-group {resourceGroup} --email-service-name {emailServiceName} --name {domainName}")
            
            # If no details are returned, call the errorHandler to stop the process
            if not domainDetailsJson:
                errorHandler(f"Failed to get domain verification details for {domainName}")

            # Parse the domain details JSON response
            domainDetails = json.loads(domainDetailsJson)

            dkimStatus = domainDetails['verificationStates']['DKIM']['status']
            dkim2Status = domainDetails['verificationStates']['DKIM2']['status']
            domainStatus = domainDetails['verificationStates']['Domain']['status']
            spfStatus = domainDetails['verificationStates']['SPF']['status']
            
            # Check if all verification statuses are "Verified"
            if dkimStatus == 'Verified' and dkim2Status == 'Verified' and domainStatus == 'Verified' and spfStatus == 'Verified':
                print(f"Domain verified successfully.")
                return True

            # If verification is not yet complete, wait before checking again
            attempts += 1
            time.sleep(10)

        # If the maximum number of attempts is reached without successful verification, print failure message
        print(f"Domain {domainName} verification failed or timed out.")
        return False

    # Handle JSON decoding errors that might occur when trying to parse the domain verification response
    except json.JSONDecodeError as e:
        errorHandler(f"Failed to parse domain verification JSON: {e}")

    # Catch any other general exceptions that might occur during the domain verification process
    except Exception as e:
        errorHandler(f"Error while verifying domain {domainName}: {e}")
```

## Link domains to the communication service

Once the domains are verified and DNS records are configured, you can link the domains to the Azure Communication Service:

> **Note:**
> The maximum limit for domain linking is 1000 per Azure Communication Service.

```python
# Link the verified domains to the Communication service
# The command includes the communication service name, resource group, and the list of linked domain IDs
runCommand(f"az communication update --name {commServiceName} --resource-group {resourceGroup} --linked-domains {' '.join(linkedDomainIds)}")
```

## Complete Python Script with Azure CLI Commands for Automating End-to-End Resource Creation

```python
import subprocess
import json
import time

# Variables
# Define the name of the Azure resource group where resources are created
resourceGroup = "ContosoResourceProvider1"

# Specify the region where the resources are created. In this case, Europe.
dataLocation = "europe"

# Define the name of the Azure Communication Service resource
commServiceName = "ContosoAcsResource1"

# Define the name of the Email Communication Service resource
emailServiceName = "ContosoEcsResource1"

# Define the DNS zone name where the domains are managed (replace with actual DNS zone)
dnsZoneName = "contoso.net"

# Define the list of domains to be created and managed (replace with your own list of domains)
domains = [
    "sales.contoso.net",
    "marketing.contoso.net",
    "support.contoso.net",
    "technical.contoso.net",
    "info.contoso.net"
]

# Function to run shell commands and get output
def runCommand(command):
    try:
        # Execute the shell command using subprocess.run
        # 'check=True' raises an exception if the command exits with a non-zero status
        # 'capture_output=True' captures the command's output and stores it in 'result.stdout'
        # 'text=True' ensures the output is returned as a string (rather than bytes)
        # 'shell=True' us execute the command as if it were in the shell (for example: using shell features like pipes)
        result = subprocess.run(command, check=True, capture_output=True, text=True, shell=True)

        # Return the standard output (stdout) of the command if successful
        return result.stdout

    except subprocess.CalledProcessError as e:
        # This exception is raised if the command exits with a non-zero status (i.e., an error occurs)
        print(f"Error running command '{command}': {e}") # Print the error message
        print(f"Error details: {e.stderr}") # Print the standard error (stderr) details for more information
        return None # Return None to indicate that the command failed

    except Exception as e:
        # This catches any other exceptions that may occur (such as issues unrelated to the subprocess itself)
        print(f"Unexpected error while executing command '{command}': {e}") # Print any unexpected error messages
        return None # Return None to indicate that an error occurred

# Function to handle errors (catch functionality)
def errorHandler(errorMessage="Error occurred. Exiting."):
    print(errorMessage)
    exit(1)

# Sign in to Azure

def loginToAzure():
    try:
        # Print a message indicating that the Azure login process is starting
        print("Logging in to Azure...")

        # Call the runCommand function to execute the Azure CLI login command
        runCommand("az login")

    except Exception as e:
        # If any exception occurs during the Azure login process, handle it using the errorHandler
        errorHandler(f"Azure login failed: {e}")

# Create Communication resource
def createCommunicationResource():
    try:
        # Print a message indicating the creation of the Communication Service resource is starting
        print(f"Creating Communication resource - {commServiceName}")

        # Run the Azure CLI command to create the Communication resource.
        # The 'az communication create' command is used to create a Communication Service in Azure.
        # It requires the name of the service, the resource group, location, and data location.
        runCommand(f"az communication create --name {commServiceName} --resource-group {resourceGroup} --location global --data-location {dataLocation}")
    except Exception as e:
        # If an error occurs during the creation process, the errorHandler function is called
        # The error message is formatted and passed to the errorHandler for proper handling
        errorHandler(f"Failed to create Communication resource: {e}")

# Create Email Communication resource
def createEmailCommunicationResource():
    try:
        # Print a message indicating the creation of the Email Communication Service resource is starting
        print(f"Creating Email Communication resource - {emailServiceName}")

        # Run the Azure CLI command to create the Email Communication resource.
        # The 'az communication email create' command is used to create an Email Communication Service.
        # It requires the service name, the resource group, location, and data location.
        runCommand(f"az communication email create --name {emailServiceName} --resource-group {resourceGroup} --location global --data-location {dataLocation}")
    except Exception as e:
        # If an error occurs during the creation process, the errorHandler function is called
        # The error message is formatted and passed to the errorHandler for proper handling
        errorHandler(f"Failed to create Email Communication resource: {e}")

# Function to add DNS records
# Add records set to DNS
def addRecordSetToDns(domainName, subDomainPrefix):
    try:
        print(f"Adding DNS record sets for domain: {domainName}")

        # Run the Azure CLI command to fetch domain details for the specified domain name
        domainDetailsJson = runCommand(f"az communication email domain show --resource-group {resourceGroup} --email-service-name {emailServiceName} --name {domainName}")

        # If no details are returned, handle the error by exiting the process
        if not domainDetailsJson:
            errorHandler(f"Failed to fetch domain details for {domainName}")

        # Parse the JSON response to extract the necessary domain details
        domainDetails = json.loads(domainDetailsJson)
        print(f"Domain details are: {domainDetails}")

        # Extract verification record values Domain, SPF and DKIM from the parsed JSON response
        # These values are used to create DNS records
        domainValue = domainDetails['verificationRecords']['Domain']['value']
        spfValue = domainDetails['verificationRecords']['SPF']['value']
        dkimName = domainDetails['verificationRecords']['DKIM']['name']
        dkimValue = domainDetails['verificationRecords']['DKIM']['value']
        dkim2Name = domainDetails['verificationRecords']['DKIM2']['name']
        dkim2Value = domainDetails['verificationRecords']['DKIM2']['value']
        
        # Create the TXT DNS record for the domain's verification value
        runCommand(f"az network dns record-set txt create --name {subDomainPrefix} --zone-name {dnsZoneName} --resource-group {resourceGroup}")
        
        # Add the domain verification record to the TXT DNS record
        runCommand(f"az network dns record-set txt add-record --resource-group {resourceGroup} --zone-name {dnsZoneName} --record-set-name {subDomainPrefix} --value {domainValue}")
        
        # Add the SPF record value to the TXT DNS record
        runCommand(f"az network dns record-set txt add-record --resource-group {resourceGroup} --zone-name {dnsZoneName} --record-set-name {subDomainPrefix} --value \"{spfValue}\"")
        
        # Create CNAME DNS records for DKIM verification
        runCommand(f"az network dns record-set cname create --resource-group {resourceGroup} --zone-name {dnsZoneName} --name {dkimName}.{subDomainPrefix}")
        
        # Add the DKIM record value to the CNAME DNS record
        runCommand(f"az network dns record-set cname set-record --resource-group {resourceGroup} --zone-name {dnsZoneName} --record-set-name {dkimName}.{subDomainPrefix} --cname {dkimValue}")
        
        # Create a CNAME record for the second DKIM2 verification
        runCommand(f"az network dns record-set cname create --resource-group {resourceGroup} --zone-name {dnsZoneName} --name {dkim2Name}.{subDomainPrefix}")
        
        # Add the DKIM2 record value to the CNAME DNS record
        runCommand(f"az network dns record-set cname set-record --resource-group {resourceGroup} --zone-name {dnsZoneName} --record-set-name {dkim2Name}.{subDomainPrefix} --cname {dkim2Value}")

        # Return the domain details
        return domainDetails

    # Handle JSON decoding errors (in case the response is not valid JSON)
    except json.JSONDecodeError as e:
        errorHandler(f"Failed to parse domain details JSON: {e}")

    # Catch any other exceptions that might occur during the DNS record creation process
    except Exception as e:
        errorHandler(f"Error while adding DNS records for domain {domainName}: {e}")

# Verify domain function
def verifyDomain(domainName):
    try:
        print(f"Initiating domain verification for: {domainName}")

        # Define the types of verification that need to be performed
        verificationTypes = ["Domain", "SPF", "DKIM", "DKIM2"]

        # Loop over each verification type and initiate the verification process via Azure CLI
        for verificationType in verificationTypes:
            # Run the Azure CLI command to initiate the verification process for each verification type
            runCommand(f"az communication email domain initiate-verification --domain-name {domainName} --email-service-name {emailServiceName} --resource-group {resourceGroup} --verification-type {verificationType}")

        # Polling for domain verification
        attempts = 0 # Track the number of verification attempts
        maxAttempts = 10 # Set the maximum number of attempts to check domain verification status

        # Loop for polling and checking verification status up to maxAttempts times
        while attempts < maxAttempts:
            # Run the Azure CLI command to fetch the domain details
            domainDetailsJson = runCommand(f"az communication email domain show --resource-group {resourceGroup} --email-service-name {emailServiceName} --name {domainName}")
            
            # If no details are returned, call the errorHandler to stop the process
            if not domainDetailsJson:
                errorHandler(f"Failed to get domain verification details for {domainName}")

            # Parse the domain details JSON response
            domainDetails = json.loads(domainDetailsJson)

            dkimStatus = domainDetails['verificationStates']['DKIM']['status']
            dkim2Status = domainDetails['verificationStates']['DKIM2']['status']
            domainStatus = domainDetails['verificationStates']['Domain']['status']
            spfStatus = domainDetails['verificationStates']['SPF']['status']
            
            # Check if all verification statuses are "Verified"
            if dkimStatus == 'Verified' and dkim2Status == 'Verified' and domainStatus == 'Verified' and spfStatus == 'Verified':
                print(f"Domain verified successfully.")
                return True

            # If verification is not yet complete, wait before checking again
            attempts += 1
            time.sleep(10)

        # If the maximum number of attempts is reached without successful verification, print failure message
        print(f"Domain {domainName} verification failed or timed out.")
        return False

    # Handle JSON decoding errors that might occur when trying to parse the domain verification response
    except json.JSONDecodeError as e:
        errorHandler(f"Failed to parse domain verification JSON: {e}")

    # Catch any other general exceptions that might occur during the domain verification process
    except Exception as e:
        errorHandler(f"Error while verifying domain {domainName}: {e}")

# Main - to create and verify domains
# List to store the IDs of successfully verified domains
linkedDomainIds = []

def main():
    try:
        # Step 1: Call the loginToAzure() function to log in to Azure using the Azure CLI
        loginToAzure()

        # Step 2: Call the createCommunicationResource() function to create Azure Communication Service resource
        createCommunicationResource()

        # Step 3: Call the createEmailCommunicationResource() function to create Azure Communication Service resource.
        createEmailCommunicationResource()

        # Step 4: Loop through each domain in the 'domains' list
        for domainName in domains:

            # Extract the subdomain prefix from the fully qualified domain name (for example: "sales" from "sales.contoso.net")
            subDomainPrefix = domainName.split('.')[0]
            try:
                print(f"Creating domain: {domainName}")
                # Step 5: Create the email domain in Email Communication Service.
                # The command includes the domain name, resource group, email service name, location, and domain management type (CustomerManaged)
                runCommand(f"az communication email domain create --name {domainName} --resource-group {resourceGroup} --email-service-name {emailServiceName} --location global --domain-management CustomerManaged")
            except Exception as e:
                # If domain creation fails, print a warning and continue with the next domain
                print(f"Warning: Failed to create domain {domainName}. Error: {e}")
                continue

            # Step 6: Add DNS records
            domainDetails = addRecordSetToDns(domainName, subDomainPrefix)

            # Step 7: Verify the domain
            if verifyDomain(domainName):
                # If domain verification is successful, add the domain's ID to the linked domains list
                linkedDomainIds.append(domainDetails['id'])

        # Linking domains to the communication service
        if linkedDomainIds:
            print("Linking domains to communication service.")

            # Run the Azure CLI command to link the verified domains to the Communication service
            runCommand(f"az communication update --name {commServiceName} --resource-group {resourceGroup} --linked-domains {' '.join(linkedDomainIds)}")
            print("Domains linked successfully.")
        else:
            print("No domains were linked.")

    except Exception as e:
        errorHandler(f"An error occurred in the main process: {e}")

# Ensure the main function is called when the script is run directly
if __name__ == "__main__":
    main()
```



## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. To delete your communication resource, run the following command.

```azurecli-interactive
az communication delete --name "ContosoAcsResource1" --resource-group "ContosoResourceProvider1"
```

If you want to clean up and remove an Email Communication Services, You can delete your Email Communication resource by running the following command:

```PowerShell
PS C:\> Remove-AzEmailService -Name ContosoEcsResource1 -ResourceGroupName ContosoResourceProvider1
```

If you want to clean up and remove a Domain resource, You can delete your Domain resource by running the following command:

```PowerShell
PS C:\> Remove-AzEmailServiceDomain -Name contoso.com -EmailServiceName ContosoEcsResource1 -ResourceGroupName ContosoResourceProvider1
```

[Deleting the resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-portal.md#delete-resource-groups) also deletes any other resources associated with it.

If you have any phone numbers assigned to your resource upon resource deletion, the phone numbers are automatically released from your resource at the same time.

> **Note:**
> Resource deletion is **permanent** and no data, including Event Grid filters, phone numbers, or other data tied to your resource, can be recovered if you delete the resource.
