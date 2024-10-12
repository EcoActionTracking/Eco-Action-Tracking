import { NextResponse } from 'next/server';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs/promises';
import Imageh from '../../../models/HashedImages'; // استيراد نموذج Image
import dbConnect from "../../../lib/mongodb";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const file = formData.get('img');
    const user_id = formData.get('user_id');

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    if (!user_id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const image_hash = crypto.createHash('sha256').update(buffer).digest('hex');

    // تحقق مما إذا كانت الصورة موجودة لهذا المستخدم
    const existingImage = await Imageh.findOne({ user_id });

    // إذا كان للمستخدم صور مسبقة، زد العد
    let uploadCount = 1; // تعيين العد الافتراضي إلى 1
    if (existingImage) {
      // زيادة العد في حال كانت الصور موجودة
      uploadCount = existingImage.uploadCount + 1;

      // تحديث الصورة الحالية بالعد الجديد
      await Imageh.updateOne(
        { user_id }, 
        { uploadCount } // تحديث العد
      );
    }

    // حفظ الصورة في الفولدر
    const uploadsDir = path.join(process.cwd(), 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true }); // تأكد من وجود الفولدر

    const uniqueFileName = `${Date.now()}-${file.name}`;
    const file_path = path.join(uploadsDir, uniqueFileName);
    await fs.writeFile(file_path, buffer);

    // أضف بيانات الصورة إلى MongoDB
    const newImage = new Imageh({
      user_id,
      file_path,
      image_hash,
      uploadCount // استخدم قيمة العد
    });

    await newImage.save(); 

    return NextResponse.json({
      message: 'Image uploaded successfully',
      file_path,
      image_hash,
      uploadCount // أعد العد بعد التحميل
    }, { status: 200 });

  } catch (error) {
    console.error('Error in file upload:', error);
    return NextResponse.json({
      message: "Failed to upload image",
      error: error.message
    }, { status: 500 });
  }
}







