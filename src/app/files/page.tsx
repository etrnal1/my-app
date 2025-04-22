export default function FilesPage() {
    const files = [
        { name: 'document.pdf', size: '2.3MB', date: '2023-10-01' },
        { name: 'image.png', size: '1.1MB', date: '2023-09-28' },
        { name: 'report.docx', size: '3.4MB', date: '2023-10-05' }
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">文件管理</h1>
            <div className="bg-white shadow rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="搜索文件..."
                        className="border p-2 rounded w-64"
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        上传文件
                    </button>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-2">文件名</th>
                            <th className="text-left p-2">大小</th>
                            <th className="text-left p-2">修改日期</th>
                            <th className="text-right p-2">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="p-2">{file.name}</td>
                                <td className="p-2">{file.size}</td>
                                <td className="p-2">{file.date}</td>
                                <td className="p-2 text-right">
                                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                                        下载
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                        删除
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}