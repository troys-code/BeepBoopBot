/** This file: improves the caching behaviour of the JavaScript bundle file */
import fs from 'fs'
import crypto from 'crypto'

// 1. rename webpage/bundle.js to "bundle.{hash}.js"
const folderToDeploy = 'webpage';
const bundlePath = `${folderToDeploy}/bundle.js`

const bundleContents = fs.readFileSync(bundlePath, { encoding: 'utf8'})

const shaHash = crypto.hash("SHA-1", bundleContents)
const shortHash = shaHash.slice(0, 12);

console.log('Adding short SHA hash to the js filename:', shortHash);

const bundleNameWithHash = `bundle.${shortHash}.js`

fs.renameSync(bundlePath, `${folderToDeploy}/${bundleNameWithHash}`)
console.log(`Renamed ${bundlePath} to ${folderToDeploy}/${bundleNameWithHash}`);

// 2. in webpage/index.html, replace "bundle.js" with the new name
const indexPath = `${folderToDeploy}/index.html`
let indexContents = fs.readFileSync(indexPath, { encoding: 'utf8'})

indexContents = indexContents.replace('bundle.js', bundleNameWithHash)

fs.writeFileSync(indexPath, indexContents, { encoding: 'utf8'})
console.log(`Updated ${indexPath} to reference ${bundleNameWithHash}`);
