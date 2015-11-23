# clean and build local_dist
pushd ../../

tar -czf hermes.tar.gz _dist/
scp -r ./hermes.tar.gz webservice@45.33.40.30:~/

popd
ssh webservice@45.33.40.30 'bash -s' < ./remote.sh