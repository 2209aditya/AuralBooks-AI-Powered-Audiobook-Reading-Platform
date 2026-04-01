#!/bin/bash

echo "Triggering DR Failover..."

# Switch DNS (simulate Azure Front Door failover)
echo "Switching traffic to DR region..."

kubectl config use-context dr-cluster

kubectl scale deployment auralbooks --replicas=10

echo "DR Failover completed"