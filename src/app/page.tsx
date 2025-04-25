'use client'
import Link from 'next/link'
import { useEffect,useState, useRef } from 'react';
import Sidebar from './Sidebar';

export default function FilesPage() {
    const [files,setFiles] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

    
    // 实现搜索功能

    //储存动态,获取动态
    const [search,setSearch] = useState('')

    // 添加 loop 状态变量
    const [loop, setLoop] = useState(false)

    // 添加 currentTime 和 duration 状态
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    // 视频播放
    // const  videoPlay =()=>{
    //     alert("播放视频")
    // }
    const setSearchs=async(e: React.ChangeEvent<HTMLInputElement>)=>{

       
        setSearch(e.target.value)
        console.log(e.target.value)
    }
    //编写函数
    // 实现下载逻辑
    const setClick=async(filename: string )=>{
        const url = `${API_BASE}/download/${filename}`;
        window.open(url, '_blank');
      
       
    }
    const delClick=async(filename:string)=>{
        if(!confirm(`确认删除${filename}吗`)){
            return 
        }
        const res = await fetch(`${API_BASE}/files/${filename}`,{
            method: 'DELETE'
        })
        const data = await res.json();
        alert(data.message||"删除成功")
        console.log(filename)
    }

    const audioRef = useRef<HTMLAudioElement | null>(null)

    const playAudio = (filename: string) => {
        const audioUrl = `${API_BASE}/download/${filename}`
        if (audioRef.current) {
            audioRef.current.src = audioUrl
            audioRef.current.loop = loop
            audioRef.current.play()
        }
    }

    // 处理音频元数据加载完成事件，获取音频总时长
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration)
        }
    }

    // 处理播放时间更新事件，实时更新 currentTime
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime)
        }
    }

    // 处理进度条拖动，调整播放进度
    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(event.target.value)
        console.log("拖动到：", time)
        if (audioRef.current) {
            audioRef.current.currentTime = time
        }
        setCurrentTime(time)
    }

    // 格式化时间显示函数，格式为 mm:ss
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    useEffect(()=>{
        const fetchFiles = async () => {
            const res = await fetch(`${API_BASE}/files?page=${currentPage}&limit=${itemsPerPage}&search=${search}`);
            const data = await res.json();
            console.log("打印数据信息",data.files.length)
            setFiles(data.files || data);
            setTotalItems(data.files.length);
            console.log(totalItems,"fenye")
        };
        fetchFiles();
    },[currentPage,search])
   
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    return (
        <div className="flex min-h-screen">
            <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
                <h2 className="text-xl font-bold mb-6">文件管理系统</h2>
                <Sidebar />
            </div>
            <main className="flex-1 bg-gray-100 p-8 min-h-screen rounded-lg">
                <h1 className="text-2xl font-bold mb-8 text-gray-800">文件管理</h1>
                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                        <input
                            type="text"
                            placeholder="搜索文件..."
                            onChange = {setSearchs}
                            value ={search}
                            className="border border-gray-300 p-3 rounded-lg w-72 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400"
                        />
                        <Link 
                            href="/upload/" 
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H3a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            上传文件
                        </Link>
                    </div>
                    {/* 添加循环播放开关按钮 */}
                    <div className="p-4 border-b border-gray-200 flex items-center space-x-4">
                        <button
                            onClick={() => setLoop(!loop)}
                            className={`px-4 py-2 rounded-md transition-colors font-semibold ${
                                loop ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {loop ? '循环播放: 开启' : '循环播放: 关闭'}
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left p-4 text-gray-700 text-sm font-semibold border-b border-gray-200">文件名</th>
                                    <th className="text-left p-4 text-gray-700 text-sm font-semibold border-b border-gray-200">大小</th>
                                    <th className="text-left p-4 text-gray-700 text-sm font-semibold border-b sborder-gray-200">修改日期</th>
                                    <th className="text-right p-4 text-gray-700 text-sm font-semibold border-b border-gray-200">操作</th>
                                    <th className="text-center p-4 text-gray-700 text-sm font-semibold border-b border-gray-200">播放</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map((file, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
                                        <td className="p-4 text-sm border-b border-gray-200">{file.filename}</td>
                                        <td className="p-4 text-sm border-b border-gray-200">{file.size}</td>
                                        <td className="p-4 text-sm border-b border-gray-200">{file.upload_time}</td>
                                        <td className="p-4 text-right border-b border-gray-200 space-x-2">
                                            <button className="text-blue-600 hover:text-white hover:bg-blue-600 transition-colors flex items-center px-3 py-1 rounded-md border border-blue-600" type="button" onClick={(e)=>{e.preventDefault();setClick(file.filename)}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H3a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                                </svg>
                                                下载
                                            </button>

                                           
                                            <button className="text-red-600 hover:text-white hover:bg-red-600 transition-colors flex items-center px-3 py-1 rounded-md border border-red-600" onClick={()=>delClick(file.filename)}  >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                删除
                                            </button>
                                        </td>
                                       
                                        <td className="p-4 text-center border-b border-gray-200">
                                            <button onClick={() => playAudio(file.filename)} className="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition-colors px-3 py-1 rounded-md">
                                                播放音频
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                        <div className="text-sm text-gray-700">
                            共 {totalItems} 条记录
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 transition-colors"
                            >
                                上一页
                            </button>
                            <span className="px-4 py-2 bg-blue-600 text-base rounded-md font-semibold">
                                {currentPage}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 transition-colors"
                            >
                                下一页
                            </button>
                        </div>
                    </div>
                </div>
                <audio 
                    ref={audioRef} 
                    controls 
                    onLoadedMetadata={handleLoadedMetadata} 
                    onTimeUpdate={handleTimeUpdate} 
                    className="w-full mt-4 rounded-md shadow-md"
                />
                <div className="flex items-center space-x-4 mt-2 bg-white p-3 rounded-md shadow-md max-w-md mx-auto">
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        step="0.01"
                        className="flex-grow accent-blue-600 cursor-pointer"
                        disabled={duration === 0}
                    />
                    <div className="text-sm text-gray-700 w-24 text-right font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>
            </main>
        </div>
    );
}