const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '.env'),
  // Use values from the project .env even if MONGODB_URI was exported in the shell
  override: true,
});

const app = require('./app');
const { connectDB } = require('./src/config/database');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is required');
    }
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
