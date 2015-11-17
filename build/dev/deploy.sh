GULP=$(which gulp)

# clean and build local_dist
pushd ../../
GULP build

tar -cvzf hermes.tar.gz _dist/
scp -r ./hermes.tar.gz hhuynhlam1@ps486964.dreamhostps.com:~/www/

popd
ssh hhuynhlam1@ps486964.dreamhostps.com 'bash -s' < ./remote.sh