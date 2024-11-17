#!/bin/sh

# curl -Ls -o /dev/null -w %{url_effective} http://example.com
curl -Ls -o /dev/null -w %{url_effective} "https://www.google.com/maps/place/Fort+Mason+Center+Farmers'+Market/data=!4m2!3m1!1s0x808580d86dc803cd:0x3f06bf33ae71ee7d"
