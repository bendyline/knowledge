---
title: Firewall settings for labs when using lab accounts
description: Learn how to determine the public IP address of VMs in a lab created using a lab account so information can be added to firewall rules.
ms.service: azure-lab-services
ms.date: 07/04/2022
ms.topic: how-to
ms.custom:
  - devdivchpfy22
  - sfi-image-nochange
---

# Firewall settings for labs when using lab accounts


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).


> **Important:**
> The information in this article applies to lab accounts. Azure Lab Services **lab plans** replace **lab accounts**. Learn how you can get started by [creating a lab plan](quick-create-resources.md). For existing lab account customers, we recommend that you [migrate from lab accounts to lab plans](how-to-migrate-lab-acounts-to-lab-plans.md).


Each organization or school configures their own network in a way that best fits their needs. Sometimes that includes setting firewall rules that block Remote Desktop Protocol (RDP) or Secure Shell (SSH) connections to machines outside their own network. Because Azure Lab Services runs in the public cloud, some extra configuration maybe needed to allow students to access their VM when connecting from the campus network.

Each lab uses single public IP address and multiple ports. All VMs, both the template VM and student VMs, use this public IP address. The public IP address doesn't change for the life of lab. Each VM has a different port number. The port numbers range is 49152 - 65535. The combination of public IP address and port number is used to connect educators and students to the correct VM. This article covers how to find the specific public IP address used by a lab. That information can be used to update inbound and outbound firewall rules so students can access their VMs.

>**Important:**
>Each lab has a different public IP address.

> **Note:**
> If your school needs to perform content filtering, such as for compliance with the [Children's Internet Protection Act (CIPA)](https://www.fcc.gov/consumers/guides/childrens-internet-protection-act), you will need to use 3rd party software. For more information, read guidance on [content filtering with Lab Services](administrator-guide.md#content-filtering).

## Find public IP for a lab

The public IP addresses for each lab are listed in the **All labs** page of the Lab Services lab account. For directions how to find the **All labs** page, see [View labs in a lab account](manage-labs-1.md#view-labs-in-a-lab-account). 

>**Note:**
>You won't see the public IP address if the template machine for your lab isn't published yet.

## Conclusion

Now we know the public IP address for the lab. Inbound and outbound rules can be created for the organization's firewall for the public IP address and the port range  49152 - 65535. Once the rules are updated, students can access their VMs without the network firewall blocking access.

## Next steps

- As an admin, [enable labs to connect your virtual network](how-to-connect-vnet-injection.md).
- As an educator, work with your admin to [create a lab with a shared resource](how-to-create-a-lab-with-shared-resource.md).
- As an educator, [publish your lab](how-to-create-manage-template.md#publish-the-template-vm).
