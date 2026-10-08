---
title: Entity categories recognized by Text Analytics for health
titleSuffix: Foundry Tools
description: Learn about categories recognized by Text Analytics for health
#services: cognitive-services
author: laujan
manager: mcleans
ms.service: azure-language-foundry-tools
ms.topic: concept-article
ms.date: 07/30/2026
ms.author: lajanuar
ai-usage: ai-assisted
ms.custom: language-service-health
---
# Supported Text Analytics for health entity categories

Text Analytics for health processes and extracts insights from unstructured medical data. The service detects and surfaces medical concepts, assigns assertions to concepts, infers semantic relations between concepts and links them to common medical ontologies.

Text Analytics for health detects medical concepts that fall under the following categories.

## Anatomy

### Entities

**BODY_STRUCTURE** - Body systems, anatomic locations or regions, and body sites. For example, arm, knee, abdomen, nose, liver, head, respiratory system, lymphocytes.

An example of the body structure entity.

## Demographics

### Entities

**AGE** - All age terms and phrases, including ones for patients, family members, and others. For example, 40-year-old, 51 yo, 3 months old, adult, infant, elderly, young, minor, middle-aged.

**ETHNICITY** - Phrases that indicate the ethnicity of the subject. For example, African American or Asian.

An example of an ethnicity entity.


**GENDER** - Terms that disclose the gender of the subject. For example, male, female, woman, gentleman, lady.

An example of an age entity.

## Examinations

### Entities

**EXAMINATION_NAME** – Diagnostic procedures and tests, including vital signs and body measurements. For example, MRI, ECG, HIV test, hemoglobin, platelets count, scale systems such as *Bristol stool scale*.

An example of an exam entity.

## External Influence

### Entities

**ALLERGEN** – an antigen triggering an allergic reaction. For example, cats, peanuts.

An example of an external influence entity.


## General attributes

### Entities

**COURSE** - Description of a change in another entity over time, such as condition progression (for example: improvement, worsening, resolution, remission), a course of treatment or medication (for example: increase in medication dosage). 

An example of a course entity.

**DATE** - Full date relating to a medical condition, examination, treatment, medication, or administrative event.

An example of a date entity.

**DIRECTION** – Directional terms that may relate to a body structure, medical condition, examination, or treatment, such as: left, lateral, upper, posterior.

An example of a direction entity.

**FREQUENCY** - Describes how often a medical condition, examination, treatment, or medication occurred, occurs, or should occur.

An example of a medication frequency attribute.


**TIME** - Temporal terms relating to the beginning and/or length (duration) of a medical condition, examination, treatment, medication, or administrative event. 

**MEASUREMENT_UNIT** – The unit of measurement related to an examination or a medical condition measurement.

**MEASUREMENT_VALUE** – The value related to an examination or a medical condition measurement.

An example of a measurement value entity.

**RELATIONAL_OPERATOR** - Phrases that express the quantitative relation between an entity and some additional information.

An example of a measurement unit entity.

## Genomics

### Entities

**VARIANT** - All mentions of gene variations and mutations. For example, `c.524C>T`, `(MTRR):r.1462_1557del96`
  
**GENE_OR_PROTEIN** – All mentions of names and symbols of human genes as well as chromosomes and parts of chromosomes and proteins. For example, MTRR, F2.

**MUTATION_TYPE** - Description of the mutation, including its type, effect, and location. For example, trisomy, germline mutation, loss of function.

An example of a gene entity.

**EXPRESSION** - Gene expression level. For example, positive for-, negative for-, overexpressed, detected in high/low levels, elevated.

An example of a gene expression entity.


## Healthcare

### Entities
  
**ADMINISTRATIVE_EVENT** – Events that relate to the healthcare system but of an administrative/semi-administrative nature. For example, registration, admission, trial, study entry, transfer, discharge, hospitalization, hospital stay. 

**CARE_ENVIRONMENT** – An environment or location where patients are given care. For example, emergency room, physician’s office, cardio unit, hospice, hospital.

An example of a healthcare event entity.

**HEALTHCARE_PROFESSION** – A healthcare practitioner licensed or non-licensed. For example, dentist, pathologist, neurologist, radiologist, pharmacist, nutritionist, physical therapist, chiropractor.

Another example of a healthcare environment entity.

## Medical condition

### Entities

**DIAGNOSIS** – Disease, syndrome, poisoning. For example, breast cancer, Alzheimer’s, HTN, CHF, spinal cord injury.

**SYMPTOM_OR_SIGN** – Subjective or objective evidence of disease or other diagnoses. For example, chest pain, headache, dizziness, rash, SOB, abdomen was soft, good bowel sounds, well nourished.

An example of a medical condition entity.

**CONDITION_QUALIFIER** - Qualitative terms that are used to describe a medical condition. All the following subcategories are considered qualifiers:

* Time-related expressions: those are terms that describe the time dimension qualitatively, such as sudden, acute, chronic, longstanding. 
* Quality expressions:  Those are terms that describe the “nature” of the medical condition, such as burning, sharp.
* Severity expressions: severe, mild, a bit, uncontrolled.
* Extensivity expressions: local, focal, diffuse.

This screenshot shows another example of a condition qualifier attribute with a diagnosis entity.

**CONDITION_SCALE** – Qualitative terms that characterize the condition by a scale, which is a finite ordered list of values.

Another example of a condition qualifier attribute and a diagnosis entity.

## Medication

### Entities

**MEDICATION_CLASS** – A set of medications that have a similar mechanism of action, a related mode of action, a similar chemical structure, and/or are used to treat the same disease. For example, ACE inhibitor, opioid, antibiotics, pain relievers.

An example of a medication class entity.

**MEDICATION_NAME** – Medication mentions, including copyrighted brand names, and non-brand names. For example, Ibuprofen.

**DOSAGE** - Amount of medication ordered. For example, Infuse Sodium Chloride solution *1000 mL*.

**MEDICATION_FORM** - The form of the medication. For example, solution, pill, capsule, tablet, patch, gel, paste, foam, spray, drops, cream, syrup.

An example of a medication dosage attribute.

**MEDICATION_ROUTE** - The administration method of medication. For example, oral, topical, inhaled.

An example of a medication form attribute.

## Social

### Entities

**FAMILY_RELATION** – Mentions of family relatives of the subject. For example, father, daughter, siblings, parents.

Example of a family relation entity.

**EMPLOYMENT** – Mentions of employment status including specific profession, such as unemployed, retired, firefighter, student.

Example of an employment entity.

**LIVING_STATUS** – Mentions of the housing situation, including homeless, living with parents, living alone, living with others. 

Example of a living status entity.

**SUBSTANCE_USE** – Mentions of use of legal or illegal drugs, tobacco or alcohol. For example, smoking, drinking, or heroin use.

Example of a substance use entity.

**SUBSTANCE_USE_AMOUNT** – Mentions of specific amounts of substance use. For example, a pack (of cigarettes) or a few glasses (of wine). 

Example of a substance use amount entity.


## Treatment

### Entities

**TREATMENT_NAME** – Therapeutic procedures. For example, knee replacement surgery, bone marrow transplant, TAVI, diet.

An example of a treatment name entity.



## Next steps

* [How to call the Text Analytics for health](../how-to/call-api.md)
