// index.js

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class DailyJournal {
  constructor() {
    this.entriesPath = './entries/';
  }

  createEntry() {
    rl.question('Enter your journal entry for today: ', entry => {
      const date = new Date().toISOString().split('T')[0];
      const fileName = `${this.entriesPath}${date}.txt`;
      fs.writeFile(fileName, entry, 'utf8', err => {
        if (err) {
          console.error('Error creating entry:', err);
        } else {
          console.log(`Entry saved to ${fileName}`);
        }
        rl.close();
      });
    });
  }

  readEntry(date) {
    const fileName = `${this.entriesPath}${date}.txt`;
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading entry:', err);
      } else {
        console.log('Journal Entry:');
        console.log(data);
      }
      rl.close();
    });
  }
}

const journal = new DailyJournal();

// Command line interface
if (process.argv[2] === 'write') {
  journal.createEntry();
} else if (process.argv[2] === 'read' && process.argv[3]) {
  journal.readEntry(process.argv[3]);
} else {
  console.log('Usage:');
  console.log('node index.js write - Write a new journal entry');
  console.log('node index.js read YYYY-MM-DD - Read journal entry for a specific date');
}
