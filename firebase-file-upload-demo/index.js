require('dotenv').config()
const fs = require('fs')

const admin = require('firebase-admin')

const { env: { FIREBASE_ADMIN_SDK_KEY, FIREBASE_STORAGE_BUCKET } } = process

const serviceAccount = require(FIREBASE_ADMIN_SDK_KEY)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: FIREBASE_STORAGE_BUCKET
})

const bucket = admin.storage().bucket()

const file = './hello-world.txt';

const upload = bucket.file(file).createWriteStream({
    metadata: {
        contentType: 'text/plain'
    }
})

fs.createReadStream(file).pipe(upload).on('finish', () => console.log(`${file} uploaded to ${bucket.name}.`))




