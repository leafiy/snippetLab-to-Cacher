const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express()
const shell = require('shelljs');
let folder = path.resolve('./s')
let data = require('./json.json')

let arr = data.Snippets

// STEP1
// for (let snippet of arr) {
//     for (var i = snippet.Fragments.length - 1; i >= 0; i--) {
//         let fragment = snippet.Fragments[i]
//         let fileName = i > 0 ? snippet.Title + '-' + i + '.js' : snippet.Title + '.js'
//         fs.writeFile(folder+'/'+fileName,fragment.Content,err=>{
//          if(err){
//           console.log(err)
//          }
//         })
//     }
// }

// STEP2
for (let snippet of arr) {
    for (let fragment of snippet.Fragments) {
        let fileName = folder + '/' + snippet.Title + '.js'
        fileName = fileName.replace(/ /g, '\\ ')

        let title = snippet.Title
        if (snippet.Tags.length) {
            title += ' #' + snippet.Tags.join(' #')

        }
        title = title.replace(/ /g, '\\ ')
        let command = `cacher snippets:add ${fileName} -t=${title} -u`
        if (fragment.Note) {
            let note = fragment.Note.replace(/ /g, '\\')
            note = note.replace(/\n /g, '\\')
            command += ` -d=${note}`
        } else {
            command += ` -d=none`
        }

        shell.exec(command, function(status, output) {
            console.log('Exit status:', status);
            console.log('Program output:', output);
        });
    }
}

