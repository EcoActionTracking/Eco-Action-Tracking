// app/api/company/route.js

import dbConnect from '../../../lib/mongodb';  
import Company from '../../../models/Company';  
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;  // تأكد من أن سر التوكن موجود في .env

export async function POST(req) {
  await dbConnect();  

  try {
    // جلب التوكن من الكوكيز
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: 'Authentication token is missing' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // التحقق من صحة التوكن واستخراج معرف المستخدم
    let user_id;
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      user_id = decoded.id;
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Invalid token' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const { company_name, address, contact_number, email, website } = await req.json();

    if (!user_id) {
      return new Response(JSON.stringify({ message: 'User ID is required' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (!company_name || !address || !contact_number || !email) {
      return new Response(JSON.stringify({ message: 'All required fields must be provided' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // إنشاء شركة جديدة
    const newCompany = new Company({
      user_id,
      company_name,
      address,
      contact_number,
      email,
      website,
    });

    // حفظ الشركة في قاعدة البيانات
    const savedCompany = await newCompany.save();

    // إرجاع الشركة التي تم إنشاؤها كاستجابة
    return new Response(JSON.stringify(savedCompany), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // معالجة الأخطاء مثل وجود بريد إلكتروني مكرر أو مشاكل تحقق أخرى
    if (error.code === 11000) {
      return new Response(JSON.stringify({ message: 'Email already exists' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
