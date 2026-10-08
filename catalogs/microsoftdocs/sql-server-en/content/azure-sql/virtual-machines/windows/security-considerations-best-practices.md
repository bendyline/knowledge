---
title: "Security: Best Practices"
description: This article provides general guidance for securing SQL Server running in an Azure virtual machine.
author: dplessMSFT
ms.author: dpless
ms.reviewer: mathoma, randolphwest
ms.date: 12/05/2025
ms.service: azure-vm-sql-server
ms.subservice: security
ms.topic: best-practice
tags: azure-service-management
---
# Security considerations for SQL Server on Azure Virtual Machines



  **Applies to:**    [SQL Server on Azure VM](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This article includes overall security guidelines that help establish secure access to SQL Server instances in an Azure virtual machine (VM).

Azure complies with several industry regulations and standards that can enable you to build a compliant solution with SQL Server running in a virtual machine. For information about regulatory compliance with Azure, see [Azure Trust Center](https://azure.microsoft.com/support/trust-center/).

First review the security best practices for [SQL Server](https://learn.microsoft.com/sql/relational-databases/security/sql-server-security-best-practices) and [Azure VMs](https://learn.microsoft.com/azure/virtual-machines/security-recommendations), and then review this article for the best practices that apply to SQL Server on Azure VMs specifically.

To learn more about SQL Server VM best practices, see the other articles in this series: [Checklist](performance-guidelines-best-practices-checklist.md), [VM size](performance-guidelines-best-practices-vm-size.md), [HADR configuration](hadr-cluster-best-practices.md), and [Collect baseline](performance-guidelines-best-practices-collect-baseline.md).

## Checklist

Review the following checklist in this section for a brief overview of the security best practices that the rest of the article covers in greater detail.

SQL Server features and capabilities provide methods of securing data at the database level that can be combined with security features at the infrastructure level. Together, these features provide defense-in-depth at the infrastructure level for cloud-based and hybrid solutions. In addition, with Azure security measures, it's possible to encrypt your sensitive data, protect virtual machines from viruses and malware, secure network traffic, identify and detect threats, meet compliance requirements, and provides a single method for administration and reporting for any security need in the hybrid cloud.

- Use [Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-cloud-introduction) to evaluate and take action to improve the security posture of your data environment. Capabilities such as [Azure Advanced Threat Protection (ATP)](../../database/threat-detection-overview.md) can be used across your hybrid workloads to improve security evaluation and give the ability to react to risks. Registering your SQL Server VM with the [SQL IaaS Agent extension](sql-agent-extension-manually-register-single-vm.md) surfaces Microsoft Defender for Cloud assessments within the [SQL virtual machine resource](manage-sql-vm-portal.md) of the Azure portal.
- Use [Microsoft Defender for SQL](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-introduction) to discover and mitigate potential database vulnerabilities, as well as detect anomalous activities that could indicate a threat to your SQL Server instance and database layer.
- [Vulnerability Assessment](https://learn.microsoft.com/azure/defender-for-cloud/sql-azure-vulnerability-assessment-overview) is a part of [Microsoft Defender for SQL](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-introduction) that can discover and help remediate potential risks to your SQL Server environment. It provides visibility into your security state, and includes actionable steps to resolve security issues.
- Use [Azure confidential VMs](security-considerations-best-practices.md#confidential-vms) to reinforce protection of your data in-use, and data-at-rest against host operator access. Azure confidential VMs allow you to confidently store your sensitive data in the cloud and meet strict compliance requirements.
- If you're on SQL Server 2022, consider using [Microsoft Entra authentication](configure-azure-ad-authentication-for-sql-vm.md) to connect to your instance of SQL Server.
- [Azure Advisor](https://learn.microsoft.com/azure/advisor/advisor-security-recommendations) analyzes your resource configuration and usage telemetry and then recommends solutions that can help you improve the cost effectiveness, performance, high availability, and security of your Azure resources. Use Azure Advisor at the virtual machine, resource group, or subscription level to help identify and apply best practices to optimize your Azure deployments.
- Use [Azure Disk Encryption](https://learn.microsoft.com/azure/virtual-machines/windows/disk-encryption-windows) when your compliance and security needs require you to encrypt the data end-to-end using your encryption keys, including encryption of the ephemeral (locally attached temporary) disk.
- [Managed Disks are encrypted](https://learn.microsoft.com/azure/virtual-machines/disk-encryption) at rest by default using Azure Storage Service Encryption, where the encryption keys are Microsoft-managed keys stored in Azure.
- For a comparison of the managed disk encryption options, review the [managed disk encryption comparison chart](https://learn.microsoft.com/azure/virtual-machines/disk-encryption-overview#comparison).
- Management ports should be closed on your virtual machines - Open remote management ports expose your VM to a high level of risk from internet-based attacks. These attacks attempt to brute force credentials to gain admin access to the machine.
- Turn on [Just-in-time (JIT) access](https://learn.microsoft.com/azure/defender-for-cloud/just-in-time-access-usage) for Azure virtual machines.
- Use [Azure Bastion](https://learn.microsoft.com/azure/bastion/bastion-overview) over Remote Desktop Protocol (RDP).
- Lock down ports and only allow the necessary application traffic using [Azure Firewall](https://learn.microsoft.com/azure/firewall/features) which is a managed Firewall as a Service (FaaS) that grants/ denies server access based on the originating IP address.
- Use [Network Security Groups (NSGs)](https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview) to filter network traffic to, and from, Azure resources on Azure Virtual Networks.
- Use [Application Security Groups](https://learn.microsoft.com/azure/virtual-network/application-security-groups) to group servers together with similar port filtering requirements, with similar functions, such as web servers and database servers.
- For web and application servers use [Azure Distributed Denial of Service (DDoS) protection](https://learn.microsoft.com/azure/ddos-protection/ddos-protection-overview). DDoS attacks are designed to overwhelm and exhaust network resources, making apps slow or unresponsive. It's common for DDoS attacks to target user interfaces. Azure DDoS protection sanitizes unwanted network traffic, before it affects service availability.
- Use VM extensions to help address antimalware, desired state, threat detection, prevention, and remediation to address threats at the operating system, machine, and network levels:
  - [Guest Configuration extension](https://learn.microsoft.com/azure/virtual-machines/extensions/guest-configuration) performs audit and configuration operations inside virtual machines.
  - [Network Watcher Agent virtual machine extension for Windows and Linux](https://learn.microsoft.com/azure/virtual-machines/extensions/network-watcher-windows) monitors network performance, diagnostic, and analytics service that allows monitoring of Azure networks.
  - [Microsoft Antimalware Extension for Windows](https://learn.microsoft.com/azure/virtual-machines/extensions/iaas-antimalware-windows) to help identify and remove viruses, spyware, and other malicious software, with configurable alerts.
  - [Evaluate third party extensions](https://learn.microsoft.com/azure/virtual-machines/extensions/overview) such as Symantec Endpoint Protection for Windows VM (/azure/virtual-machines/extensions/symantec).
- Use [Azure Policy](https://learn.microsoft.com/azure/governance/policy/overview) to create business rules that can be applied to your environment. Azure Policies evaluate Azure resources by comparing the properties of those resources against rules defined in JSON format.
- Azure Blueprints enables cloud architects and central information technology groups to define a repeatable set of Azure resources that implements and adheres to an organization's standards, patterns, and requirements. Azure Blueprints are [different than Azure Policies](https://learn.microsoft.com/azure/governance/blueprints/overview#how-its-different-from-azure-policy).
- Use Windows Server 2019 or Windows Server 2022 to be [FIPS](security-considerations-best-practices.md#fips-compliance) compliant with SQL Server on Azure VMs. 
- Treat restoring backups as a high-risk operation and [never restore a backup from an untrusted source](security-considerations-best-practices.md#security-risk-of-restoring-backups-from-untrusted-sources).


For more information about security best practices, see [SQL Server security best practices](https://learn.microsoft.com/sql/relational-databases/security/sql-server-security-best-practices) and [Securing SQL Server](https://learn.microsoft.com/sql/relational-databases/security/securing-sql-server).

## Microsoft Defender for SQL on machines

[Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-cloud-introduction) is a unified security management system that is designed to evaluate and provide opportunities to improve the security posture of your data environment. Microsoft Defender offers [Microsoft Defender for SQL on machines](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-usage) protection for SQL Server on Azure VMs. Use Microsoft Defender for SQL to discover and mitigate potential database vulnerabilities, and detect anomalous activities that might indicate a threat to your SQL Server instance and database layer.

Microsoft Defender for SQL offers the following benefits:

- [Vulnerability Assessments](https://learn.microsoft.com/azure/defender-for-cloud/sql-azure-vulnerability-assessment-overview) can discover and help remediate potential risks to your SQL Server environment. It provides visibility into your security state, and it includes actionable steps to resolve security issues.
- Use [security score](https://learn.microsoft.com/azure/defender-for-cloud/secure-score-security-controls) in Microsoft Defender for Cloud.
- Review the list of the [compute](https://learn.microsoft.com/azure/defender-for-cloud/recommendations-reference#compute-recommendations) and [data recommendations](https://learn.microsoft.com/azure/security-center/recommendations-reference#data-recommendations) currently available, for further details.
- Registering your SQL Server VM with the [SQL Server IaaS Agent Extension](sql-agent-extension-manually-register-single-vm.md) surfaces Microsoft Defender for SQL recommendations to the [SQL virtual machines resource](manage-sql-vm-portal.md) in the Azure portal.

## Portal management

After you've [registered your SQL Server VM with the SQL IaaS Agent extension](sql-agent-extension-manually-register-single-vm.md), you can configure a number of security settings using the [SQL virtual machines resource](manage-sql-vm-portal.md) in the Azure portal, such as enabling Azure Key Vault integration, or SQL authentication.

Additionally, after you've enabled [Microsoft Defender for SQL on machines](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-usage) you can view Defender for Cloud features directly within the [SQL virtual machines resource](manage-sql-vm-portal.md) in the Azure portal, such as vulnerability assessments and security alerts.

See [Manage SQL Server VM in the portal](manage-sql-vm-portal.md) to learn more.

## Confidential VMs

[Azure confidential VMs](sql-vm-create-confidential-vm-how-to.md) provide a strong, hardware-enforced boundary that hardens the protection of the guest OS against host operator access. Choosing a confidential VM size for your SQL Server on Azure VM provides an extra layer of protection, enabling you to confidently store your sensitive data in the cloud and meet strict compliance requirements.

Azure confidential VMs use [AMD processors with SEV-SNP](https://learn.microsoft.com/azure/confidential-computing/virtual-machine-solutions-amd) technology that encrypt the memory of the VM using keys generated by the processor. This helps protect data while it's in use (the data that is processed inside the memory of the SQL Server process) from unauthorized access from the host OS. The OS disk of a confidential VM can also be encrypted with keys bound to the Trusted Platform Module (TPM) chip of the virtual machine, reinforcing protection for data-at-rest.

For detailed deployment steps, see the [Quickstart: Deploy SQL Server to a confidential VM](sql-vm-create-portal-quickstart.md?tabs=confidential-vm).

Recommendations for disk encryption are different for confidential VMs than for the other VM sizes. See [disk encryption](security-considerations-best-practices.md#azure-confidential-vms) to learn more.

<a id="azure-ad-authentication"></a>

## Microsoft Entra authentication

Starting with SQL Server 2022, you can connect to SQL Server using any of the following authentication methods with Microsoft Entra ID ([formerly Azure Active Directory](https://learn.microsoft.com/entra/fundamentals/new-name)):

- **Password** offers authentication with Microsoft Entra credentials
- **Universal with MFA** adds multifactor authentication
- **Integrated** uses federation providers like [Active Directory Federation Services](https://learn.microsoft.com/windows-server/identity/active-directory-federation-services) (ADFS) to enable single sign-on (SSO) experiences
- **Service Principal** enables authentication from Azure applications
- **Managed Identity** enables authentication from applications assigned Microsoft Entra identities 


To get started, review [Configure Microsoft Entra authentication for your SQL Server VM](configure-azure-ad-authentication-for-sql-vm.md).

## Azure Advisor

[Azure Advisor](https://learn.microsoft.com/azure/advisor/advisor-security-recommendations) is a personalized cloud consultant that helps you follow best practices to optimize your Azure deployments. Azure Advisor analyzes your resource configuration and usage telemetry, and then recommends solutions that can help you improve the cost effectiveness, performance, high availability, and security of your Azure resources. Azure Advisor can evaluate at the virtual machine, resource group, or subscription level.

## Azure Key Vault integration

There are multiple SQL Server encryption features, such as transparent data encryption (TDE), column level encryption (CLE), and backup encryption. These forms of encryption require you to manage and store the cryptographic keys you use for encryption. The [Azure Key Vault](azure-key-vault-integration-configure.md) service is designed to improve the security and management of these keys in a secure and highly available location. The SQL Server Connector allows SQL Server to use these keys from Azure Key Vault.

Consider the following:

- Azure Key Vault stores application secrets in a centralized cloud location to securely control access permissions and separate access logging.
- When bringing your own keys to Azure, it's recommended to store secrets and certificates in the [Azure Key Vault](https://learn.microsoft.com/sql/relational-databases/security/encryption/extensible-key-management-using-azure-key-vault-sql-server).
- Azure Disk Encryption uses [Azure Key Vault](https://learn.microsoft.com/azure/virtual-machines/windows/disk-encryption-key-vault) to control and manage disk encryption keys and secrets.

## Access control

When you create a SQL Server virtual machine with an Azure gallery image, the **SQL Server Connectivity** option gives you the choice of **Local (inside VM)**, **Private (within Virtual Network)**, or **Public (Internet)**.

Diagram showing SQL Server connectivity.

For the best security, choose the most restrictive option for your scenario. For example, if you're running an application that accesses SQL Server on the same VM, then **Local** is the most secure choice. If you're running an Azure application that requires access to the SQL Server, then **Private** secures communication to SQL Server only within the specified [Azure virtual network](https://learn.microsoft.com/azure/virtual-network/virtual-networks-overview). If you require **Public** (internet) access to the SQL Server VM, then make sure to follow other best practices in this topic to reduce your attack surface area.

The selected options in the portal use inbound security rules on the VM's [network security group](https://learn.microsoft.com/azure/active-directory/identity-protection/concept-identity-protection-security-overview) (NSG) to allow or deny network traffic to your virtual machine. You can modify or create new inbound NSG rules to allow traffic to the SQL Server port (default 1433). You can also specify IP addresses that are allowed to communicate over this port.

Diagram showing network security group rules.

In addition to NSG rules to restrict network traffic, you can also use the Windows Firewall on the virtual machine.

If you're using endpoints with the classic deployment model, remove any endpoints on the virtual machine if you don't use them. For instructions on using ACLs with endpoints, see [Manage the ACL on an endpoint](https://learn.microsoft.com/previous-versions/azure/virtual-machines/windows/classic/setup-endpoints#manage-the-acl-on-an-endpoint). This isn't necessary for VMs that use the Azure Resource Manager.

Consider enabling [encrypted connections](https://learn.microsoft.com/sql/database-engine/configure-windows/enable-encrypted-connections-to-the-database-engine) for the instance of the SQL Server Database Engine in your Azure virtual machine. Configure SQL Server instance with a signed certificate. For more information, see [Enable Encrypted Connections to the Database Engine](https://learn.microsoft.com/sql/database-engine/configure-windows/enable-encrypted-connections-to-the-database-engine) and [Connection String Syntax](https://learn.microsoft.com/dotnet/framework/data/adonet/connection-string-syntax).

Consider the following when **securing the network connectivity or perimeter**:

- [Azure Firewall](https://learn.microsoft.com/azure/firewall/features): A stateful and managed Firewall as a Service (FaaS) that grants/denies server access based on originating IP address to protect network resources.
- [Azure Distributed Denial of Service (DDoS) protection](https://learn.microsoft.com/azure/ddos-protection/ddos-protection-overview): DDoS attacks overwhelm and exhaust network resources, making apps slow or unresponsive. Azure DDoS protection sanitizes unwanted network traffic before it affects service availability.
- [Network Security Groups (NSGs)](https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview): Filters network traffic to and from Azure resources on Azure Virtual Networks.
- [Application Security Groups](https://learn.microsoft.com/azure/virtual-network/application-security-groups): Provides for the grouping of servers with similar port filtering requirements, and groups together servers with similar functions such as web servers.

## Disk encryption

This section provides guidance for disk encryption, but the recommendations vary depending on if you're deploying a conventional SQL Server on Azure VM or SQL Server to an Azure confidential VM.

### Conventional VMs

Managed disks deployed to VMs that aren't Azure confidential VMs use server-side encryption and Azure Disk Encryption. [Server-side encryption](https://learn.microsoft.com/azure/virtual-machines/disk-encryption) provides encryption-at-rest and safeguards your data to meet your organizational security and compliance commitments. [Azure Disk Encryption](https://learn.microsoft.com/azure/security/fundamentals/azure-disk-encryption-vms-vmss) uses either BitLocker or DM-Crypt technology, and it integrates with Azure Key Vault to encrypt both the OS and data disks.

Consider the following:

- [Azure Disk Encryption](https://learn.microsoft.com/azure/virtual-machines/windows/disk-encryption-overview) encrypts virtual machine disks using Azure Disk Encryption both for Windows and Linux virtual machines.
  - When your compliance and security requirements require you to encrypt the data end-to-end using your encryption keys, including encryption of the ephemeral (locally attached temporary) disk, use [Azure disk encryption](https://learn.microsoft.com/azure/virtual-machines/windows/disk-encryption-windows).
  - Azure Disk Encryption (ADE) leverages the industry-standard BitLocker feature of Windows and the DM-Crypt feature of Linux toprovide OS and data disk encryption.
- Managed Disk Encryption
  - [Managed Disks are encrypted](https://learn.microsoft.com/azure/virtual-machines/disk-encryption) at rest by default using Azure Storage Service Encryption where the encryption keys are Microsoft managed keys stored in Azure.
  - Data in Azure managed disks is encrypted transparently using 256-bit AES encryption, one of the strongest block ciphers available, and is FIPS 140-2 compliant.
- For a comparison of the managed disk encryption options, review the [managed disk encryption comparison chart](https://learn.microsoft.com/azure/virtual-machines/disk-encryption-overview#comparison).

### Azure confidential VMs

If you're using an Azure confidential VM, consider the following recommendations to maximize security benefits:

- Configure [confidential OS disk encryption](https://learn.microsoft.com/azure/confidential-computing/confidential-vm-overview#confidential-os-disk-encryption), which binds the OS disk encryption keys to the Trusted Platform Module (TPM) chip of the virtual machine. It also makes the protected disk content accessible only to the VM.
- Encrypt your data disks (any disks containing database files, log files, or backup files) with [BitLocker](https://learn.microsoft.com/windows/security/information-protection/bitlocker/bitlocker-overview), and enable automatic unlocking. Review [manage-bde autounlock](https://learn.microsoft.com/windows-server/administration/windows-commands/manage-bde-autounlock) or [EnableBitLockerAutoUnlock](https://learn.microsoft.com/powershell/module/bitlocker/enable-bitlockerautounlock) for more information. Automatic unlocking ensures the encryption keys are stored on the OS disk. In conjunction with confidential OS disk encryption, this protects the data-at-rest stored to the VM disks from unauthorized host access.

## Trusted Launch

When you deploy a [generation 2](https://learn.microsoft.com/azure/virtual-machines/generation-2) virtual machine, you have the option to enable [trusted launch](https://learn.microsoft.com/azure/virtual-machines/trusted-launch), which protects against advanced and persistent attack techniques.

With trusted launch, you can:

- Securely deploy virtual machines with verified boot loaders, OS kernels, and drivers.
- Securely protect keys, certificates, and secrets in the virtual machines.
- Gain insights and confidence of the entire boot chain's integrity.
- Ensure workloads are trusted and verifiable.

The following features are currently unsupported when you enable trusted launch for your SQL Server on Azure VMs:

- Azure Site Recovery
- Ultra Disks
- Managed images
- Nested virtualization

## Manage accounts

You don't want attackers to easily guess account names or passwords. Use the following tips to help:

- Create a unique local administrator account that isn't named **Administrator**.

- Use complex strong passwords for all your accounts. For more information about how to create a strong password, see the [Create a strong password](https://support.microsoft.com/account-billing/how-to-create-a-strong-password-for-your-microsoft-account-f67e4ddd-0dbe-cd75-cebe-0cfda3cf7386) article.

- By default, Azure selects Windows Authentication during SQL Server virtual machine setup. Therefore, the **SA** login is disabled and a password is assigned by setup. We recommend that the **SA** login shouldn't be used or enabled. If you must have a SQL login, use one of the following strategies:

  - Create a SQL account with a unique name that has **sysadmin** membership. You can do this from the portal by enabling **SQL Authentication** during provisioning.

    > **Tip:**  
    > If you don't enable SQL Authentication during provisioning, you must manually change the authentication mode to **SQL Server and Windows Authentication Mode**. For more information, see [Change Server Authentication Mode](https://learn.microsoft.com/sql/database-engine/configure-windows/change-server-authentication-mode).

  - If you must use the **SA** login, enable the login after provisioning and assign a new strong password.

> **Note:**  
> Connecting to a SQL Server VM using Microsoft Entra Domain Services isn't supported. Use an Active Directory domain account instead.

## Auditing and reporting

[Auditing with Log Analytics](https://learn.microsoft.com/azure/azure-monitor/agents/data-sources-windows-events#configuring-windows-event-logs) documents events and writes to an audit log in a secure Azure Blob Storage account. Log Analytics can be used to decipher the details of the audit logs. Auditing gives you the ability to save data to a separate storage account and create an audit trail of all events you select. You can also use Power BI against the audit log for quick analytics of and insights about your data, as well as to provide a view for regulatory compliance. To learn more about auditing at the VM and Azure levels, see [Azure security logging and auditing](https://learn.microsoft.com/azure/security/fundamentals/log-audit).

## Virtual Machine level access

Close management ports on your machine - Open remote management ports are exposing your VM to a high level of risk from internet-based attacks. These attacks attempt to brute force credentials to gain admin access to the machine.

- Turn on [Just-in-time (JIT) access](https://learn.microsoft.com/azure/security-center/security-center-just-in-time?tabs=jit-config-asc%2Cjit-request-asc) for Azure virtual machines.
- Use [Azure Bastion](https://learn.microsoft.com/azure/bastion/bastion-overview) over Remote Desktop Protocol (RDP).

## Virtual Machine extensions

Azure Virtual Machine extensions are trusted Microsoft or third party extensions that can help address specific needs and risks such as antivirus, malware, threat protection, and more.

- [Guest Configuration extension](https://learn.microsoft.com/azure/virtual-machines/extensions/guest-configuration)
  - To ensure secure configurations of in-guest settings of your machine, install the Guest Configuration extension.
  - In-guest settings include the configuration of the operating system, application configuration or presence, and environment settings.
  - Once installed, in-guest policies will be available such as 'Windows Exploit guard should be enabled'.
- [Network traffic data collection agent](https://learn.microsoft.com/azure/virtual-machines/extensions/network-watcher-windows)
  - Microsoft Defender for Cloud uses the Microsoft Dependency agent to collect network traffic data from your Azure virtual machines.
  - This agent enables advanced network protection features such as traffic visualization on the network map, network hardening recommendations, and specific network threats.
- [Evaluate extensions](https://learn.microsoft.com/azure/virtual-machines/extensions/overview) from Microsoft and third parties to address antimalware, desired state, threat detection, prevention, and remediation to address threats at the operating system, machine, and network levels.

## FIPS compliance

[FIPS](https://learn.microsoft.com/azure/compliance/offerings/offering-fips-140-2) is a US government standard that defines minimum security requirements for cryptographic modules in information technology products and systems. Some US government compliance programs such as FedRAMP or the Department of Defense Security Requirement Guide require the use of FIPS validated encryption.

SQL Server is capable of being FIPS compliant in [SQL Server 2016 and later](https://learn.microsoft.com/troubleshoot/sql/database-engine/security/sql-2016-fips-140-2-compliant-mode) or [SQL Server 2014](https://learn.microsoft.com/troubleshoot/sql/database-engine/security/sql-2014-fips-140-2-compliant-mode) with [Extended Security Updates](https://learn.microsoft.com/sql/sql-server/end-of-support/sql-server-extended-security-updates).

To be FIPS compliant with SQL Server on Azure VMs, you should be on Windows Server 2022, which has FIPS enabled by default. Windows Server 2019 can also be FIPS compliant if FIPS is manually enabled using the policy specified in Security Technical Implementation Guide (STIG) finding V-93511.

SQL Server isn't currently FIPS compliant on Linux Azure VMs.

## Security risk of restoring backups from untrusted sources

This section outlines the security risk associated with restoring backups from untrusted sources to any SQL Server environment, including on-premises, Azure SQL Managed Instance, SQL Server on Azure Virtual Machines (VMs) and any other environment.

### Why this matters 

Restoring SQL backup files (`.bak`) introduces a potential risk if the backup originates from an untrusted source. The security risk is exacerbated further when a SQL Server environment has multiple instances, as it amplifies the area of threat. While backups that remain within a trusted boundary pose no security issue, restoring a malicious backup can compromise the security of the entire environment.

A malicious `.bak` file can: 
- Take over the entire SQL Server instance.
- Escalate privileges and gain unauthorized access to the underlying host or virtual machine.

This attack occurs before any validating scripts or security checks can execute, which makes it extremely dangerous. Restoring an untrusted backup is equivalent to running untrusted applications on a critical server or virtual machine, and introducing arbitrary code execution into your environment. 

### Best practices

Follow these backup security best practices to reduce the threat to your SQL Server environments: 
- Treat restoring backups as a high-risk operation.
- Reduce the threat service area by using isolated instances.
- Only allow trusted backups: never restore backups from unknown or external sources.
- Only allow backups that have remained within a trusted boundary: ensure backups originate from within the trusted boundary.
- Do not bypass security controls for convenience.
- Enable [server-level auditing](https://learn.microsoft.com/sql/t-sql/statements/create-server-audit-specification-transact-sql) to capture backup and restore events and mitigate audit evasion.

## Related content

Review the security best practices for [SQL Server](https://learn.microsoft.com/sql/relational-databases/security/) and [Azure VMs](https://learn.microsoft.com/azure/virtual-machines/security-recommendations), and then review this article for the best practices that apply to SQL Server on Azure VMs specifically.

For detailed guidance on each optimization area:

- **[Quick checklist](performance-guidelines-best-practices-checklist.md)** - Review the full best practices checklist
- **[VM size](performance-guidelines-best-practices-vm-size.md)** - Choose the right VM series and configuration
- **[Storage](performance-guidelines-best-practices-storage.md)** - Optimize disk configuration and performance
- **[HADR settings](hadr-cluster-best-practices.md)** - Configure high availability and disaster recovery
- **[Collect baseline](performance-guidelines-best-practices-collect-baseline.md)** - Establish performance baselines
- **[Updating SQL Server](servicing-updates-guidelines.md)** - Keep SQL Server up to date

Review other SQL Server Virtual Machine articles at [SQL Server on Azure Virtual Machines Overview](sql-server-on-azure-vm-iaas-what-is-overview.md). If you have questions about SQL Server virtual machines, see the [Frequently Asked Questions](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/virtual-machines/windows/frequently-asked-questions-faq.yml).
