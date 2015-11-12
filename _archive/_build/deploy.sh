GULP=$(which gulp)

# clean and build local_dist
pushd ../client
GULP clean
GULP build

popd
scp -r ../client/_dist huynhfam@huynhfamily.net:~/public_html/
ssh huynhfam@huynhfamily.net 'bash -s' < ./remote.sh
