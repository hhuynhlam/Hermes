GULP=$(which gulp)

# clean and build local_dist
pushd ../client
GULP clean
GULP build

