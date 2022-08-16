SERVER_LOCATION=./server/node_modules/.prisma/client/index.d.ts
CLIENT_LOCATION=./client/src/types/server
if [ ! -f "$SERVER_LOCATION" ]; then
    echo "[ERROR] - Prisma types not found"
    exit 1
fi
cp $SERVER_LOCATION $CLIENT_LOCATION/prisma.d.ts
