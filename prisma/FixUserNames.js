require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb')

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)

async function run() {
  try {
    await client.connect()
    const db = client.db('growthtracker')
    const users = db.collection('User')

    const cursor = users.find({
      $or: [
        { userName: { $exists: false } },
        { userName: null },
        { userName: '' },
      ],
    })

    let count = 0

    for await (const user of cursor) {
      const generatedUsername = `user_${user._id.toString().slice(-6)}`
      await users.updateOne(
        { _id: user._id },
        { $set: { userName: generatedUsername } }
      )
      console.log(
        `Updated user ${user._id} with username: ${generatedUsername}`
      )
      count++
    }

    console.log(`✅ Finished updating ${count} users`)
  } catch (err) {
    console.error('❌ Error updating usernames:', err)
  } finally {
    await client.close()
  }
}

run()

// to run script node fixUsernames.js
