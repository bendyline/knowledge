---
title: Clone Persistent Volumes in Azure Container Storage (version 1.x.x)
description: Clone persistent volumes in Azure Container Storage (version 1.x.x). You can only clone volumes of the same size that are in the same storage pool.
author: khdownie
ms.service: azure-container-storage
ms.topic: how-to
ms.date: 09/03/2025
ms.author: kendownie
# Customer intent: "As a cloud engineer, I want to clone persistent volumes in Azure Container Storage (version 1.x.x), so that I can create duplicates."
---

# Clone persistent volumes in Azure Container Storage (version 1.x.x)

You can clone persistent volumes in Azure Container Storage (version 1.x.x). A cloned volume is a duplicate of an existing persistent volume. You can only clone volumes of the same size that are in the same storage pool.

> **Important:**
> This article covers features and capabilities available in Azure Container Storage (version 1.x.x). [Azure Container Storage (version 2.x.x)](container-storage-introduction.md) is now available.

## Prerequisites


- If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

- This article requires Azure CLI version v2.83.0 or later. For more information, see [How to install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli). Disable extensions such as `aks-preview` if issues occur. Install or update extensions as needed:
  - `az extension add --upgrade --name k8s-extension`
  - `az extension add --upgrade --name elastic-san` (Elastic SAN only)

- You need the Kubernetes command-line client, `kubectl`. It's already installed if you're using Azure Cloud Shell. You can install it locally by running the `az aks install-cli` command.

- Check if your target region is supported in [Azure Container Storage regions](container-storage-introduction.md#regional-availability).


- You need an Azure Kubernetes Service (AKS) cluster with a node pool of at least three virtual machines (VMs) for the cluster nodes, each with a minimum of four virtual CPUs (vCPUs).

- This article assumes your AKS cluster already runs Azure Container Storage and has a storage pool and persistent volume claim (PVC) created with either [Azure Disks](use-container-storage-with-managed-disks.md) or [ephemeral disk (local storage)](use-container-storage-with-local-disk-version-1.md). Azure Elastic SAN doesn't support resizing volumes.

## Clone a volume

Follow the instructions below to clone a persistent volume.

1. Use your favorite text editor to create a YAML manifest file such as `code acstor-clonevolume.yaml`.

1. Paste in the following code and save the file. A built-in storage class supports volume cloning, so for **dataSource** be sure to reference a PVC previously created by the Azure Container Storage storage class. For example, if you created the PVC for Azure Disks, it might be called `azurediskpvc`. For **storage**, specify the size of the original PVC.

   ```yml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: pvc-acstor-cloning
   spec:
     accessModes:
       - ReadWriteOnce
     storageClassName: acstor-azuredisk
     resources:
       requests:
         storage: 100Gi
     dataSource:
       kind: PersistentVolumeClaim
       name: azurediskpvc
   ```

1. Apply the YAML manifest file to clone the PVC.
   
   ```azurecli-interactive
   kubectl apply -f acstor-clonevolume.yaml 
   ```

   You should see output similar to:
   
   ```output
   persistentvolumeclaim/pvc-acstor-cloning created
   ```

1. Use your favorite text editor to create a YAML manifest file such as `code acstor-pod.yaml`.

1. Paste in the following code and save the file. For **claimName**, be sure to reference the cloned PVC.

   ```yml
   kind: Pod
   apiVersion: v1
   metadata:
     name: fiopod2
   spec:
     nodeSelector:
       acstor.azure.com/io-engine: acstor
     volumes:
       - name: azurediskpv
         persistentVolumeClaim:
           claimName: pvc-acstor-cloning
     containers:
       - name: fio
         image: nixery.dev/shell/fio
         args:
           - sleep
           - "1000000"
         volumeMounts:
           - mountPath: "/volume"
             name: azurediskpv
   ```

1. Apply the YAML manifest file to deploy the new pod.
   
   ```azurecli
   kubectl apply -f acstor-pod.yaml
   ```
   
   You should see output similar to this example:
   
   ```output
   pod/fiopod2 created
   ```

1. Check that the pod is running and that the persistent volume claim is bound successfully to the pod:

   ```azurecli
   kubectl describe pod fiopod2
   kubectl describe pvc azurediskpvc
   ```
   

## See also

- [What is Azure Container Storage (version 1.x.x)?](container-storage-introduction-version-1.md)
