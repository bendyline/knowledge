---
 author: asudbring
 ms.service: azure-bastion
 ms.topic: include
 ms.date: 08/05/2022
 ms.author: allensu
 ms.custom: sfi-image-nochange
---

1. In the [Azure portal](https://portal.azure.com), go to the virtual machine that you want to connect to. On the **Overview** page, select **Connect**, then select **Bastion** from the dropdown to open the Bastion page. You can also select **Bastion** from the left pane. 

   Screenshot of Connect.

1. On the **Bastion** page, enter the required authentication credentials, then click **Connect**. If you configured your bastion host using the Standard SKU, you'll see additional credential options on this page. If your VM is domain-joined, you must use the following format: **username@domain.com**.

   Screenshot of Connect button.

1. When you click **Connect**,the RDP connection to this virtual machine via Bastion will open in your browser (over HTML5) using port 443 and the Bastion service. The following example shows a connection to a Windows 11 virtual machine in a new browser tab. The page you see depends on the VM you're connecting to.

   Screenshot of connecting to a Windows 11 VM.

   When working with the VM, using keyboard shortcut keys may not result in the same behavior as shortcut keys on a local computer. For example, when connected to a Windows VM from a Windows client, CTRL+ALT+END is the keyboard shortcut for CTRL+ALT+Delete on a local computer. To do this from a Mac while connected to a Windows VM, the keyboard shortcut is Fn+CTRL+ALT+Backspace.
