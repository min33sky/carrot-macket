import React, { useEffect, useState } from 'react';

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
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
    console.log('theme: ', theme);
    setDarkTheme(theme === 'dark' ? true : false);
    setMounted(true);
  }, []);

  return mounted ? (
    <div className={darkTheme ? 'dark' : ''}>
      <div>
        <button
          className="flex justify-center w-full py-2 font-bold text-gray-800 bg-indigo-400"
          onClick={onToggle}
        >
          현재 테마: {darkTheme ? '다크' : '라이트'}
        </button>
      </div>

      {children}
    </div>
  ) : null;
}

export default Layout;
