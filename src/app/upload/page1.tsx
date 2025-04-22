'use client'
import { useState } from 'react'
export default function upload(){

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const handleSubmit= async(e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const res =await fetch("/api/upload",{
        method:"post",
        body:formData
      })
      if(res.ok){
        alert("成功")
      }else{
        alert("失败")
      }
    }
      
    
    return (
        <form onSubmit={handleSubmit}>
        <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">文件上传表单</h1>
            
            <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">文件描述</label>
                    <textarea
                        placeholder="请输入文件描述..."
                        className="w-full p-3 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
                        rows={4}
                    ></textarea>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">选择文件类型</label>
                    <select 
                        className="w-full p-3 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
                        aria-label="选择文件类型"
                    >
                        <option value="">请选择文件类型</option>
                        <option value="image">图片</option>
                        <option value="document">文档</option>
                        <option value="video">视频</option>
                        <option value="audio">音频</option>
                    </select>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">上传文件</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg border-2 border-dashed border-blue-300 cursor-pointer hover:bg-blue-50 transition-colors w-full">
                            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                            </svg>
                            <span className="text-sm">
                {selectedFile ? `已选择：${selectedFile.name}` : '点击上传或拖放文件'}
              </span>
                            <input
                type="file"
                name="file"
                className="hidden"
                onChange={(e) =>
                  setSelectedFile(e.target.files?.[0] ?? null)
                }
              />
                        </label>
                    </div>
                </div>

                <button className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                    提交上传
                </button>
            </div>
        </div>
        </form>
    )
}