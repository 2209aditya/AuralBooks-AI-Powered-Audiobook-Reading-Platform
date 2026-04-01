<div align="center">

<img src="https://img.shields.io/badge/AuralBooks-AI%20Reading%20Platform-6C63FF?style=for-the-badge&logo=bookstack&logoColor=white" alt="AuralBooks"/>

# 📚 AuralBooks — AI-Powered Audiobook & Reading Platform

> **Enterprise-grade, cloud-native reading platform** engineered for 2M+ concurrent users  
> Angular 18 · Spring Boot 3.3 · Azure AKS · Helm · ArgoCD · Multi-Environment · GitOps

<br/>

[![Build Status](https://dev.azure.com/auralbooks/auralbooks/_apis/build/status/auralbooks-ci?branchName=main&label=Azure%20DevOps%20CI)](https://dev.azure.com/auralbooks/auralbooks/_build)
[![Release](https://vsrm.dev.azure.com/auralbooks/_apis/public/Release/badge/auralbooks/1/1)](https://dev.azure.com/auralbooks/auralbooks/_release)
[![Coverage](https://img.shields.io/badge/Coverage-87%25-success?style=flat-square&logo=jacoco)](https://dev.azure.com/auralbooks)
[![SonarQube](https://img.shields.io/badge/SonarQube-Passed-brightgreen?style=flat-square&logo=sonarqube)](https://sonarqube.auralbooks.com)
[![Security](https://img.shields.io/badge/SAST-Clean-blue?style=flat-square&logo=snyk)](https://dev.azure.com/auralbooks)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=flat-square&logo=openjdk)](https://openjdk.org/)
[![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=flat-square&logo=angular)](https://angular.dev)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3-6DB33F?style=flat-square&logo=springboot)](https://spring.io/projects/spring-boot)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-AKS-326CE5?style=flat-square&logo=kubernetes)](https://azure.microsoft.com/en-us/products/kubernetes-service)
[![Helm](https://img.shields.io/badge/Helm-3.x-0F1689?style=flat-square&logo=helm)](https://helm.sh)
[![ArgoCD](https://img.shields.io/badge/ArgoCD-GitOps-EF7B4D?style=flat-square&logo=argo)](https://argoproj.github.io/cd/)

<br/>

<table>
<tr>
<td align="center"><b>🌍 Environments</b><br/>DEV · UAT · PRE-PROD · PROD · DR</td>
<td align="center"><b>⚡ Scale</b><br/>2M+ Users · 50 pods max · 78GB Redis</td>
<td align="center"><b>🔒 Security</b><br/>WAF · SAST · DAST · Zero-Trust</td>
<td align="center"><b>🤖 AI-Powered</b><br/>GPT-4o · Neural TTS · ML Recs</td>
</tr>
</table>

</div>

---

## 📋 Table of Contents

<details>
<summary><b>Click to expand full TOC</b></summary>

- [✨ Features Overview](#-features-overview)
- [🏗️ Architecture](#️-architecture)
  - [High-Level Design](#high-level-design-hld)
  - [Microservices Decomposition](#microservices-decomposition)
- [🌍 Multi-Environment Strategy](#-multi-environment-strategy)
  - [Environment Overview](#environment-overview)
  - [Environment Configuration](#environment-configuration)
  - [Infra Setup Per Environment](#infra-setup-per-environment)
- [🚀 CI/CD Pipelines — Azure DevOps](#-cicd-pipelines--azure-devops)
  - [Pipeline Architecture](#pipeline-architecture)
  - [DEV Pipeline](#dev-pipeline)
  - [UAT Pipeline](#uat-pipeline)
  - [PRE-PROD Pipeline](#pre-prod-pipeline)
  - [PROD Pipeline](#prod-pipeline)
  - [Variable Groups & Library](#variable-groups--library)
- [⚙️ Helm & ArgoCD — GitOps](#️-helm--argocd--gitops)
  - [Helm Chart Structure](#helm-chart-structure)
  - [ArgoCD Application Setup](#argocd-application-setup)
  - [GitOps Workflow](#gitops-workflow)
- [📈 Autoscaling](#-autoscaling)
  - [HPA Configuration](#hpa-configuration)
  - [KEDA — Event-Driven Scaling](#keda--event-driven-scaling)
  - [Cluster Autoscaler](#cluster-autoscaler)
- [⚡ Fault Tolerance](#-fault-tolerance)
  - [Circuit Breaker](#circuit-breaker)
  - [Retry & Timeout Policies](#retry--timeout-policies)
  - [Pod Disruption Budgets](#pod-disruption-budgets)
  - [Health Probes](#health-probes)
- [🌐 Disaster Recovery Strategy](#-disaster-recovery-strategy)
  - [DR Architecture](#dr-architecture)
  - [RTO & RPO Targets](#rto--rpo-targets)
  - [Failover Runbook](#failover-runbook)
  - [DR Drill Schedule](#dr-drill-schedule)
- [🧪 Testing Strategy](#-testing-strategy)
  - [SonarQube Quality Gate](#sonarqube-quality-gate)
  - [SAST — Static Analysis](#sast--static-analysis)
  - [DAST — Dynamic Analysis](#dast--dynamic-analysis)
  - [NFR / Performance Testing](#nfr--performance-testing)
  - [Load Testing](#load-testing)
  - [Regression Testing](#regression-testing)
- [🔐 Security](#-security)
- [📊 Monitoring & Observability](#-monitoring--observability)
- [⚡ Quick Start](#-quick-start)
- [🗄️ Database & Caching](#️-database--caching)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

</details>

---

## ✨ Features Overview

<table>
<thead>
<tr><th>Category</th><th>Feature</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td rowspan="4"><b>📖 Reading</b></td><td>ePub / PDF Reader</td><td>In-browser reader with Light/Sepia/Dark themes, offline PWA support</td></tr>
<tr><td>AI Audiobook Narration</td><td>Azure Neural TTS · 25+ voices · speed 0.5×–3.0× · cross-device sync</td></tr>
<tr><td>Smart Highlights</td><td>5-colour highlights · server-side sync · AI explanation on tap</td></tr>
<tr><td>Progress Sync</td><td>Real-time reading position sync via WebSocket STOMP across all devices</td></tr>
<tr><td rowspan="3"><b>🤖 AI</b></td><td>Reading Assistant</td><td>GPT-4o Q&A panel — context-aware, 10-turn conversation history</td></tr>
<tr><td>Personalised Recs</td><td>ML-based picks refreshed every 6 hours, "Because you read X" labels</td></tr>
<tr><td>AI Group Bot</td><td>Mention <code>@auralai</code> in group chat for book insights inline</td></tr>
<tr><td rowspan="2"><b>👥 Social</b></td><td>Reading Groups</td><td>Genre-based communities (up to 10,000 members), roles: Owner/Mod/Member</td></tr>
<tr><td>Real-time Chat</td><td>WebSocket STOMP + Azure SignalR · typing indicators · reactions</td></tr>
<tr><td rowspan="2"><b>🛒 Commerce</b></td><td>Buy / Rent Books</td><td>Stripe PaymentIntent · webhook confirmed · SAS URL–enforced rental expiry</td></tr>
<tr><td>Publisher Dashboard</td><td>Upload books · AI audio generation · sales analytics · royalty statements</td></tr>
<tr><td rowspan="2"><b>🔐 Auth</b></td><td>JWT Auth</td><td>15-min access + 30-day refresh tokens · Redis blacklist on logout</td></tr>
<tr><td>RBAC</td><td><code>ROLE_USER</code> · <code>ROLE_PUBLISHER</code> · <code>ROLE_ADMIN</code> enforced via <code>@PreAuthorize</code></td></tr>
</tbody>
</table>

---

## 🏗️ Architecture

### High-Level Design (HLD)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CLIENTS                                             │
│         Angular 18 SPA (Web)  ·  Mobile PWA  ·  Publisher Admin Portal          │
└──────────────────────────────────────┬──────────────────────────────────────────┘
                                       │  HTTPS / WSS
┌──────────────────────────────────────▼──────────────────────────────────────────┐
│  EDGE LAYER — Azure Front Door Premium                                           │
│  WAF (OWASP 3.2) · DDoS · Anycast Routing · TLS 1.3 · Geo-Failover East↔West   │
└──────────────────────────────────────┬──────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────────┐
│  GATEWAY LAYER                                                                   │
│  Azure API Management — JWT validation, rate limiting (1K req/min)               │
│  NGINX Ingress Controller — in-cluster L7 routing                                │
└──────────────────────────────────────┬──────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────────┐
│  MICROSERVICES LAYER  (AKS — Helm-deployed, ArgoCD-managed)                      │
│                                                                                  │
│   book-service :8080   │  user-service :8081  │  chat-service (WS)              │
│   ai-service :8082     │  marketplace :8083   │  event-service :8084            │
└──────────────────────────────────────┬──────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────────┐
│  ASYNC PROCESSING LAYER                                                          │
│  Azure Service Bus · Azure Event Hubs · Azure Functions (TTS, royalties, email) │
└──────────────────────────────────────┬──────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────────┐
│  DATA LAYER                                                                      │
│  PostgreSQL 16 · Azure Redis P3 · Azure Cosmos DB · Azure Blob Storage (CDN)    │
└──────────────────────────────────────┬──────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────────┐
│  AI / ML LAYER                                                                   │
│  Azure OpenAI GPT-4o · Azure Neural TTS · Azure ML · Azure Cognitive Search     │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Microservices Decomposition

| Service | Port | Namespace | Redis Prefix | HPA Range |
|---|---|---|---|---|
| `book-service` | 8080 | `auralbooks-core` | `bk::` | 5 – 50 pods |
| `user-service` | 8081 | `auralbooks-core` | `usr::` | 5 – 20 pods |
| `chat-service` | 8082 | `auralbooks-social` | `chat::` | 5 – 20 pods |
| `ai-service` | 8083 | `auralbooks-ai` | `ai::` | 5 – 20 pods |
| `marketplace-service` | 8084 | `auralbooks-commerce` | `mkt::` | 5 – 15 pods |
| `event-service` | 8085 | `auralbooks-social` | `evt::` | 2 – 8 pods |

---

## 🌍 Multi-Environment Strategy

### Environment Overview

```
  ┌───────────────────────────────────────────────────────────────────────┐
  │                     ENVIRONMENT PROMOTION FLOW                        │
  │                                                                       │
  │  feature/*  ──▶  DEV  ──▶  UAT  ──▶  PRE-PROD  ──▶  PROD           │
  │                   │                                     │             │
  │                   │                                DR (standby)       │
  │                  auto                  manual gate required           │
  └───────────────────────────────────────────────────────────────────────┘
```

| Environment | Purpose | Region | AKS Size | Auto-Deploy | Approval |
|---|---|---|---|---|---|
| **DEV** | Feature development & smoke tests | East US 2 | 2×D4s_v5 | ✅ On push to `develop` | ❌ None |
| **UAT** | Business acceptance testing | East US 2 | 3×D4s_v5 | ✅ On push to `uat` | ❌ None |
| **PRE-PROD** | Production-mirror staging, load & regression | East US 2 | 5×D8s_v5 | ✅ On push to `main` | ❌ None |
| **PROD** | Live production traffic | East US 2 + West Europe | 5–50×D8s_v5 | ⛔ Manual gate | ✅ 2 approvers |
| **DR** | Disaster recovery warm standby | West Europe | 3×D8s_v5 (idle) | ⛔ Triggered by failover | ✅ Incident Cmd |

---

### Environment Configuration

All environment-specific values are managed via **Helm values files** + **Azure App Configuration** + **Azure Key Vault**. No secrets ever live in Git.

```
helm/
└── auralbooks/
    ├── Chart.yaml
    ├── values.yaml                  # Shared defaults
    ├── values-dev.yaml              # DEV overrides
    ├── values-uat.yaml              # UAT overrides
    ├── values-preprod.yaml          # PRE-PROD overrides
    ├── values-prod.yaml             # PROD overrides
    └── values-dr.yaml               # DR overrides
```

<details>
<summary><b>values-dev.yaml — example</b></summary>

```yaml
replicaCount: 1
image:
  tag: "latest"
resources:
  requests:
    cpu: "250m"
    memory: "512Mi"
  limits:
    cpu: "500m"
    memory: "1Gi"
ingress:
  host: dev-api.auralbooks.com
appConfig:
  logLevel: DEBUG
  cacheEnabled: false
  aiEnabled: false           # AI calls disabled in DEV to save cost
  stripeMode: test
postgresql:
  tier: GeneralPurpose
  cores: 2
  storage: 32Gi
redis:
  sku: Basic
  capacity: 1
hpa:
  minReplicas: 1
  maxReplicas: 3
```
</details>

<details>
<summary><b>values-prod.yaml — example</b></summary>

```yaml
replicaCount: 5
image:
  tag: ""                    # Set dynamically by CI/CD pipeline
resources:
  requests:
    cpu: "1000m"
    memory: "2Gi"
  limits:
    cpu: "2000m"
    memory: "4Gi"
ingress:
  host: api.auralbooks.com
appConfig:
  logLevel: WARN
  cacheEnabled: true
  aiEnabled: true
  stripeMode: live
postgresql:
  tier: BusinessCritical
  cores: 16
  storage: 1Ti
redis:
  sku: Premium
  capacity: 3                # P3 — 78GB, 3 shards
hpa:
  minReplicas: 5
  maxReplicas: 50
podDisruptionBudget:
  enabled: true
  minAvailable: 3
```
</details>

---

### Infra Setup Per Environment

<details>
<summary><b>🔵 DEV Environment</b></summary>

```bash
# Resource group
az group create --name rg-auralbooks-dev --location eastus2

# AKS — minimal, cost-optimised
az aks create \
  --resource-group rg-auralbooks-dev \
  --name aks-auralbooks-dev \
  --kubernetes-version 1.29 \
  --node-count 2 \
  --node-vm-size Standard_D4s_v5 \
  --network-plugin azure \
  --enable-managed-identity

# PostgreSQL — General Purpose (dev)
az postgres flexible-server create \
  --resource-group rg-auralbooks-dev \
  --name psql-auralbooks-dev \
  --sku-name Standard_D2s_v3 \
  --storage-size 32 \
  --version 16

# Redis — Basic (dev)
az redis create \
  --resource-group rg-auralbooks-dev \
  --name redis-auralbooks-dev \
  --sku Basic --vm-size c1

# Deploy via Helm
helm upgrade --install auralbooks ./helm/auralbooks \
  -f helm/auralbooks/values-dev.yaml \
  --namespace auralbooks-dev --create-namespace \
  --set image.tag=$(git rev-parse --short HEAD)
```
</details>

<details>
<summary><b>🟡 UAT Environment</b></summary>

```bash
az group create --name rg-auralbooks-uat --location eastus2

az aks create \
  --resource-group rg-auralbooks-uat \
  --name aks-auralbooks-uat \
  --kubernetes-version 1.29 \
  --node-count 3 \
  --node-vm-size Standard_D4s_v5 \
  --network-plugin azure \
  --enable-managed-identity

az postgres flexible-server create \
  --resource-group rg-auralbooks-uat \
  --name psql-auralbooks-uat \
  --sku-name Standard_D4s_v3 \
  --storage-size 128 \
  --version 16

az redis create \
  --resource-group rg-auralbooks-uat \
  --name redis-auralbooks-uat \
  --sku Standard --vm-size c2

helm upgrade --install auralbooks ./helm/auralbooks \
  -f helm/auralbooks/values-uat.yaml \
  --namespace auralbooks-uat --create-namespace \
  --set image.tag=$(git rev-parse --short HEAD)
```
</details>

<details>
<summary><b>🟠 PRE-PROD Environment</b></summary>

```bash
az group create --name rg-auralbooks-preprod --location eastus2

# Production-mirrored AKS cluster
az aks create \
  --resource-group rg-auralbooks-preprod \
  --name aks-auralbooks-preprod \
  --kubernetes-version 1.29 \
  --node-count 5 \
  --node-vm-size Standard_D8s_v5 \
  --network-plugin azure \
  --network-policy calico \
  --enable-managed-identity \
  --zones 1 2 3

# Business Critical PostgreSQL — mirrors PROD
az postgres flexible-server create \
  --resource-group rg-auralbooks-preprod \
  --name psql-auralbooks-preprod \
  --sku-name Standard_D8s_v3 \
  --storage-size 512 \
  --version 16 \
  --high-availability ZoneRedundant

# Redis Premium P1
az redis create \
  --resource-group rg-auralbooks-preprod \
  --name redis-auralbooks-preprod \
  --sku Premium --vm-size p1

helm upgrade --install auralbooks ./helm/auralbooks \
  -f helm/auralbooks/values-preprod.yaml \
  --namespace auralbooks-preprod --create-namespace \
  --set image.tag=$(git rev-parse --short HEAD)
```
</details>

<details>
<summary><b>🟢 PROD Environment</b></summary>

```bash
az group create --name rg-auralbooks-prod-eastus --location eastus2

# Full-scale AKS — 3 node pools, availability zones
az aks create \
  --resource-group rg-auralbooks-prod-eastus \
  --name aks-auralbooks-prod \
  --kubernetes-version 1.29 \
  --network-plugin azure \
  --network-policy calico \
  --enable-managed-identity \
  --enable-addons monitoring,azure-keyvault-secrets-provider \
  --zones 1 2 3

# System node pool
az aks nodepool add \
  --cluster-name aks-auralbooks-prod \
  --resource-group rg-auralbooks-prod-eastus \
  --name systempool --node-count 3 \
  --node-vm-size Standard_D4s_v5 \
  --node-taints CriticalAddonsOnly=true:NoSchedule \
  --zones 1 2 3

# Application node pool — autoscaled 5→50
az aks nodepool add \
  --cluster-name aks-auralbooks-prod \
  --resource-group rg-auralbooks-prod-eastus \
  --name apppool --node-vm-size Standard_D8s_v5 \
  --enable-cluster-autoscaler --min-count 5 --max-count 50 \
  --zones 1 2 3

# GPU node pool for AI workloads
az aks nodepool add \
  --cluster-name aks-auralbooks-prod \
  --resource-group rg-auralbooks-prod-eastus \
  --name gpupool --node-vm-size Standard_NC6s_v3 \
  --enable-cluster-autoscaler --min-count 2 --max-count 10 \
  --node-taints sku=gpu:NoSchedule \
  --zones 1 2 3

# PostgreSQL — Business Critical, zone-redundant HA
az postgres flexible-server create \
  --resource-group rg-auralbooks-prod-eastus \
  --name psql-auralbooks-prod \
  --sku-name Standard_D16s_v3 --storage-size 1024 \
  --version 16 --high-availability ZoneRedundant

# Redis Premium P3 — 3 shards, 78GB
az redis create \
  --resource-group rg-auralbooks-prod-eastus \
  --name redis-auralbooks-prod \
  --sku Premium --vm-size p3 --shard-count 3

helm upgrade --install auralbooks ./helm/auralbooks \
  -f helm/auralbooks/values-prod.yaml \
  --namespace auralbooks-core --create-namespace \
  --set image.tag=$IMAGE_TAG
```
</details>

<details>
<summary><b>🔴 DR Environment (West Europe — Warm Standby)</b></summary>

```bash
az group create --name rg-auralbooks-dr --location westeurope

# Warm standby AKS — pre-provisioned, scaled down
az aks create \
  --resource-group rg-auralbooks-dr \
  --name aks-auralbooks-dr \
  --location westeurope \
  --kubernetes-version 1.29 \
  --node-count 3 \
  --node-vm-size Standard_D8s_v5 \
  --network-plugin azure \
  --network-policy calico \
  --enable-managed-identity \
  --zones 1 2 3

# PostgreSQL read-replica from PROD
az postgres flexible-server replica create \
  --name psql-auralbooks-dr \
  --source-server psql-auralbooks-prod \
  --resource-group rg-auralbooks-dr \
  --location westeurope

# Redis geo-replication linked to PROD
az redis create \
  --resource-group rg-auralbooks-dr \
  --name redis-auralbooks-dr \
  --sku Premium --vm-size p3 --shard-count 3

az redis geo-replication link \
  --name redis-auralbooks-dr \
  --linked-redis-cache-name redis-auralbooks-prod \
  --linked-redis-cache-resource-group rg-auralbooks-prod-eastus \
  --resource-group rg-auralbooks-dr

# Deploy (scaled to 0 — activated only on failover)
helm upgrade --install auralbooks ./helm/auralbooks \
  -f helm/auralbooks/values-dr.yaml \
  --namespace auralbooks-core --create-namespace \
  --set replicaCount=0
```
</details>

---

## 🚀 CI/CD Pipelines — Azure DevOps

### Pipeline Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                      AZURE DEVOPS GITOPS CI/CD FLOW                          │
│                                                                              │
│  Developer Push (feature/* or develop)                                       │
│       │                                                                      │
│       ▼                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐            │
│  │  CI Pipeline — Build, Test & Quality Gate                    │            │
│  │  Maven/npm Build · JUnit · SonarQube · CodeQL · OWASP DC    │            │
│  └─────────────────────────┬────────────────────────────────────┘            │
│                            │ Image Push → Azure Container Registry           │
│                            ▼                                                 │
│  ┌──────────────────────────────────────────────────────────────┐            │
│  │  CD Pipeline — Helm values-*.yaml updated in GitOps repo     │            │
│  │  image.tag = $(Build.BuildId)-$(Build.SourceVersion)         │            │
│  └─────────────────────────┬────────────────────────────────────┘            │
│                            │                                                 │
│            ┌───────────────┼───────────────────────┐                        │
│            ▼               ▼                       ▼                        │
│       [DEV Stage]     [UAT Stage]           [PRE-PROD Stage]                 │
│       Auto-deploy     Auto-deploy           Auto-deploy                      │
│            │               │                       │                        │
│            │               │              [PROD Stage — Manual Gate]         │
│            │               │              2 Approvals required               │
│            ▼               ▼                       ▼                        │
│       ArgoCD syncs to respective AKS cluster (GitOps)                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

All pipelines are defined as YAML in `azure-pipelines/`. Azure DevOps **Variable Groups** and **Azure Key Vault** integration handle all secrets — no credentials live in YAML files.

---

### Variable Groups & Library

Before using the pipelines, configure the following Variable Groups in **Azure DevOps → Pipelines → Library**:

| Variable Group | Linked To | Contains |
|---|---|---|
| `auralbooks-common` | — | `SONAR_HOST_URL`, `ACR_NAME`, `ACR_LOGIN_SERVER` |
| `auralbooks-dev` | Key Vault `kv-auralbooks-dev` | `DB_URL`, `REDIS_URL`, `AZURE_CREDENTIALS` |
| `auralbooks-uat` | Key Vault `kv-auralbooks-uat` | `DB_URL`, `REDIS_URL`, `AZURE_CREDENTIALS` |
| `auralbooks-preprod` | Key Vault `kv-auralbooks-preprod` | `DB_URL`, `REDIS_URL`, `AZURE_CREDENTIALS` |
| `auralbooks-prod` | Key Vault `kv-auralbooks-prod` | `DB_URL`, `REDIS_URL`, `AZURE_CREDENTIALS`, `STRIPE_SECRET_KEY` |

> **Service Connections** required in Azure DevOps Project Settings:
> - `sc-acr-auralbooks` → Azure Container Registry
> - `sc-azure-dev`, `sc-azure-uat`, `sc-azure-preprod`, `sc-azure-prod` → ARM Service Connections per environment
> - `sc-sonarqube` → SonarQube server

---

### DEV Pipeline

Triggered on every push to `develop` or `feature/*` branches. Runs unit tests, SonarQube analysis, SAST, and deploys to the DEV AKS cluster via ArgoCD.

```yaml
# azure-pipelines/dev-pipeline.yml
trigger:
  branches:
    include:
      - develop
      - feature/*

pr: none

pool:
  vmImage: ubuntu-latest

variables:
  - group: auralbooks-common
  - group: auralbooks-dev
  - name: IMAGE_TAG
    value: "dev-$(Build.BuildId)-$(Build.SourceVersion)"
  - name: MAVEN_CACHE_FOLDER
    value: $(Pipeline.Workspace)/.m2/repository

stages:

  # ─────────────────────────────────────────────────────────
  # STAGE 1: BUILD & UNIT TESTS
  # ─────────────────────────────────────────────────────────
  - stage: Build
    displayName: "🔨 Build & Unit Tests"
    jobs:
      - job: BackendBuild
        displayName: "Backend — Maven Build & Unit Tests"
        steps:
          - task: Cache@2
            inputs:
              key: 'maven | "$(Agent.OS)" | backend/pom.xml'
              restoreKeys: |
                maven | "$(Agent.OS)"
                maven
              path: $(MAVEN_CACHE_FOLDER)
            displayName: "Cache Maven dependencies"

          - task: JavaToolInstaller@0
            inputs:
              versionSpec: "21"
              jdkArchitectureOption: x64
              jdkSourceOption: PreInstalled
            displayName: "Set up Java 21"

          - script: |
              cd backend
              mvn test \
                -Dgroups=unit \
                -Dmaven.repo.local=$(MAVEN_CACHE_FOLDER) \
                -q --no-transfer-progress
            displayName: "Run unit tests"

          - task: PublishTestResults@2
            inputs:
              testResultsFormat: JUnit
              testResultsFiles: "backend/**/surefire-reports/TEST-*.xml"
              mergeTestResults: true
              testRunTitle: "Backend Unit Tests — DEV"
            condition: always()

          - task: PublishCodeCoverageResults@2
            inputs:
              summaryFileLocation: "backend/target/site/jacoco/jacoco.xml"
              reportDirectory: "backend/target/site/jacoco"
            displayName: "Publish Jacoco coverage"

      - job: FrontendBuild
        displayName: "Frontend — npm Build & Unit Tests"
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: "20.x"
            displayName: "Set up Node 20"

          - task: Cache@2
            inputs:
              key: 'npm | "$(Agent.OS)" | frontend/package-lock.json'
              restoreKeys: npm | "$(Agent.OS)"
              path: $(Pipeline.Workspace)/.npm
            displayName: "Cache npm packages"

          - script: |
              cd frontend
              npm ci --cache $(Pipeline.Workspace)/.npm
              npx ng test --watch=false --browsers=ChromeHeadless --code-coverage
            displayName: "Run Angular unit tests"

          - task: PublishTestResults@2
            inputs:
              testResultsFormat: JUnit
              testResultsFiles: "frontend/test-results/TESTS-*.xml"
              testRunTitle: "Frontend Unit Tests — DEV"
            condition: always()

  # ─────────────────────────────────────────────────────────
  # STAGE 2: CODE QUALITY & SECURITY
  # ─────────────────────────────────────────────────────────
  - stage: Quality
    displayName: "🔍 Code Quality & SAST"
    dependsOn: Build
    jobs:
      - job: SonarQube
        displayName: "SonarQube Analysis"
        steps:
          - task: JavaToolInstaller@0
            inputs:
              versionSpec: "21"
              jdkArchitectureOption: x64
              jdkSourceOption: PreInstalled

          - task: SonarQubePrepare@6
            inputs:
              SonarQube: sc-sonarqube
              scannerMode: Other
              extraProperties: |
                sonar.projectKey=auralbooks-backend
                sonar.projectName=AuralBooks Backend
                sonar.sources=src/main/java
                sonar.tests=src/test/java
                sonar.java.binaries=target/classes
                sonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
                sonar.exclusions=**/generated/**,**/*Config*.java,**/*Application.java
            displayName: "Prepare SonarQube analysis"

          - script: |
              cd backend
              mvn verify sonar:sonar \
                -Dmaven.repo.local=$(MAVEN_CACHE_FOLDER) \
                --no-transfer-progress
            displayName: "Run Maven + SonarQube scan"

          - task: SonarQubePublish@6
            inputs:
              pollingTimeoutSec: "300"
            displayName: "Publish SonarQube results"

      - job: SAST
        displayName: "SAST — CodeQL + OWASP Dependency Check"
        steps:
          - task: AdvancedSecurity-Codeql-Init@1
            inputs:
              languages: java, javascript
              querysuite: security-extended
            displayName: "Initialize CodeQL"

          - task: JavaToolInstaller@0
            inputs:
              versionSpec: "21"
              jdkArchitectureOption: x64
              jdkSourceOption: PreInstalled

          - script: |
              cd backend
              mvn compile -Dmaven.repo.local=$(MAVEN_CACHE_FOLDER) --no-transfer-progress
            displayName: "Build for CodeQL"

          - task: AdvancedSecurity-Codeql-Analyze@1
            displayName: "Run CodeQL analysis"

          - script: |
              cd backend
              mvn org.owasp:dependency-check-maven:check \
                -DfailBuildOnCVSS=9 \
                -Dmaven.repo.local=$(MAVEN_CACHE_FOLDER) \
                --no-transfer-progress
            displayName: "OWASP Dependency Check (SCA)"

          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: "backend/target/dependency-check-report.html"
              artifactName: "owasp-dependency-report"
            condition: always()
            displayName: "Publish OWASP report"

  # ─────────────────────────────────────────────────────────
  # STAGE 3: BUILD & PUSH DOCKER IMAGES
  # ─────────────────────────────────────────────────────────
  - stage: DockerBuildPush
    displayName: "🐳 Build & Push Images to ACR"
    dependsOn: Quality
    jobs:
      - job: BuildPushImages
        displayName: "Build and push backend + frontend images"
        steps:
          - task: AzureCLI@2
            inputs:
              azureSubscription: sc-azure-dev
              scriptType: bash
              scriptLocation: inlineScript
              inlineScript: |
                az acr build \
                  --registry $(ACR_NAME) \
                  --image backend:$(IMAGE_TAG) \
                  ./backend \
                  --file ./backend/Dockerfile

                az acr build \
                  --registry $(ACR_NAME) \
                  --image frontend:$(IMAGE_TAG) \
                  ./frontend \
                  --file ./frontend/Dockerfile
            displayName: "Build and push images via ACR Tasks"

  # ─────────────────────────────────────────────────────────
  # STAGE 4: DEPLOY TO DEV
  # ─────────────────────────────────────────────────────────
  - stage: DeployDev
    displayName: "🔵 Deploy to DEV"
    dependsOn: DockerBuildPush
    jobs:
      - deployment: DeployToDev
        displayName: "Update GitOps values & ArgoCD sync"
        environment: dev
        strategy:
          runOnce:
            deploy:
              steps:
                - checkout: self
                  persistCredentials: true

                - script: |
                    sed -i "s|tag:.*|tag: $(IMAGE_TAG)|g" helm/auralbooks/values-dev.yaml
                    git config user.email "azuredevops@auralbooks.com"
                    git config user.name "Azure DevOps"
                    git add helm/auralbooks/values-dev.yaml
                    git commit -m "chore(dev): bump image to $(IMAGE_TAG) [skip ci]"
                    git push origin $(Build.SourceBranchName)
                  displayName: "Update Helm values for DEV (GitOps)"
                  # ArgoCD auto-syncs DEV cluster on this commit

                - script: |
                    sleep 90
                    curl -f https://dev-api.auralbooks.com/actuator/health || exit 1
                    echo "✅ DEV smoke test passed"
                  displayName: "Smoke test — DEV health check"
```

---

### UAT Pipeline

Triggered on push to `uat` branch. Runs integration tests with Testcontainers, Pact contract tests, OWASP ZAP DAST scan, then deploys to UAT via ArgoCD.

```yaml
# azure-pipelines/uat-pipeline.yml
trigger:
  branches:
    include:
      - uat

pr: none

pool:
  vmImage: ubuntu-latest

variables:
  - group: auralbooks-common
  - group: auralbooks-uat
  - name: IMAGE_TAG
    value: "uat-$(Build.BuildId)-$(Build.SourceVersion)"

stages:

  # ─────────────────────────────────────────────────────────
  # STAGE 1: INTEGRATION TESTS
  # ─────────────────────────────────────────────────────────
  - stage: IntegrationTests
    displayName: "🧪 Integration & Contract Tests"
    jobs:
      - job: BackendIntegration
        displayName: "Backend — Testcontainers integration tests"
        services:
          postgres:
            image: postgres:16-alpine
            env:
              POSTGRES_DB: auralbooks_test
              POSTGRES_USER: test
              POSTGRES_PASSWORD: test
            ports:
              - 5432:5432
          redis:
            image: redis:7.2-alpine
            ports:
              - 6379:6379
        steps:
          - task: JavaToolInstaller@0
            inputs:
              versionSpec: "21"
              jdkArchitectureOption: x64
              jdkSourceOption: PreInstalled

          - script: |
              cd backend
              mvn verify \
                -Dgroups=integration \
                -Dspring.profiles.active=test \
                -Dspring.datasource.url=jdbc:postgresql://localhost:5432/auralbooks_test \
                --no-transfer-progress
            displayName: "Run integration tests"

          - task: PublishTestResults@2
            inputs:
              testResultsFormat: JUnit
              testResultsFiles: "backend/**/failsafe-reports/TEST-*.xml"
              testRunTitle: "Backend Integration Tests — UAT"
            condition: always()

      - job: ContractTests
        displayName: "API Contract Tests — Pact"
        steps:
          - task: JavaToolInstaller@0
            inputs:
              versionSpec: "21"
              jdkArchitectureOption: x64
              jdkSourceOption: PreInstalled

          - script: |
              cd backend
              mvn test -Dgroups=contract --no-transfer-progress
            displayName: "Run Pact contract tests"

  # ─────────────────────────────────────────────────────────
  # STAGE 2: DAST SCAN ON UAT ENDPOINT
  # ─────────────────────────────────────────────────────────
  - stage: DAST
    displayName: "🛡️ DAST — OWASP ZAP Scan (UAT)"
    dependsOn: IntegrationTests
    jobs:
      - job: ZAPScan
        displayName: "OWASP ZAP Full Authenticated Scan"
        steps:
          - script: |
              docker run --rm \
                -v $(System.DefaultWorkingDirectory)/.zap:/zap/wrk/:rw \
                ghcr.io/zaproxy/zaproxy:stable zap-full-scan.py \
                -t https://uat-api.auralbooks.com \
                -r zap-report.html \
                -J zap-report.json \
                -l WARN \
                -c /zap/wrk/rules.tsv \
                -z "-config replacer.full_list(0).description=auth \
                     -config replacer.full_list(0).enabled=true \
                     -config replacer.full_list(0).matchtype=REQ_HEADER \
                     -config replacer.full_list(0).matchstr=Authorization \
                     -config replacer.full_list(0).replacement=Bearer $(ZAP_AUTH_TOKEN)"
            displayName: "Run ZAP authenticated scan"

          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: "$(System.DefaultWorkingDirectory)/.zap/zap-report.html"
              artifactName: "zap-dast-report-uat"
            condition: always()
            displayName: "Publish ZAP DAST report"

  # ─────────────────────────────────────────────────────────
  # STAGE 3: BUILD & PUSH
  # ─────────────────────────────────────────────────────────
  - stage: DockerBuildPush
    displayName: "🐳 Build & Push Images to ACR"
    dependsOn: DAST
    jobs:
      - job: BuildPushImages
        steps:
          - task: AzureCLI@2
            inputs:
              azureSubscription: sc-azure-uat
              scriptType: bash
              scriptLocation: inlineScript
              inlineScript: |
                az acr build \
                  --registry $(ACR_NAME) \
                  --image backend:$(IMAGE_TAG) ./backend \
                  --file ./backend/Dockerfile

                az acr build \
                  --registry $(ACR_NAME) \
                  --image frontend:$(IMAGE_TAG) ./frontend \
                  --file ./frontend/Dockerfile
            displayName: "Build and push images via ACR Tasks"

  # ─────────────────────────────────────────────────────────
  # STAGE 4: DEPLOY TO UAT
  # ─────────────────────────────────────────────────────────
  - stage: DeployUAT
    displayName: "🟡 Deploy to UAT"
    dependsOn: DockerBuildPush
    jobs:
      - deployment: DeployToUAT
        displayName: "Update GitOps & ArgoCD sync to UAT"
        environment: uat
        strategy:
          runOnce:
            deploy:
              steps:
                - checkout: self
                  persistCredentials: true

                - script: |
                    sed -i "s|tag:.*|tag: $(IMAGE_TAG)|g" helm/auralbooks/values-uat.yaml
                    git config user.email "azuredevops@auralbooks.com"
                    git config user.name "Azure DevOps"
                    git add helm/auralbooks/values-uat.yaml
                    git commit -m "chore(uat): promote $(IMAGE_TAG) to UAT [skip ci]"
                    git push origin uat
                  displayName: "Update Helm values for UAT (GitOps)"

                - script: |
                    sleep 90
                    curl -f https://uat-api.auralbooks.com/actuator/health || exit 1
                    curl -f https://uat.auralbooks.com || exit 1
                    echo "✅ UAT smoke tests passed"
                  displayName: "Smoke test — UAT health check"
```

---

### PRE-PROD Pipeline

Full quality gate. Triggered on push to `main`. Runs the complete test suite, SonarQube blocking quality gate, advanced SAST (Semgrep), ZAP full authenticated scan, Trivy container scan, Checkov IaC scan, k6 NFR benchmarks, and spike load test before deploying to PRE-PROD and running Playwright regression.

```yaml
# azure-pipelines/preprod-pipeline.yml
trigger:
  branches:
    include:
      - main

pr: none

pool:
  vmImage: ubuntu-latest

variables:
  - group: auralbooks-common
  - group: auralbooks-preprod
  - name: IMAGE_TAG
    value: "$(Build.BuildId)-$(Build.SourceVersion)"

stages:

  # ─────────────────────────────────────────────────────────
  # STAGE 1: FULL TEST SUITE
  # ─────────────────────────────────────────────────────────
  - stage: FullTestSuite
    displayName: "🧪 Full Test Suite — Unit + Integration + Regression"
    jobs:
      - job: BackendFullTests
        timeoutInMinutes: 30
        steps:
          - task: JavaToolInstaller@0
            inputs:
              versionSpec: "21"
              jdkArchitectureOption: x64
              jdkSourceOption: PreInstalled

          - script: |
              cd backend
              mvn verify \
                -Dspring.profiles.active=test \
                --no-transfer-progress
            displayName: "Full Maven verify (unit + integration)"

          - task: PublishTestResults@2
            inputs:
              testResultsFormat: JUnit
              testResultsFiles: |
                backend/**/surefire-reports/TEST-*.xml
                backend/**/failsafe-reports/TEST-*.xml
              mergeTestResults: true
              testRunTitle: "Full Backend Test Suite — PRE-PROD"
            condition: always()

          - task: PublishCodeCoverageResults@2
            inputs:
              summaryFileLocation: "backend/target/site/jacoco/jacoco.xml"
            displayName: "Publish coverage"

  # ─────────────────────────────────────────────────────────
  # STAGE 2: SONARQUBE QUALITY GATE (BLOCKING)
  # ─────────────────────────────────────────────────────────
  - stage: SonarQubeGate
    displayName: "🔬 SonarQube Quality Gate (Blocking)"
    dependsOn: FullTestSuite
    jobs:
      - job: SonarAnalysis
        steps:
          - task: JavaToolInstaller@0
            inputs:
              versionSpec: "21"
              jdkArchitectureOption: x64
              jdkSourceOption: PreInstalled

          - task: SonarQubePrepare@6
            inputs:
              SonarQube: sc-sonarqube
              scannerMode: Other
              extraProperties: |
                sonar.projectKey=auralbooks-backend
                sonar.sources=src/main/java
                sonar.tests=src/test/java
                sonar.java.binaries=target/classes
                sonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
                sonar.qualitygate.wait=true
                sonar.coverage.exclusions=**/*Config*.java,**/*Application.java

          - script: |
              cd backend
              mvn verify sonar:sonar --no-transfer-progress
            displayName: "Run SonarQube — quality gate blocks on fail"

          - task: SonarQubePublish@6
            inputs:
              pollingTimeoutSec: "300"

  # ─────────────────────────────────────────────────────────
  # STAGE 3: ADVANCED SAST
  # ─────────────────────────────────────────────────────────
  - stage: AdvancedSAST
    displayName: "🔐 Advanced SAST — Semgrep + CodeQL"
    dependsOn: FullTestSuite
    jobs:
      - job: Semgrep
        displayName: "Semgrep — OWASP Top 10 + Spring rules"
        container:
          image: returntocorp/semgrep
        steps:
          - script: |
              semgrep ci \
                --config p/java \
                --config p/spring \
                --config p/secrets \
                --config p/owasp-top-ten \
                --config p/sql-injection \
                --error \
                --sarif \
                --output semgrep-results.sarif
            displayName: "Run Semgrep scan"

          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: semgrep-results.sarif
              artifactName: semgrep-sarif
            condition: always()

      - job: CodeQL
        displayName: "CodeQL — Java + TypeScript (security-extended)"
        steps:
          - task: AdvancedSecurity-Codeql-Init@1
            inputs:
              languages: java, javascript
              querysuite: security-extended

          - task: JavaToolInstaller@0
            inputs:
              versionSpec: "21"
              jdkArchitectureOption: x64
              jdkSourceOption: PreInstalled

          - script: |
              cd backend
              mvn compile --no-transfer-progress
            displayName: "Build for CodeQL"

          - task: AdvancedSecurity-Codeql-Analyze@1

  # ─────────────────────────────────────────────────────────
  # STAGE 4: DAST — AUTHENTICATED FULL SCAN ON PRE-PROD
  # ─────────────────────────────────────────────────────────
  - stage: DAST
    displayName: "🛡️ DAST — OWASP ZAP Authenticated Full Scan"
    dependsOn: SonarQubeGate
    jobs:
      - job: ZAPFullScan
        steps:
          - script: |
              docker run --rm \
                -v $(System.DefaultWorkingDirectory)/.zap:/zap/wrk/:rw \
                ghcr.io/zaproxy/zaproxy:stable zap-full-scan.py \
                -t https://preprod-api.auralbooks.com \
                -r zap-report-preprod.html \
                -J zap-report-preprod.json \
                -l WARN \
                -c /zap/wrk/rules.tsv
            displayName: "Run ZAP full scan on PRE-PROD"

          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: "$(System.DefaultWorkingDirectory)/.zap/zap-report-preprod.html"
              artifactName: "zap-dast-report-preprod"
            condition: always()

  # ─────────────────────────────────────────────────────────
  # STAGE 5: CONTAINER & IaC SECURITY SCAN
  # ─────────────────────────────────────────────────────────
  - stage: SecurityScan
    displayName: "🔒 Container & IaC Security Scan"
    dependsOn: DockerBuildPush
    jobs:
      - job: TrivyScan
        displayName: "Trivy — Container image scan"
        steps:
          - script: |
              docker run --rm \
                aquasec/trivy:latest image \
                --exit-code 1 \
                --severity CRITICAL,HIGH \
                --format sarif \
                --output trivy-results.sarif \
                $(ACR_LOGIN_SERVER)/backend:$(IMAGE_TAG)
            displayName: "Scan backend image with Trivy"

          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: trivy-results.sarif
              artifactName: trivy-report
            condition: always()

      - job: CheckovScan
        displayName: "Checkov — Terraform IaC scan"
        container:
          image: bridgecrew/checkov:latest
        steps:
          - script: |
              checkov \
                --directory infra/terraform/ \
                --framework terraform \
                --output sarif \
                --output-file checkov-results.sarif \
                --soft-fail
            displayName: "Scan Terraform with Checkov"

          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: checkov-results.sarif
              artifactName: checkov-report
            condition: always()

  # ─────────────────────────────────────────────────────────
  # STAGE 6: NFR & LOAD TESTS
  # ─────────────────────────────────────────────────────────
  - stage: NFRTests
    displayName: "⚡ NFR & Load Tests (k6)"
    dependsOn: DeployPreProd
    jobs:
      - job: NFRBenchmark
        displayName: "k6 — NFR performance benchmark"
        steps:
          - script: |
              docker run --rm -i \
                -e BASE_URL=https://preprod-api.auralbooks.com \
                -e TEST_TOKEN=$(PREPROD_TEST_TOKEN) \
                -v $(System.DefaultWorkingDirectory)/tests/nfr:/scripts \
                grafana/k6:latest run /scripts/benchmark.js \
                --out json=nfr-results.json
            displayName: "Run k6 NFR benchmark (p95 < 200ms)"

          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: nfr-results.json
              artifactName: nfr-k6-results
            condition: always()

      - job: SpikeTest
        displayName: "k6 — Spike load test (2000 VUs)"
        dependsOn: NFRBenchmark
        steps:
          - script: |
              docker run --rm -i \
                -e BASE_URL=https://preprod-api.auralbooks.com \
                -e TEST_TOKEN=$(PREPROD_TEST_TOKEN) \
                -v $(System.DefaultWorkingDirectory)/tests/load:/scripts \
                grafana/k6:latest run /scripts/spike.js \
                --out json=spike-results.json
            displayName: "Run spike test — 2000 VU burst"

  # ─────────────────────────────────────────────────────────
  # STAGE 7: BUILD & PUSH
  # ─────────────────────────────────────────────────────────
  - stage: DockerBuildPush
    displayName: "🐳 Build & Push Images to ACR"
    dependsOn:
      - AdvancedSAST
      - SonarQubeGate
    jobs:
      - job: BuildPushImages
        steps:
          - task: AzureCLI@2
            inputs:
              azureSubscription: sc-azure-preprod
              scriptType: bash
              scriptLocation: inlineScript
              inlineScript: |
                az acr build \
                  --registry $(ACR_NAME) \
                  --image backend:$(IMAGE_TAG) ./backend \
                  --file ./backend/Dockerfile

                az acr build \
                  --registry $(ACR_NAME) \
                  --image frontend:$(IMAGE_TAG) ./frontend \
                  --file ./frontend/Dockerfile
            displayName: "Build and push images"

  # ─────────────────────────────────────────────────────────
  # STAGE 8: DEPLOY TO PRE-PROD
  # ─────────────────────────────────────────────────────────
  - stage: DeployPreProd
    displayName: "🟠 Deploy to PRE-PROD"
    dependsOn: DockerBuildPush
    jobs:
      - deployment: DeployToPreProd
        environment: preprod
        strategy:
          runOnce:
            deploy:
              steps:
                - checkout: self
                  persistCredentials: true

                - script: |
                    sed -i "s|tag:.*|tag: $(IMAGE_TAG)|g" helm/auralbooks/values-preprod.yaml
                    git config user.email "azuredevops@auralbooks.com"
                    git config user.name "Azure DevOps"
                    git add helm/auralbooks/values-preprod.yaml
                    git commit -m "chore(preprod): deploy $(IMAGE_TAG) [skip ci]"
                    git push origin main
                  displayName: "Update Helm values for PRE-PROD (GitOps)"

                - script: |
                    sleep 120
                    curl -f https://preprod-api.auralbooks.com/actuator/health || exit 1
                    echo "✅ PRE-PROD smoke test passed"
                  displayName: "Smoke test — PRE-PROD health check"

  # ─────────────────────────────────────────────────────────
  # STAGE 9: E2E REGRESSION SUITE
  # ─────────────────────────────────────────────────────────
  - stage: RegressionTests
    displayName: "🎭 E2E Regression — Playwright"
    dependsOn: NFRTests
    jobs:
      - job: PlaywrightRegression
        timeoutInMinutes: 45
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: "20.x"

          - script: |
              cd frontend
              npm ci
              npx playwright install --with-deps
              npx playwright test \
                --project=regression \
                --reporter=junit,html \
                --base-url=https://preprod.auralbooks.com
            displayName: "Run Playwright E2E regression suite"
            env:
              PLAYWRIGHT_TEST_BASE_URL: https://preprod.auralbooks.com

          - task: PublishTestResults@2
            inputs:
              testResultsFormat: JUnit
              testResultsFiles: "frontend/test-results/results.xml"
              testRunTitle: "Playwright E2E Regression — PRE-PROD"
            condition: always()

          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: "frontend/playwright-report"
              artifactName: playwright-report
            condition: always()
```

---

### PROD Pipeline

Blue-green canary deployment with mandatory 2-approver gate, automated canary health monitoring, and auto-rollback on failure. Manually triggered from Azure DevOps Release with the verified PRE-PROD image tag.

```yaml
# azure-pipelines/prod-pipeline.yml
trigger: none  # Manual trigger only — promoted from PRE-PROD

parameters:
  - name: imageTag
    displayName: "Verified PRE-PROD image tag to promote"
    type: string
  - name: canaryWeight
    displayName: "Initial canary traffic % (default: 10)"
    type: number
    default: 10

pool:
  vmImage: ubuntu-latest

variables:
  - group: auralbooks-common
  - group: auralbooks-prod
  - name: IMAGE_TAG
    value: ${{ parameters.imageTag }}
  - name: CANARY_WEIGHT
    value: ${{ parameters.canaryWeight }}

stages:

  # ─────────────────────────────────────────────────────────
  # STAGE 1: PRE-DEPLOYMENT VALIDATION
  # ─────────────────────────────────────────────────────────
  - stage: PreDeployValidation
    displayName: "✅ Pre-Deployment Validation"
    jobs:
      - job: ValidateImageExists
        displayName: "Validate image tag exists in ACR"
        steps:
          - task: AzureCLI@2
            inputs:
              azureSubscription: sc-azure-prod
              scriptType: bash
              scriptLocation: inlineScript
              inlineScript: |
                echo "Verifying image: $(ACR_LOGIN_SERVER)/backend:$(IMAGE_TAG)"
                az acr repository show-tags \
                  --name $(ACR_NAME) \
                  --repository backend \
                  --query "[?@ == '$(IMAGE_TAG)']" \
                  --output tsv | grep -q "$(IMAGE_TAG)" || \
                  (echo "❌ Image tag not found in ACR!" && exit 1)
                echo "✅ Image validated in ACR"
            displayName: "Validate image exists in ACR"

      - job: PreProdHealthCheck
        displayName: "Confirm PRE-PROD is healthy before promoting"
        steps:
          - script: |
              STATUS=$(curl -s https://preprod-api.auralbooks.com/actuator/health | jq -r '.status')
              if [ "$STATUS" != "UP" ]; then
                echo "❌ PRE-PROD is not healthy ($STATUS). Refusing to promote."
                exit 1
              fi
              echo "✅ PRE-PROD is healthy. Safe to promote."
            displayName: "PRE-PROD health gate"

  # ─────────────────────────────────────────────────────────
  # STAGE 2: CANARY DEPLOYMENT (requires 2 approvals)
  # ─────────────────────────────────────────────────────────
  - stage: CanaryDeploy
    displayName: "🐦 Canary Deploy (${{ parameters.canaryWeight }}% traffic)"
    dependsOn: PreDeployValidation
    jobs:
      - deployment: CanaryDeployment
        displayName: "Deploy canary to PROD"
        environment: production        # 2 approvers configured in Azure DevOps Environments
        strategy:
          runOnce:
            deploy:
              steps:
                - task: AzureCLI@2
                  inputs:
                    azureSubscription: sc-azure-prod
                    scriptType: bash
                    scriptLocation: inlineScript
                    inlineScript: |
                      az aks get-credentials \
                        --resource-group rg-auralbooks-prod-eastus \
                        --name aks-auralbooks-prod \
                        --overwrite-existing
                  displayName: "Get AKS credentials"

                - script: |
                    echo "Deploying canary: $(IMAGE_TAG)"
                    kubectl set image deployment/backend-canary \
                      backend=$(ACR_LOGIN_SERVER)/backend:$(IMAGE_TAG) \
                      -n auralbooks-core
                    kubectl rollout status deployment/backend-canary \
                      --timeout=5m \
                      -n auralbooks-core

                    # Route canary traffic via NGINX annotation
                    kubectl annotate ingress auralbooks-ingress \
                      nginx.ingress.kubernetes.io/canary="true" \
                      nginx.ingress.kubernetes.io/canary-weight="$(CANARY_WEIGHT)" \
                      --overwrite -n auralbooks-core

                    echo "✅ Canary deployed — $(CANARY_WEIGHT)% traffic routed"
                  displayName: "Deploy canary + set traffic weight"

  # ─────────────────────────────────────────────────────────
  # STAGE 3: CANARY HEALTH MONITORING (5 minutes)
  # ─────────────────────────────────────────────────────────
  - stage: CanaryMonitor
    displayName: "📊 Monitor Canary (5 min)"
    dependsOn: CanaryDeploy
    jobs:
      - job: MonitorCanary
        displayName: "Monitor canary error rate and latency"
        timeoutInMinutes: 10
        steps:
          - task: AzureCLI@2
            inputs:
              azureSubscription: sc-azure-prod
              scriptType: bash
              scriptLocation: inlineScript
              inlineScript: |
                echo "⏱️  Monitoring canary for 5 minutes..."
                sleep 300

                # Query Application Insights for canary pod metrics
                END_TIME=$(date -u +%Y-%m-%dT%H:%M:%SZ)
                START_TIME=$(date -u -d "5 minutes ago" +%Y-%m-%dT%H:%M:%SZ)

                ERROR_RATE=$(az monitor metrics list \
                  --resource "/subscriptions/$(AZURE_SUBSCRIPTION_ID)/resourceGroups/rg-auralbooks-prod-eastus/providers/microsoft.insights/components/appi-auralbooks-prod" \
                  --metric "requests/failed" \
                  --start-time "$START_TIME" --end-time "$END_TIME" \
                  --aggregation Average \
                  --query "value[0].timeseries[0].data[-1].average" \
                  --output tsv 2>/dev/null || echo "0")

                P95_LATENCY=$(az monitor metrics list \
                  --resource "/subscriptions/$(AZURE_SUBSCRIPTION_ID)/resourceGroups/rg-auralbooks-prod-eastus/providers/microsoft.insights/components/appi-auralbooks-prod" \
                  --metric "requests/duration" \
                  --start-time "$START_TIME" --end-time "$END_TIME" \
                  --aggregation Average \
                  --query "value[0].timeseries[0].data[-1].average" \
                  --output tsv 2>/dev/null || echo "0")

                echo "Canary error rate: ${ERROR_RATE}%"
                echo "Canary p95 latency: ${P95_LATENCY}ms"

                if (( $(echo "${ERROR_RATE} > 1" | bc -l) )); then
                  echo "❌ Error rate ${ERROR_RATE}% exceeds 1% threshold. Aborting rollout."
                  exit 1
                fi
                if (( $(echo "${P95_LATENCY} > 500" | bc -l) )); then
                  echo "❌ p95 latency ${P95_LATENCY}ms exceeds 500ms threshold. Aborting rollout."
                  exit 1
                fi
                echo "✅ Canary healthy — promoting to full fleet"
            displayName: "5-minute canary health assessment"

  # ─────────────────────────────────────────────────────────
  # STAGE 4: FULL FLEET PROMOTION (GitOps)
  # ─────────────────────────────────────────────────────────
  - stage: FullPromotion
    displayName: "🚀 Promote to Full PROD Fleet"
    dependsOn: CanaryMonitor
    jobs:
      - deployment: PromoteToFull
        environment: production
        strategy:
          runOnce:
            deploy:
              steps:
                - checkout: self
                  persistCredentials: true

                - script: |
                    sed -i "s|tag:.*|tag: $(IMAGE_TAG)|g" helm/auralbooks/values-prod.yaml
                    git config user.email "azuredevops@auralbooks.com"
                    git config user.name "Azure DevOps"
                    git add helm/auralbooks/values-prod.yaml
                    git commit -m "release: promote $(IMAGE_TAG) to PROD [skip ci]"
                    git push origin main
                  displayName: "Update Helm values for PROD (GitOps)"

                - task: AzureCLI@2
                  inputs:
                    azureSubscription: sc-azure-prod
                    scriptType: bash
                    scriptLocation: inlineScript
                    inlineScript: |
                      az aks get-credentials \
                        --resource-group rg-auralbooks-prod-eastus \
                        --name aks-auralbooks-prod --overwrite-existing

                      # Remove canary routing — full traffic to stable fleet
                      kubectl annotate ingress auralbooks-ingress \
                        nginx.ingress.kubernetes.io/canary- \
                        nginx.ingress.kubernetes.io/canary-weight- \
                        --overwrite -n auralbooks-core 2>/dev/null || true

                      echo "✅ Canary routing removed — ArgoCD rolling out to full fleet"
                  displayName: "Remove canary routing"

  # ─────────────────────────────────────────────────────────
  # STAGE 5: POST-DEPLOY VERIFICATION
  # ─────────────────────────────────────────────────────────
  - stage: PostDeployVerification
    displayName: "✅ Post-Deploy Health Verification"
    dependsOn: FullPromotion
    jobs:
      - job: HealthVerification
        steps:
          - script: |
              echo "Waiting 60s for ArgoCD full rollout..."
              sleep 60

              # API health
              curl -f https://api.auralbooks.com/actuator/health || exit 1

              # Frontend
              curl -f https://auralbooks.com || exit 1

              # Critical endpoint smoke tests
              curl -f https://api.auralbooks.com/api/v1/books?page=0&size=1 || exit 1

              echo "✅ PRODUCTION DEPLOYMENT SUCCESSFUL"
              echo "Image: $(IMAGE_TAG)"
              echo "Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
            displayName: "PROD health check + critical endpoint verification"

  # ─────────────────────────────────────────────────────────
  # AUTO-ROLLBACK (runs on any stage failure)
  # ─────────────────────────────────────────────────────────
  - stage: AutoRollback
    displayName: "🔄 Auto-Rollback"
    dependsOn:
      - CanaryDeploy
      - CanaryMonitor
      - FullPromotion
      - PostDeployVerification
    condition: failed()
    jobs:
      - job: Rollback
        displayName: "Rollback PROD deployment"
        steps:
          - task: AzureCLI@2
            inputs:
              azureSubscription: sc-azure-prod
              scriptType: bash
              scriptLocation: inlineScript
              inlineScript: |
                echo "🚨 DEPLOYMENT FAILED — Initiating auto-rollback"
                az aks get-credentials \
                  --resource-group rg-auralbooks-prod-eastus \
                  --name aks-auralbooks-prod --overwrite-existing

                # Rollback Kubernetes deployments
                kubectl rollout undo deployment/backend -n auralbooks-core
                kubectl rollout undo deployment/frontend -n auralbooks-core
                kubectl rollout undo deployment/backend-canary -n auralbooks-core 2>/dev/null || true

                # Remove canary routing
                kubectl annotate ingress auralbooks-ingress \
                  nginx.ingress.kubernetes.io/canary- \
                  nginx.ingress.kubernetes.io/canary-weight- \
                  -n auralbooks-core 2>/dev/null || true

                # Verify rollback
                kubectl rollout status deployment/backend --timeout=3m -n auralbooks-core
                echo "✅ Rollback complete"
            displayName: "Rollback kubectl deployments"

          - checkout: self
            persistCredentials: true

          - script: |
              git revert HEAD --no-edit
              git push origin main
            displayName: "Revert GitOps Helm values"
```

---

## ⚙️ Helm & ArgoCD — GitOps

### Helm Chart Structure

```
helm/
└── auralbooks/
    ├── Chart.yaml
    ├── values.yaml                        # Shared defaults across all environments
    ├── values-dev.yaml
    ├── values-uat.yaml
    ├── values-preprod.yaml
    ├── values-prod.yaml
    ├── values-dr.yaml
    └── templates/
        ├── _helpers.tpl
        ├── deployment.yaml                # Main workload template
        ├── service.yaml
        ├── ingress.yaml
        ├── hpa.yaml                       # HorizontalPodAutoscaler
        ├── pdb.yaml                       # PodDisruptionBudget
        ├── configmap.yaml
        ├── secret-provider-class.yaml     # Azure Key Vault CSI
        ├── serviceaccount.yaml            # Workload Identity
        ├── networkpolicy.yaml             # Calico deny-all + allow-list
        ├── keda-scaledobject.yaml         # KEDA event-driven scaler
        └── servicemonitor.yaml            # Prometheus scrape config
```

**`Chart.yaml`**:
```yaml
apiVersion: v2
name: auralbooks
description: AuralBooks — AI-Powered Reading Platform
type: application
version: 1.0.0
appVersion: "1.0.0"
dependencies:
  - name: postgresql
    version: "13.x.x"
    repository: https://charts.bitnami.com/bitnami
    condition: postgresql.enabled
  - name: redis
    version: "17.x.x"
    repository: https://charts.bitnami.com/bitnami
    condition: redis.enabled
```

<details>
<summary><b>templates/deployment.yaml (excerpt)</b></summary>

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "auralbooks.fullname" . }}-backend
  labels:
    {{- include "auralbooks.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: backend
  template:
    spec:
      serviceAccountName: {{ include "auralbooks.serviceAccountName" . }}
      containers:
        - name: backend
          image: "{{ .Values.image.repository }}/backend:{{ .Values.image.tag }}"
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          livenessProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 8080
            initialDelaySeconds: 60
            periodSeconds: 15
          readinessProbe:
            httpGet:
              path: /actuator/health/readiness
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
          volumeMounts:
            - name: secrets-store
              mountPath: "/mnt/secrets-store"
              readOnly: true
      volumes:
        - name: secrets-store
          csi:
            driver: secrets-store.csi.k8s.io
            readOnly: true
            volumeAttributes:
              secretProviderClass: auralbooks-kv-secrets
```
</details>

---

### ArgoCD Application Setup

```bash
# Install ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# ArgoCD CLI login
argocd login argocd.auralbooks.com \
  --username admin \
  --password $(kubectl get secret argocd-initial-admin-secret \
               -n argocd -o jsonpath="{.data.password}" | base64 -d)
```

**ArgoCD ApplicationSet** — manages all environments from a single manifest:

```yaml
# argocd/applicationset.yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: auralbooks-all-envs
  namespace: argocd
spec:
  generators:
    - list:
        elements:
          - env: dev
            cluster: https://aks-auralbooks-dev.eastus2.azmk8s.io
            namespace: auralbooks-dev
            valuesFile: values-dev.yaml
          - env: uat
            cluster: https://aks-auralbooks-uat.eastus2.azmk8s.io
            namespace: auralbooks-uat
            valuesFile: values-uat.yaml
          - env: preprod
            cluster: https://aks-auralbooks-preprod.eastus2.azmk8s.io
            namespace: auralbooks-preprod
            valuesFile: values-preprod.yaml
          - env: prod
            cluster: https://aks-auralbooks-prod.eastus2.azmk8s.io
            namespace: auralbooks-core
            valuesFile: values-prod.yaml
          - env: dr
            cluster: https://aks-auralbooks-dr.westeurope.azmk8s.io
            namespace: auralbooks-core
            valuesFile: values-dr.yaml
  template:
    metadata:
      name: 'auralbooks-{{env}}'
    spec:
      project: auralbooks
      source:
        repoURL: https://github.com/yourusername/auralbooks-gitops
        targetRevision: HEAD
        path: helm/auralbooks
        helm:
          valueFiles:
            - '{{valuesFile}}'
      destination:
        server: '{{cluster}}'
        namespace: '{{namespace}}'
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
        syncOptions:
          - CreateNamespace=true
          - PrunePropagationPolicy=foreground
        retry:
          limit: 5
          backoff:
            duration: 5s
            factor: 2
            maxDuration: 3m
```

> **Note:** PROD and DR sync policies are set to `manual` in ArgoCD UI — automated sync is enabled only for DEV, UAT, and PRE-PROD.

### GitOps Workflow

```
  Developer          Azure DevOps           GitOps Repo            ArgoCD                   AKS
      │                    │                     │                    │                       │
      │── git push ────────▶│                     │                    │                       │
      │                    │── run CI pipeline ──▶│                    │                       │
      │                    │   (build, test,      │                    │                       │
      │                    │    scan, push image) │                    │                       │
      │                    │── update values.yaml ▶│                    │                       │
      │                    │   (image.tag = sha)  │                    │                       │
      │                    │                     │── commit detected ──▶│                       │
      │                    │                     │                    │── detect drift ────────▶│
      │                    │                     │                    │── apply Helm chart ────▶│
      │                    │                     │                    │◀── sync status ─────────│
      │◀──────────── Azure DevOps notification (Teams / Email) ────────│                       │
```

---

## 📈 Autoscaling

### HPA Configuration

```yaml
# templates/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ include "auralbooks.fullname" . }}-backend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ include "auralbooks.fullname" . }}-backend
  minReplicas: {{ .Values.hpa.minReplicas }}
  maxReplicas: {{ .Values.hpa.maxReplicas }}
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 65
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 75
    - type: External
      external:
        metric:
          name: nginx_ingress_controller_requests_per_second
          selector:
            matchLabels:
              service: book-service
        target:
          type: AverageValue
          averageValue: "500"        # Scale when RPS > 500 per pod
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
        - type: Pods
          value: 4
          periodSeconds: 60          # Add max 4 pods/min on scale-up
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Pods
          value: 2
          periodSeconds: 120         # Remove max 2 pods/2min on scale-down
```

### KEDA — Event-Driven Scaling

Chat Service scales based on Azure Service Bus queue depth:

```yaml
# templates/keda-scaledobject.yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: chat-service-scaler
  namespace: auralbooks-social
spec:
  scaleTargetRef:
    name: chat-service
  minReplicaCount: 2
  maxReplicaCount: 20
  cooldownPeriod: 120
  triggers:
    - type: azure-servicebus
      metadata:
        queueName: chat-messages
        namespace: sb-auralbooks-prod
        messageCount: "50"           # 1 pod per 50 queued messages
      authenticationRef:
        name: keda-servicebus-auth
    - type: prometheus
      metadata:
        serverAddress: http://prometheus.monitoring:9090
        metricName: stomp_active_connections
        threshold: "200"             # Scale when > 200 active WS connections per pod
        query: sum(stomp_connections_active{app="chat-service"})
```

### Cluster Autoscaler

```bash
az aks update \
  --resource-group rg-auralbooks-prod-eastus \
  --name aks-auralbooks-prod \
  --cluster-autoscaler-profile \
    scan-interval=30s \
    scale-down-delay-after-add=10m \
    scale-down-unneeded-time=10m \
    scale-down-utilization-threshold=0.5 \
    max-graceful-termination-sec=600 \
    new-pod-scale-up-delay=0s
```

HPA targets per environment:

| Service | DEV min/max | UAT min/max | PRE-PROD min/max | PROD min/max |
|---|---|---|---|---|
| `book-service` | 1 / 3 | 2 / 5 | 3 / 20 | 5 / 50 |
| `user-service` | 1 / 2 | 2 / 5 | 3 / 10 | 5 / 20 |
| `chat-service` | 1 / 2 | 2 / 5 | 3 / 10 | 5 / 20 |
| `ai-service` | 1 / 2 | 2 / 4 | 2 / 8 | 5 / 20 |
| `marketplace-service` | 1 / 2 | 2 / 4 | 2 / 8 | 5 / 15 |

---

## ⚡ Fault Tolerance

### Circuit Breaker

Resilience4j is used on all inter-service and external API calls:

```yaml
# application.yml
resilience4j:
  circuitbreaker:
    instances:
      aiService:
        slidingWindowSize: 10
        failureRateThreshold: 50          # Open at 50% failure rate
        waitDurationInOpenState: 30s
        permittedNumberOfCallsInHalfOpenState: 3
        automaticTransitionFromOpenToHalfOpenEnabled: true
      stripeService:
        slidingWindowSize: 20
        failureRateThreshold: 30
        waitDurationInOpenState: 60s
  retry:
    instances:
      aiService:
        maxAttempts: 3
        waitDuration: 1s
        enableExponentialBackoff: true
        exponentialBackoffMultiplier: 2
      postgresRead:
        maxAttempts: 2
        waitDuration: 500ms
  timelimiter:
    instances:
      aiService:
        timeoutDuration: 30s
      stripeService:
        timeoutDuration: 10s
      bookService:
        timeoutDuration: 5s
```

```java
@CircuitBreaker(name = "aiService", fallbackMethod = "aiServiceFallback")
@Retry(name = "aiService")
@TimeLimiter(name = "aiService")
public CompletableFuture<String> askQuestion(String question, String bookContext) {
    return CompletableFuture.supplyAsync(() ->
        openAiClient.chat(question, bookContext));
}

public CompletableFuture<String> aiServiceFallback(String question, String bookContext, Exception ex) {
    log.warn("AI service unavailable, serving fallback: {}", ex.getMessage());
    return CompletableFuture.completedFuture(
        "AI assistant is temporarily unavailable. Please try again shortly.");
}
```

### Retry & Timeout Policies

```yaml
# NGINX Ingress upstream timeouts
nginx.ingress.kubernetes.io/proxy-connect-timeout: "5"
nginx.ingress.kubernetes.io/proxy-send-timeout: "60"
nginx.ingress.kubernetes.io/proxy-read-timeout: "60"
nginx.ingress.kubernetes.io/proxy-next-upstream: "error timeout http_502 http_503"
nginx.ingress.kubernetes.io/proxy-next-upstream-tries: "3"
```

### Pod Disruption Budgets

```yaml
# templates/pdb.yaml
{{- if .Values.podDisruptionBudget.enabled }}
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: {{ include "auralbooks.fullname" . }}-backend-pdb
spec:
  minAvailable: {{ .Values.podDisruptionBudget.minAvailable }}
  selector:
    matchLabels:
      app: backend
{{- end }}
```

| Service | minAvailable | Effect |
|---|---|---|
| `book-service` | 3 | At least 3 pods survive any disruption |
| `user-service` | 2 | No single rolling update kills all pods |
| `chat-service` | 2 | WebSocket connections preserved during deploys |
| `marketplace-service` | 2 | Payment processing never interrupted |

### Health Probes

```yaml
livenessProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 8080
  initialDelaySeconds: 60
  periodSeconds: 15
  failureThreshold: 3
  timeoutSeconds: 5

readinessProbe:
  httpGet:
    path: /actuator/health/readiness   # Checks DB + Redis connectivity
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  failureThreshold: 3
  successThreshold: 1

startupProbe:
  httpGet:
    path: /actuator/health
    port: 8080
  failureThreshold: 30
  periodSeconds: 10                    # Allow up to 5 min for slow cold starts
```

---

## 🌐 Disaster Recovery Strategy

### DR Architecture

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                       DISASTER RECOVERY TOPOLOGY                        │
  │                                                                         │
  │   PRIMARY (East US 2)                  DR (West Europe)                 │
  │   ────────────────────────────         ─────────────────────            │
  │   AKS PROD cluster (active)      ◀──── AKS DR cluster (warm standby)   │
  │   PostgreSQL (primary)           ──▶   PostgreSQL read replica          │
  │   Redis Premium P3               ──▶   Redis geo-replica (async)       │
  │   Blob Storage (Hot, GRS)        ──▶   Blob Storage (GRS secondary)    │
  │   Azure Front Door (100%)        ──▶   Azure Front Door (failover)     │
  │                                                                         │
  │   Normal:   100% traffic → East US 2                                    │
  │   Failover: 100% traffic → West Europe DR cluster                       │
  │   Failback: Gradual shift 10% → 50% → 100% back to East                │
  └─────────────────────────────────────────────────────────────────────────┘
```

### RTO & RPO Targets

| Scenario | RTO Target | RPO Target | Strategy |
|---|---|---|---|
| Single pod failure | < 30 sec | 0 (stateless) | Kubernetes self-healing |
| AZ failure | < 2 min | 0 | Multi-AZ node pools + zone-redundant DB |
| Region failure (full) | < 15 min | < 5 min | Azure Front Door geo-failover + DR cluster activation |
| Database corruption | < 30 min | < 1 hour | Point-in-time restore from automated backups |
| Data centre disaster | < 60 min | < 5 min | DR cluster in West Europe promotion |

### Failover Runbook

```bash
#!/bin/bash
# scripts/dr-failover.sh — Run by Incident Commander on region failure

echo "🚨 INITIATING DISASTER RECOVERY FAILOVER"
echo "Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)"

# Step 1 — Promote PostgreSQL replica to primary
echo "Step 1/5 — Promoting PostgreSQL DR replica..."
az postgres flexible-server restart \
  --resource-group rg-auralbooks-dr \
  --name psql-auralbooks-dr

az keyvault secret set \
  --vault-name kv-auralbooks-dr \
  --name DB-URL \
  --value "jdbc:postgresql://psql-auralbooks-dr.postgres.database.azure.com:5432/auralbooks?sslmode=require"

# Step 2 — Scale up DR AKS cluster
echo "Step 2/5 — Scaling up DR cluster..."
helm upgrade --install auralbooks ./helm/auralbooks \
  -f helm/auralbooks/values-dr.yaml \
  --set replicaCount=5 \
  --namespace auralbooks-core

# Step 3 — Wait for pods to be ready
echo "Step 3/5 — Waiting for DR pods..."
kubectl wait --for=condition=ready pod \
  --all -n auralbooks-core \
  --context aks-auralbooks-dr \
  --timeout=10m

# Step 4 — Switch Azure Front Door origin
echo "Step 4/5 — Rerouting traffic to DR..."
az network front-door origin update \
  --front-door-name afd-auralbooks \
  --origin-group primary-east \
  --resource-group rg-auralbooks-global \
  --enabled-state Disabled

az network front-door origin update \
  --front-door-name afd-auralbooks \
  --origin-group dr-westeurope \
  --resource-group rg-auralbooks-global \
  --enabled-state Enabled \
  --weight 1000

# Step 5 — Verify
echo "Step 5/5 — Verifying DR environment..."
sleep 60
HEALTH=$(curl -s https://api.auralbooks.com/actuator/health | jq -r '.status')
if [ "$HEALTH" = "UP" ]; then
  echo "✅ FAILOVER COMPLETE — DR cluster is live"
else
  echo "❌ Health check failed: $HEALTH"
  exit 1
fi
```

### DR Drill Schedule

| Drill Type | Frequency | Duration | Team |
|---|---|---|---|
| Tabletop exercise | Monthly | 1 hour | All engineering leads |
| Component failover (single service) | Bi-monthly | 2 hours | On-call SRE |
| Full regional failover drill | Quarterly | 4 hours | Platform + SRE teams |
| Chaos engineering (Chaos Mesh) | Weekly | 30 min | SRE |
| Backup restore verification | Weekly | 1 hour | DBA |

```bash
# Weekly Chaos Mesh experiment — random pod kill in PROD
kubectl apply -f - <<EOF
apiVersion: chaos-mesh.org/v1alpha1
kind: PodChaos
metadata:
  name: weekly-pod-failure
  namespace: auralbooks-core
spec:
  action: pod-kill
  mode: one
  selector:
    namespaces: [auralbooks-core]
    labelSelectors:
      app: book-service
  scheduler:
    cron: "@every 168h"
EOF
```

---

## 🧪 Testing Strategy

### Testing Pyramid

```
                    ┌───────────────┐
                    │   E2E / DAST  │  ← Playwright, OWASP ZAP
                   /│   Regression  │\
                  / └───────────────┘ \
                 /  ┌───────────────┐  \
                /   │  Integration  │   \  ← Testcontainers, Pact
               /    │  Load / NFR   │    \
              /     └───────────────┘     \
             / ┌───────────────────────┐   \
            /  │    Unit Tests         │    \  ← JUnit 5, Mockito, Jasmine
           /   │    SonarQube / SAST   │     \
          /    └───────────────────────┘      \
         └──────────────────────────────────────┘
```

### SonarQube Quality Gate

```properties
# sonar-project.properties
sonar.projectKey=auralbooks-backend
sonar.projectName=AuralBooks Backend
sonar.sources=src/main/java
sonar.tests=src/test/java
sonar.java.binaries=target/classes
sonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
sonar.exclusions=**/generated/**,**/*Config*.java,**/*Application.java

# Quality Gate thresholds (configured in SonarQube UI):
# ✅ Coverage              >= 80%
# ✅ Duplications          <= 3%
# ✅ Blocker issues        = 0
# ✅ Critical issues       = 0
# ✅ Security hotspots     0 unreviewed
# ✅ Reliability rating    A
# ✅ Security rating       A
# ✅ Maintainability       A
```

### SAST — Static Analysis

Three SAST tools run in the Azure DevOps pipeline on every PR:

| Tool | Scope | Fail Condition |
|---|---|---|
| **CodeQL** | Java + TypeScript — security-extended ruleset | Any critical finding |
| **Semgrep** | Java, Spring, OWASP Top 10, SQL injection rules | Any ERROR severity |
| **OWASP Dependency Check** | SCA — transitive dependencies | CVSS ≥ 9 (DEV), CVSS ≥ 7 (PRE-PROD) |

### DAST — Dynamic Analysis

```yaml
# .zap/zap-auth.conf
env:
  contexts:
    - name: AuralBooks
      urls:
        - https://uat-api.auralbooks.com
      authentication:
        method: json
        parameters:
          loginUrl: https://uat-api.auralbooks.com/api/v1/auth/login
          loginRequestData: '{"email":"zap-test@auralbooks.com","password":"ZapTest123!"}'
        verification:
          method: response
          loggedInRegex: '"accessToken"'
      users:
        - name: testuser
          credentials:
            username: zap-test@auralbooks.com
            password: ZapTest123!
  parameters:
    failOnError: true
jobs:
  - type: activeScan
    parameters:
      maxRuleDurationInMins: 5
      maxScanDurationInMins: 20
  - type: report
    parameters:
      reportDir: /zap/reports
      reportFormat: json,html
```

### NFR / Performance Testing

```javascript
// tests/nfr/benchmark.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('error_rate');
const bookListLatency = new Trend('book_list_latency');

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'],   // ✅ p95 < 200ms
    http_req_failed: ['rate<0.001'],    // ✅ Error rate < 0.1%
  },
};

export default function () {
  const res = http.get(`${__ENV.BASE_URL}/api/v1/books?page=0&size=20`, {
    headers: { Authorization: `Bearer ${__ENV.TEST_TOKEN}` },
  });
  bookListLatency.add(res.timings.duration);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  errorRate.add(res.status !== 200);
  sleep(1);
}
```

NFR targets:

| Metric | Target | Test Tool |
|---|---|---|
| API p95 latency | < 200ms | k6 |
| API p99 latency | < 500ms | k6 |
| Audio stream start | < 3s | k6 |
| Chat message delivery | < 100ms | k6 WebSocket |
| API availability | > 99.95% | Azure Monitor |
| Throughput | 10,000 req/min sustained | k6 |
| Error rate | < 0.1% | k6 |

### Load Testing

```javascript
// tests/load/spike.js
export const options = {
  stages: [
    { duration: '1m',  target: 100  },
    { duration: '30s', target: 2000 },   // Book launch spike
    { duration: '3m',  target: 2000 },
    { duration: '30s', target: 100  },
    { duration: '1m',  target: 0    },
  ],
  thresholds: {
    http_req_duration: ['p(99)<1000'],
    http_req_failed: ['rate<0.05'],
  },
};
```

```javascript
// tests/load/soak.js
export const options = {
  stages: [
    { duration: '5m', target: 500 },
    { duration: '4h', target: 500 },    // 4-hour soak — memory leak detection
    { duration: '5m', target: 0   },
  ],
  thresholds: {
    http_req_duration: ['p(95)<300'],
    http_req_failed: ['rate<0.001'],
  },
};
```

### Regression Testing

```bash
# Run Playwright E2E regression suite on PRE-PROD
cd frontend
npx playwright test \
  --project=regression \
  --reporter=html,github \
  --base-url=https://preprod.auralbooks.com

# Regression coverage areas:
# ✅ Auth flows (register, login, refresh, logout)
# ✅ Book catalog browsing and search
# ✅ ePub reader (open, highlight, sync progress)
# ✅ Audio player (play, pause, seek, speed)
# ✅ Purchase flow (Stripe test mode)
# ✅ Chat (WebSocket connect, send, receive)
# ✅ AI assistant (ask question, get response)
# ✅ Group creation and join
# ✅ Event RSVP

# Backend regression
cd backend
mvn verify \
  -Dspring.profiles.active=regression \
  -Dregression.base-url=https://preprod-api.auralbooks.com \
  -Dgroups="unit,integration,regression"
```

---

## 🔐 Security

### Defence-in-Depth

```
Internet → Azure DDoS Protection → Front Door WAF (OWASP 3.2)
        → TLS 1.3 → API Management (JWT, rate limiting 1K req/min)
        → NGINX Ingress → Calico Network Policies (deny-all + allow-list)
        → Spring Security (JwtAuthFilter, @PreAuthorize)
        → Input Validation (Bean Validation) → Parameterised JPA queries
        → Azure Key Vault (zero secrets in code/Git/env vars)
        → Private Endpoints (no public data plane access)
        → Workload Identity (no long-lived service principal credentials)
```

### JWT Token Lifecycle

| Property | Value |
|---|---|
| Algorithm | HMAC-SHA256 |
| Access token TTL | 15 minutes |
| Refresh token TTL | 30 days |
| Blacklist store | Redis `jwt:blacklist:{jti}` |
| Silent refresh | Angular `RefreshInterceptor` handles 401 automatically |

---

## 📊 Monitoring & Observability

### Stack

| Tool | Purpose |
|---|---|
| Azure Monitor + App Insights | APM, distributed traces, exceptions |
| Prometheus + Grafana | In-cluster metrics, custom dashboards |
| Container Insights | AKS pod/node utilisation |
| Log Analytics (Kusto) | Centralised log aggregation |
| Azure Cost Management | Spend tracking, budget alerts |

### SLOs

| Metric | Target | Critical Alert |
|---|---|---|
| API availability | 99.95% | < 99.5% → PagerDuty |
| API p99 latency | < 500ms | > 1,000ms → PagerDuty |
| Audio stream start | < 3s | > 8s → Teams |
| Payment success rate | > 99.5% | < 97% → PagerDuty + Finance |
| Pod restart rate | < 1/hr | > 20/hr → PagerDuty |

---

## ⚡ Quick Start

### Option A — Docker Compose

```bash
# 1. Clone
git clone https://github.com/yourusername/auralbooks.git
cd auralbooks

# 2. Configure environment
cp .env.example .env
# Edit .env — set JWT_SECRET and AZURE_OPENAI_* at minimum

# 3. Start full stack
docker compose up --build

# 4. Access:
#    Frontend:  http://localhost:4200
#    Backend:   http://localhost:8080
#    Swagger:   http://localhost:8080/swagger-ui.html
```

### Option B — Helm Deploy to Kubernetes

```bash
# Add required Helm repos
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo add cert-manager https://charts.jetstack.io
helm repo add kedacore https://kedacore.github.io/charts
helm repo update

# Install cluster essentials
helm install ingress-nginx ingress-nginx/ingress-nginx -n ingress-nginx --create-namespace
helm install cert-manager cert-manager/cert-manager -n cert-manager --create-namespace \
  --set installCRDs=true
helm install keda kedacore/keda -n keda --create-namespace

# Deploy AuralBooks to DEV
helm upgrade --install auralbooks ./helm/auralbooks \
  -f helm/auralbooks/values-dev.yaml \
  --namespace auralbooks-dev --create-namespace \
  --set image.tag=latest
```

### Prerequisites

| Tool | Version |
|---|---|
| Java (OpenJDK) | 21+ |
| Maven | 3.9+ |
| Node.js | 20+ LTS |
| Angular CLI | 18+ |
| Docker | 24+ |
| Helm | 3.x |
| kubectl | 1.29+ |
| ArgoCD CLI | 2.x |
| Azure CLI | latest |

---

## 🗄️ Database & Caching

### PostgreSQL Configuration (HikariCP)

```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

### Redis Cache TTLs

| Cache Key | TTL | Invalidation Trigger |
|---|---|---|
| `bk::{id}` | 60 min | On `updateBook()` |
| `bk::list::{params}` | 5 min | On any book change |
| `usr::recs::{userId}` | 6 hr | On reading state update |
| `ai::audio::{bookId}_{chapter}` | 55 min | On audio regeneration |
| `ai::summary::{bookId}_{chapter}` | 24 hr | Manual admin evict |
| `usr::session::{userId}` | 30 min | On logout |
| `jwt::blacklist::{jti}` | Token TTL | Auto-expires |

---

## 🤝 Contributing

```bash
# 1. Fork the repo
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit using Conventional Commits
git commit -m "feat(reader): add bookmark sync across devices"

# 4. Push and open a PR to develop
git push origin feature/your-feature-name
```

**Branch naming:** `feature/`, `fix/`, `hotfix/`, `chore/`, `docs/`

**PR requirements:** 2 approvals · SonarQube green · All Azure DevOps CI checks passing · Coverage ≥ 80%

**Code style:** Google Java Style Guide + Lombok (backend) · Angular Style Guide + ESLint + Prettier (frontend)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ using Angular 18 · Spring Boot 3.3 · Azure AKS · Helm · ArgoCD · Azure DevOps**

[Documentation](https://docs.auralbooks.com) · [API Docs](https://api.auralbooks.com/swagger-ui.html) · [Issues](https://github.com/yourusername/auralbooks/issues) · [platform@auralbooks.com](mailto:platform@auralbooks.com)

</div>
