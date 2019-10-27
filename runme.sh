#!/bin/bash

# chmod +x runme.sh
# Via: http://linuxconfig.org/bash-scripting-tutorial

# Colors
# usage: echo -e "\x1B[31m foobar \x1B[0m"
# Reset
Color_Off='\033[0m'       # Text Reset

# Regular Colors
Black='\033[0;30m'        # Black
Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
Yellow='\033[0;33m'       # Yellow
Blue='\033[0;34m'         # Blue
Purple='\033[0;35m'       # Purple
Cyan='\033[0;36m'         # Cyan
White='\033[0;37m'        # White

# Bold
BBlack='\033[1;30m'       # Black
BRed='\033[1;31m'         # Red
BGreen='\033[1;32m'       # Green
BYellow='\033[1;33m'      # Yellow
BBlue='\033[1;34m'        # Blue
BPurple='\033[1;35m'      # Purple
BCyan='\033[1;36m'        # Cyan
BWhite='\033[1;37m'       # White

# Underline
UBlack='\033[4;30m'       # Black
URed='\033[4;31m'         # Red
UGreen='\033[4;32m'       # Green
UYellow='\033[4;33m'      # Yellow
UBlue='\033[4;34m'        # Blue
UPurple='\033[4;35m'      # Purple
UCyan='\033[4;36m'        # Cyan
UWhite='\033[4;37m'       # White

# Background
On_Black='\033[40m'       # Black
On_Red='\033[41m'         # Red
On_Green='\033[42m'       # Green
On_Yellow='\033[43m'      # Yellow
On_Blue='\033[44m'        # Blue
On_Purple='\033[45m'      # Purple
On_Cyan='\033[46m'        # Cyan
On_White='\033[47m'       # White

# High Intensity
IBlack='\033[0;90m'       # Black
IRed='\033[0;91m'         # Red
IGreen='\033[0;92m'       # Green
IYellow='\033[0;93m'      # Yellow
IBlue='\033[0;94m'        # Blue
IPurple='\033[0;95m'      # Purple
ICyan='\033[0;96m'        # Cyan
IWhite='\033[0;97m'       # White

# Bold High Intensity
BIBlack='\033[1;90m'      # Black
BIRed='\033[1;91m'        # Red
BIGreen='\033[1;92m'      # Green
BIYellow='\033[1;93m'     # Yellow
BIBlue='\033[1;94m'       # Blue
BIPurple='\033[1;95m'     # Purple
BICyan='\033[1;96m'       # Cyan
BIWhite='\033[1;97m'      # White

# High Intensity backgrounds
On_IBlack='\033[0;100m'   # Black
On_IRed='\033[0;101m'     # Red
On_IGreen='\033[0;102m'   # Green
On_IYellow='\033[0;103m'  # Yellow
On_IBlue='\033[0;104m'    # Blue
On_IPurple='\033[0;105m'  # Purple
On_ICyan='\033[0;106m'    # Cyan
On_IWhite='\033[0;107m'   # White

# Args
args=("$@")
prefix="${On_Purple}RUNME.SH${Color_Off}"
ENV=${args[0]}
CURRENT_FOLDER=`pwd`
export LC_ALL=en_US.UTF-8

echo -e $prefix" go to web_generator folder and run npm install"
cd $CURRENT_FOLDER'/web_generator' && npm install -g

echo -e $prefix" remove all files in wot_web folders"
rm -rf $CURRENT_FOLDER'/wot_web/*.html'
rm -rf $CURRENT_FOLDER'/wot_web/assets'
rm -rf $CURRENT_FOLDER'/wot_web/*.ico'
rm -rf $CURRENT_FOLDER'/wot_web/*.txt'

echo -e $prefix" go to wot_api folder and run npm install"
cd $CURRENT_FOLDER'/wot_api' && npm install -g

echo -e $prefix" copy assets folder to wot_web folder"
cp -fRuv $CURRENT_FOLDER'/web_generator/themes/pure-link/assets/.' $CURRENT_FOLDER'/wot_web/assets'

echo -e $prefix" copy favicon.ico and robots.txt to wot_web folder"
cp -fRuv $CURRENT_FOLDER'/web_generator/conf/favicon.ico' $CURRENT_FOLDER'/wot_web/favicon.ico'
cp -fRuv $CURRENT_FOLDER'/web_generator/conf/robots.txt' $CURRENT_FOLDER'/wot_web/robots.txt'

echo -e $prefix" run wot_web generator"
cd $CURRENT_FOLDER'/web_generator' && node index.js

# TODO: nginx.conf dosyasının uygun yere taşınması gerekiyor.

## Check File And Service
FILE=$CURRENT_FOLDER"/wot_api/process.json"
if [ ! -f "$FILE" ]; then
    echo -e $prefix" File ($FILE) does not exist!"
    exit;
fi

if ! which pm2 >/dev/null; then
    echo -e $prefix" pm2 not found!"
    echo -e $prefix" pm2 started installation"
    npm install pm2 -g
    echo -e $prefix" pm2 finished installation"
fi

## Find Env
if [ "$ENV" = "dev" ]
then
    ENV="development"
else
    ENV="production"
fi

## Start or Reload Service
pm2 list && pm2 flush && pm2 reloadLogs
cd $CURRENT_FOLDER'/wot_api' && pm2 startOrReload $FILE --env $ENV --update-env
echo -e $prefix" Pm2 reloaded with $ENV mode."
pm2 list && pm2 save

echo -e $prefix" Ready to use. Good Luck!"
