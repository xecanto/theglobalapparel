import fs from 'fs';
import path from 'path';

const pagesDir = '/opt/globalapparel/src/pages';
const filesToUpdate = ['FAQ.tsx', 'Gallery.tsx', 'Contact.tsx', 'Services.tsx'];

filesToUpdate.forEach(file => {
    const filePath = path.join(pagesDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(
            '<section className="relative py-40 overflow-hidden">',
            '<section className="dark relative py-40 overflow-hidden">'
        );
        fs.writeFileSync(filePath, content);
    }
});

const indexFile = path.join(pagesDir, 'Index.tsx');
if (fs.existsSync(indexFile)) {
    let content = fs.readFileSync(indexFile, 'utf8');
    content = content.replace(
        '<section className="surface-dark py-28 relative noise-overlay overflow-hidden">',
        '<section className="dark surface-dark py-28 relative noise-overlay overflow-hidden">'
    );
    fs.writeFileSync(indexFile, content);
}

console.log('Class replacement complete.');
