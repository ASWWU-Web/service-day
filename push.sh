#!/bin/sh
ember build --environment production
rsync -rzv --delete-after dist/ ryan@aswwu.com:~/service-day
ssh aswwu.com cp -R service-day /var/www/html/
