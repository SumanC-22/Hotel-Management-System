const fs = require('fs');
const path = require('path');
const files = ['hotels.json','booking-data.json','complaint-data.json','finance-data.json','coordinates-data.json','dashboard-metrics.json'];
files.forEach(f => {
  const p = path.join(__dirname, '..', 'src', 'assets', 'data', f);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  if (Array.isArray(data)) {
    console.log(`${f} count= ${data.length}`);
  } else {
    console.log(`${f} type= ${typeof data} keys= ${Object.keys(data).length}`);
  }
});
