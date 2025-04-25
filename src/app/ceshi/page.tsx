// 测试管理页面 练习获取
'use client'
import { useState } from "react";
export default function CeshiPage(){
    //添加逻辑
    const [name,setName] = useState('');

    // Change 触发的类型
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    // 表单类型
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(name);
    };
    const tijiao = ()=>{
        alert("您点击了提交按钮")
    }
    return (
        // 表单只能使用setState 来存储状态
        <div className="bg-red-50 flex justify-center items-center h-screen">  
           <form onSubmit={handleSubmit}>
            <input type="text" value={name} name="xingming" title="cs" onChange={handleChange} placeholder="请输入测试信息" className="border-red-700 bg-green-600"/>
            {name}
            <br />
            <button type="submit" className="bg-purple-300 rouded mt-10 text-white-100" onClick={tijiao}>开饭</button>
           </form>
        </div>
    )
}