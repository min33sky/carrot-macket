import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col p-5 space-y-2">
      <details className="select-none open:bg-blue-300 ">
        <summary className="cursor-pointer">What is my fav. food</summary>
        <p>김치</p>
        <p>라면</p>
      </details>

      <div className="p-5">
        <ul className="list-decimal select-none marker:text-red-600 marker:bg-slate-500 ">
          <li>안녕</li>
          <li>하이</li>
          <li>곤니찌와</li>
        </ul>
      </div>

      <div>
        <input
          type="file"
          className="file:cursor-pointer file:transition-colors file:bg-indigo-500 file:rounded-lg file:text-white file:p-2 file:hover:bg-purple-500"
        />
      </div>
    </div>
  );
};

export default Home;
