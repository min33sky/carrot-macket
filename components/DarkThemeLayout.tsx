import React, { useEffect, useState } from 'react';

interface IDarkThemeLayout {
  children: React.ReactNode;
}

function DarkThemeLayout({ children }: IDarkThemeLayout) {
  const [darkTheme, setDarkTheme] = useState(true);
  const [mounted, setMounted] = useState(false);

  const onToggle = () => {
    const theme = localStorage.getItem('theme');
    localStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
    setDarkTheme((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setDarkTheme(theme === 'dark' ? true : false);
    setMounted(true);
  }, []);

  return mounted ? (
    <div className={darkTheme ? 'dark' : ''}>
      <div>
        <button
          className="flex w-full justify-center bg-indigo-400 py-2 font-bold text-gray-800"
          onClick={onToggle}
        >
          현재 테마: {darkTheme ? '다크' : '라이트'}
        </button>
      </div>

      {children}
    </div>
  ) : null;
}

export default DarkThemeLayout;
