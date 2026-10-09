#!/bin/sh
# Re-export the NDIS brochure PDF after editing ndis-brochure.html. Needs Google Chrome.
cd "$(dirname "$0")" && "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --virtual-time-budget=10000 \
  --print-to-pdf=../ndis-cleaning/tactix-ndis-cleaning-brochure.pdf "file://$PWD/ndis-brochure.html"
