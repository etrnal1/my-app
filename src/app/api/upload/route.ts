// app/api/upload/route.ts
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: '没有文件' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = `${Date.now()}-${file.name}`
  const filepath = join(process.cwd(), 'public/uploads', filename)

  await writeFile(filepath, buffer)

  return NextResponse.json({
    message: '上传成功',
    file: filename,
  })
}