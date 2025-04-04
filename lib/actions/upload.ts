// import multer from 'multer'
// import { NextApiRequest, NextApiResponse } from 'next'
// import nextConnect from 'next-connect'
// import cloudinary from '../cloudinary'

// interface MulterRequest extends NextApiRequest {
//   file: Express.Multer.File
// }

// const upload = multer({ dest: '/tmp' })

// const apiRoute = nextConnect({
//   onError(error, req: NextApiRequest, res: NextApiResponse) {
//     res
//       .status(501)
//       .json({ error: `Sorry something went wrong! ${error.message}` })
//   },
//   onNoMatch(req: NextApiRequest, res: NextApiResponse) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
//   },
// })

// apiRoute.use(upload.single('file'))

// apiRoute.post(async (req: MulterRequest, res: NextApiResponse) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'nextjs_uploads',
//     })

//     const imageUrl = result.secure_url

//     await db.collection('images').insertOne({
//       url: imageUrl,
//       createdAt: new Date(),
//     })

//     res.status(200).json({ url: imageUrl })
//   } catch (error: any) {
//     res.status(500).json({ error: error.message })
//   }
// })

// export default apiRoute

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js's default body parsing
//   },
// }
