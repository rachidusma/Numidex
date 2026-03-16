'use server'

import nodemailer from 'nodemailer'
import prisma from './prisma'

export async function getProducts({
  page = 1,
  limit = 12,
  categoryId,
  lang = 'en'
}: {
  page?: number
  limit?: number
  categoryId?: string
  lang?: string
}) {
  const skip = (page - 1) * limit

  try {
    const where = categoryId ? { categoryId } : {}

    const [productsRaw, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.product.count({ where }),
    ])

    const products = productsRaw.map(product => ({
      ...product,
      name: lang === 'fr' ? (product.name_fr || product.name) : lang === 'pt' ? (product.name_pt || product.name) : product.name,
      description: lang === 'fr' ? (product.description_fr || product.description) : lang === 'pt' ? (product.description_pt || product.description) : product.description,
      category: {
        ...product.category,
        name: lang === 'fr' ? (product.category.name_fr || product.category.name) : lang === 'pt' ? (product.category.name_pt || product.category.name) : product.category.name,
      }
    }))

    return {
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }
}

export async function getProduct(id: string, lang: string = 'en') {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })

    if (!product) return null

    return {
      ...product,
      name: lang === 'fr' ? (product.name_fr || product.name) : lang === 'pt' ? (product.name_pt || product.name) : product.name,
      description: lang === 'fr' ? (product.description_fr || product.description) : lang === 'pt' ? (product.description_pt || product.description) : product.description,
      category: {
        ...product.category,
        name: lang === 'fr' ? (product.category.name_fr || product.category.name) : lang === 'pt' ? (product.category.name_pt || product.category.name) : product.category.name,
      }
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    throw new Error('Failed to fetch product')
  }
}

export async function getCategories(lang: string = 'en') {
  try {
    const categoriesRaw = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    
    const categories = categoriesRaw.map(category => ({
      ...category,
      name: lang === 'fr' ? (category.name_fr || category.name) : lang === 'pt' ? (category.name_pt || category.name) : category.name,
      description: lang === 'fr' ? (category.description_fr || category.description) : lang === 'pt' ? (category.description_pt || category.description) : category.description,
    }))

    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw new Error('Failed to fetch categories')
  }
}

export async function sendContactEmail(formData: {
  name: string
  company: string
  country: string
  email: string
  message: string
  productLink?: string
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: `"Numidex Contact" <${process.env.SMTP_USER}>`,
    to: 'contact@numidex.com',
    subject: `New Contact Form Submission from ${formData.name}`,
    text: `
      Name: ${formData.name}
      Company: ${formData.company}
      Country: ${formData.country}
      Email: ${formData.email}
      Message: ${formData.message}
      ${formData.productLink ? `Product Link: ${formData.productLink}` : ''}
    `,
    html: `
      <h2>New Message From Numidex.com</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Company:</strong> ${formData.company}</p>
      <p><strong>Country:</strong> ${formData.country}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${formData.message}</p>
      ${formData.productLink ? `<p><strong>Product Link:</strong> <a href="${formData.productLink}">${formData.productLink}</a></p>` : ''}
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: 'Failed to send message' }
  }
}
