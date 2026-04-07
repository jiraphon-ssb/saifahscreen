import fs from 'fs';
import path from 'path';

const portfolioDir = './public/images/portfolio';
const dataDir = './src/data';
const outputFile = './src/data/portfolio-db.json';

const categories = ['company', 'university', 'event', 'sme', 'other'];

function generateDb() {
  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const db = [];
  
  categories.forEach(category => {
    const dirPath = path.join(portfolioDir, category);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      // Sort files naturally for consistent ordering
      files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
      
      files.forEach((file, index) => {
        // Skip hidden files like .DS_Store
        if (file.startsWith('.')) return;

        if (file.match(/\.(jpg|jpeg|png|webp|svg|gif)$/i)) {
          db.push({
            id: `portfolio-${category}-${index}`,
            category,
            imageUrl: `/images/portfolio/${category}/${file}`,
            description: `ผลงาน ${category} #${index + 1}`
          });
        }
      });
    }
  });
  
  const data = JSON.stringify({ portfolioItems: db }, null, 2);
  fs.writeFileSync(outputFile, data);
  console.log(`Generated portfolio-db.json with ${db.length} items.`);
}

generateDb();
