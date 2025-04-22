'use client'
import { useState } from 'react';
import Link from 'next/link';
export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">后台管理</h2>

      {/* 一级菜单：管理 */}
      <div>
        <button
          className="w-full text-left py-2 hover:bg-gray-700 rounded"
          onClick={() => toggleMenu('manage')}
        >
          管理 {openMenu === 'manage' ? '▲' : '▼'}
        </button>
        {openMenu === 'manage' && (
          <div className="pl-4">
            <div className="py-1 hover:bg-gray-700 rounded">文件管理</div>
            <div className="py-1 hover:bg-gray-700 rounded">音频管理</div>

            <div className="py-1 hover:bg-gray-700 rounded">
              
              <Link href="ceshi">测试管理</Link></div>
          </div>
        )}
      </div>

      {/* 一级菜单：设置 */}
      <div className="mt-4">
        <button
          className="w-full text-left py-2 hover:bg-gray-700 rounded"
          onClick={() => toggleMenu('settings')}
        >
          设置 {openMenu === 'settings' ? '▲' : '▼'}
        </button>
        {openMenu === 'settings' && (
          <div className="pl-4">
            <div className="py-1 hover:bg-gray-700 rounded">用户设置</div>
            <div className="py-1 hover:bg-gray-700 rounded">系统设置</div>
          </div>
        )}
      </div>
    </div>
  );
}