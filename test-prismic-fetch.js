// Quick test script to verify Prismic documents
const prismic = require('@prismicio/client');

const client = prismic.createClient(
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || 'airtable-pages',
  {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  }
);

async function testFetch() {
  try {
    console.log('=== Checking all documents in Prismic ===\n');

    // Try to get all documents
    const response = await client.get();
    console.log(`Total documents found: ${response.results.length}\n`);

    response.results.forEach((doc, index) => {
      console.log(`${index + 1}. Type: ${doc.type}, UID: ${doc.uid || 'N/A'}, ID: ${doc.id}`);
      if (doc.data && doc.data.slices && doc.data.slices[0]) {
        const firstSlice = doc.data.slices[0];
        console.log(`   First slice: ${firstSlice.slice_type}`);
      }
    });

    // Try specific UID
    console.log('\n=== Attempting to fetch specific UID ===');
    console.log('UID: coatconut-1762423241112\n');

    try {
      const page = await client.getByUID('page', 'coatconut-1762423241112');
      console.log('✅ Page found!');
      console.log('Page UID:', page.uid);
    } catch (error) {
      console.error('❌ Error:', error.message);
    }

  } catch (error) {
    console.error('Error fetching documents:', error.message);
  }
}

testFetch();
