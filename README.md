# rightClickCopy

 absolutely enables right click & copy on firefox.

## what
- right click, select, copy, cut, paste back on sites that block it
- per site, off by default
- click icon to cycle: off > on > abs
- on: kills contextmenu/copy/cut/paste/selectstart/dragstart blockers, forces user-select:text
- abs: on + right mousedown/mouseup, ctrl+a/c/x/v keys, page preventDefault on those events, alert popups
- off reloads the tab

## install
grab rightclickcopy.xpi from releases, or about:debugging > load temporary add-on > manifest.json

policy id: `{4f80c3ad-5bba-4387-8040-e6a25e79925a}`

## build
```
zip -r rightclickcopy.xpi manifest.json background.js content.js icon.svg LICENSE
```
ci lints with web-ext and zips on push. tag `v*` to release.

## license
mit
