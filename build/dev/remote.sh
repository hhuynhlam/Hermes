cd ~/www/
sudo /usr/local/bin/svc -d /service/hermes_dev 

rm -rf hermes_bak
mv hermes_dev hermes_bak

gunzip hermes.tar.gz
tar -xf hermes.tar
rm hermes.tar
mv _dist hermes_dev

sudo /usr/local/bin/svc -u /service/hermes_dev 