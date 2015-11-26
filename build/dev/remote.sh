cd ~/
/usr/local/bin/svc -d /service/hermes
/service/hermes/stop

rm -rf hermes_bak
mv hermes hermes_bak

gunzip hermes.tar.gz
tar -xf hermes.tar
rm hermes.tar
mv _dist hermes

ln -s /home/webservice/_config/prod.config.json ./hermes/src/server/prod.config.json 
chmod 755 ./hermes/src/server/prod.config.json 

ln -s /home/webservice/images ./hermes/src/server/public/uploaded/images
chmod 755 ./hermes/src/server/public/uploaded/images 

cd hermes && npm install --production

/usr/local/bin/svc -u /service/hermes 