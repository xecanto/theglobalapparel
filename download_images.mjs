import fs from 'fs';
import path from 'path';
import https from 'https';

const dir = '/opt/globalapparel/src/assets/gallery2';
const count = 210;

const keywords = [
    'streetwear', 'apparel', 'hoodie', 'fashion', 'clothing', 'textile',
    'sewing', 'factory', 'denim', 'leather', 'cotton', 'model', 'runway',
    'boutique', 'knitwear', 'embroidery', 'tailoring', 'fabric', 'workshop'
];

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

async function downloadImage(i) {
    const kw = keywords[i % keywords.length];
    // Using a very large random seed and multiple keywords to prevent duplicates
    const seed = Math.floor(Math.random() * 1000000);
    const width = 800 + (i % 10) * 40;
    const height = 600 + (i % 8) * 50;
    // Adding 'random' query param to ensure uniqueness on the service side
    const url = `https://loremflickr.com/${width}/${height}/${kw},apparel?lock=${seed}&random=${i}`;
    const filePath = path.join(dir, `gallery2_${i}.jpg`);

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 302 || res.statusCode === 301) {
                let redirectUrl = res.headers.location;
                if (redirectUrl.startsWith('/')) {
                    redirectUrl = `https://loremflickr.com${redirectUrl}`;
                }
                https.get(redirectUrl, (res2) => {
                    const stream = fs.createWriteStream(filePath);
                    res2.pipe(stream);
                    stream.on('finish', () => {
                        stream.close();
                        resolve();
                    });
                    stream.on('error', reject);
                }).on('error', reject);
            } else {
                const stream = fs.createWriteStream(filePath);
                res.pipe(stream);
                stream.on('finish', () => {
                    stream.close();
                    resolve();
                });
                stream.on('error', reject);
            }
        }).on('error', reject);
    });
}

async function main() {
    console.log(`Downloading ${count} unique images to ${dir}...`);
    const batchSize = 15; // Increased batch size for speed
    for (let i = 1; i <= count; i += batchSize) {
        const promises = [];
        for (let j = 0; j < batchSize && (i + j) <= count; j++) {
            promises.push(downloadImage(i + j));
        }
        await Promise.all(promises);
        process.stdout.write(`\rProgress: ${Math.min(i + batchSize - 1, count)}/${count}`);
    }
    console.log('\nDownload complete.');
}

main();
