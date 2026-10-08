---
title: Download Cluster Projects and Templates
description: Azure CycleCloud has built-in templates you can configure and edit to make your own custom templates.
author: adriankjohnson
ms.date: 06/19/2026
ms.topic: how-to
ms.author: adjohnso
---

# Cluster template downloads

Azure CycleCloud comes with built-in cluster templates that you can use out of the box, or customize to [build a template](how-to/cluster-templates.md) for your specific needs. For the full list of available cluster templates, see the "cyclecloud" repositories in [Microsoft Azure GitHub](https://github.com/Azure?q=cyclecloud).

You can import customized templates into CycleCloud using the CycleCloud CLI:

```azurecli-interactive
cyclecloud import_template -f templates/template-name.template.txt
```

## Available template types

| Project/template type  | CycleCloud repo | Description  |
| --------------------- | ---------------- | ------------ | --- |
| [Grid Engine Logo](http://gridscheduler.sourceforge.net/) | [Grid Engine](https://github.com/Azure/cyclecloud-gridengine)    | Azure CycleCloud GridEngine cluster template.  |
| [HPCPack logo](https://learn.microsoft.com/powershell/high-performance-computing/overview?view=hpc16-ps\&preserve-view=true)  | [HPC Pack](https://github.com/Azure/cyclecloud-hpcpack) | CycleCloud project that enables use of Microsoft HPC Pack job scheduler.  |
| [HTCondor Logo](https://research.cs.wisc.edu/htcondor/) | [HTCondor](https://github.com/Azure/cyclecloud-htcondor)  | Azure CycleCloud HTCondor cluster template. |
| [Spectrum LSF](https://www.ibm.com/us-en/marketplace/hpc-workload-management) | [Spectrum LSF](https://github.com/Azure/cyclecloud-lsf) | CycleCloud project to enable use of Spectrum LSF job scheduler in Azure CycleCloud HPC clusters.  |
| NFS logo | [Network File System](https://github.com/Azure/cyclecloud-nfs) | CycleCloud project to enable use of NFS filers in HPC clusters in Azure.  |
| OpenPBS Logo  | [OpenPBS](https://github.com/Azure/cyclecloud-pbspro)  | Azure CycleCloud OpenPBS cluster template.  |
| [slurm logo](https://slurm.schedmd.com/)  | [Slurm](https://github.com/Azure/cyclecloud-slurm) | CycleCloud project to enable users to create, configure, and use Slurm HPC clusters.  |
