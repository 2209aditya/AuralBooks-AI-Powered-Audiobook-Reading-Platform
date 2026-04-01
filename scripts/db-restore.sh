#!/bin/bash

echo "Starting DB Restore..."

PGHOST=$1
PGUSER=$2
DB_NAME=$3
BACKUP_FILE=$4

if [ -z "$BACKUP_FILE" ]; then
  echo "Backup file missing"
  exit 1
fi

psql -h $PGHOST -U $PGUSER -d $DB_NAME < $BACKUP_FILE

echo "Restore completed"