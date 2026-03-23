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
const TAILWIND_CONFIG = '/opt/globalapparel/tailwind.config.ts';

function replaceInFile(filePath) {
    if (!filePath.match(/\.(tsx|ts|css)$/)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
        .replace(/gold/g, 'cyan')
        .replace(/Gold/g, 'Cyan')
        .replace(/45 93% 58%/g, '190 90% 50%')
        .replace(/45 60% 92%/g, '190 60% 80%')
        .replace(/45 40% 20%/g, '190 40% 20%')
        .replace(/38 80% 70%/g, '180 80% 60%');

    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log('Updated', filePath);
    }
}

walk(SRC_DIR, function (err, results) {
    if (err) throw err;
    results.push(TAILWIND_CONFIG);
    results.forEach(replaceInFile);
    console.log('Replacement complete.');
});
