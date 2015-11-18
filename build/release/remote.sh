cd ~/www/
sudo /usr/local/bin/svc -d /service/hermes_prod 
sudo /service/hermes_prod/stop

rm -rf hermes_prod_bak
mv hermes_prod hermes_prod_bak

gunzip hermes.tar.gz
tar -xf hermes.tar
rm hermes.tar
mv _dist hermes_prod

sudo ln -s /home/hhuynhlam1/www/_config/prod.config.json ./hermes_prod/src/server/prod.config.json 
sudo chmod 755 ./hermes_prod/src/server/prod.config.json 

sudo /usr/local/bin/svc -u /service/hermes_prod 