cd ~/www/
sudo /usr/local/bin/svc -d /service/hermes_dev 
sudo /service/hermes_dev/stop

rm -rf hermes_dev_bak
mv hermes_dev hermes_dev_bak

gunzip hermes.tar.gz
tar -xf hermes.tar
rm hermes.tar
mv _dist hermes_dev

sudo ln -s /home/hhuynhlam1/www/_config/prod.config.json ./hermes_dev/src/server/prod.config.json 
sudo chmod 755 ./hermes_dev/src/server/prod.config.json 

cd hermes_dev && sudo npm install --production

sudo /usr/local/bin/svc -u /service/hermes_dev 