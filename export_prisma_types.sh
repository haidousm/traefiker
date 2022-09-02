set -x

PRISMA_TYPES=./server/node_modules/.prisma/client/index.d.ts
SERVER_TYPES=./server/src/types/*.types.ts

CLIENT_LOCATION=./client/src/types/server

if [ ! -f "$PRISMA_TYPES" ]; then
    echo "[ERROR] - Prisma types not found"
    exit 1
fi

if [ ! -f "$CLIENT_LOCATION" ]; then
    mkdir $CLIENT_LOCATION
fi

cp $PRISMA_TYPES $CLIENT_LOCATION/prisma.d.ts

echo "\n\n/**MANUALLY WRITTEN TYPES**/" >> $CLIENT_LOCATION/prisma.d.ts
tail -n+2 $SERVER_TYPES >> $CLIENT_LOCATION/prisma.d.ts