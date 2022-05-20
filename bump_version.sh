if [ $# -ne 1 ]; then
    echo "Usage: bump_version.sh <major|minor|patch>"
    exit 1
fi
type=$1
cd server/
new_version=$( yarn version --$type | grep "New version" | sed 's/info New version: //' )
cd ../client/
yarn version --new-version $new_version
cd ../
sed -i '' "s/haidousm\/traefiker-server:v[0-9]\.[0-9]\.[0-9]/haidousm\/traefiker-server:v$new_version/g" docker-compose.yml
sed -i '' "s/haidousm\/traefiker-client:v[0-9]\.[0-9]\.[0-9]/haidousm\/traefiker-client:v$new_version/g" docker-compose.yml
