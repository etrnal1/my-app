#解决跨越问题
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from datetime import datetime
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile

from fastapi.responses import FileResponse
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js 前端地址
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
new_dir=BASE_DIR[:-18]
UPLOAD_DIR = os.path.join(new_dir, "public/uploads/")

os.makedirs(UPLOAD_DIR, exist_ok=True)
#获取所有的文件列表
@app.get("/files")
def list_file(search:str="",page:int=1,limit: int=10):
    file_list = []
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    #/Users/mac/document/my-app/src/app/background
    new_dir=BASE_DIR[:-18]
   
    UPLOAD_DIR = os.path.join(new_dir, "public/uploads/")
 
    all_files = os.listdir(UPLOAD_DIR) 
    # 过滤不存在的文件,保存存在的文件
   
    if search:
        all_files = [f for f in all_files if search.lower() in f.lower()]

    # 分页
    start = (page - 1) * limit
    end = start + limit
    paginated = all_files[start:end]

    for file in paginated:
        file_path = os.path.join(UPLOAD_DIR, file)
        file_list.append({
            "filename": file,
            "size": os.path.getsize(file_path),  # 字节数
            "upload_time": datetime.fromtimestamp(os.path.getmtime(file_path)).isoformat()  # 修改时间
        })

    return {
        "files": file_list,
        "total": len(all_files)
    }

#删除单个文件
@app.delete("/files/{filename}")
def delete_file(filename: str):
    file_path= os.path.join(UPLOAD_DIR,filename)
    if not os.path.exists(file_path):
        return '文件不存在'
    #os.remove(file_path)
    return {"message": "删除成功"}
#下载文件接口
@app.get("/download/{filename}")
def download_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="文件不存在")
    return FileResponse(file_path, filename=filename, media_type='application/octet-stream')
@app.post("/upload")

# 获取相关参数 描述,文件类型，
# 422报错,字段不符，需要数据请求
async def create_upload_file(file: UploadFile = File(...),
    desc: str = Form(""),
    filetype: str = Form(""),):
    
    contents = await file.read()
    # 添加临时调试
    
  
    filename = f"{int(datetime.now().timestamp())}-{file.filename}"
    print("------------")
    print(filename)
    print("------")
   
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as f:
        f.write(contents)
    return {
    "filename": file.filename,
    "desc": desc,
    "filetype": filetype
}