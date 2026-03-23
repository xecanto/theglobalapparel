import fs from 'fs';
import path from 'path';

function walk(dir, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

const SRC_DIR = '/opt/globalapparel/src';

function replaceInFile(filePath) {
    if (!filePath.match(/\.(tsx|ts)$/)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content.replace(/bg-primary text-accent-foreground/g, 'bg-primary text-primary-foreground');

    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log('Updated', filePath);
    }
}

walk(SRC_DIR, function (err, results) {
    if (err) throw err;
    results.forEach(replaceInFile);
    console.log('Replacement complete.');
});
