# OG image source

`og.html` is the source for `public/og.png` (1200x630 social preview).

Render (requires Space Grotesk + JetBrains Mono installed locally):

```sh
chromium --headless --no-sandbox --force-device-scale-factor=2 \
  --window-size=1200,630 --screenshot=/tmp/og@2x.png og/og.html
convert /tmp/og@2x.png -resize 1200x630 public/og.png
```
