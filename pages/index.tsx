import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="grid min-h-screen gap-10 px-20 py-20 bg-slate-400">
      {/* 1 */}
      <div className="p-6 bg-white shadow-xl rounded-3xl">
        <span className="text-3xl font-bold">Select Item</span>

        <ul>
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex justify-between my-2 odd:bg-rose-100 even:bg-indigo-100"
            >
              <span className="text-gray-500">Grey Chair</span>
              <span className="font-semibold">$19</span>
            </div>
          ))}
        </ul>

        <ul>
          {['a', 'b', ''].map((c, i) => (
            <li className="py-2 mb-1 text-center bg-green-100 empty:hidden" key={i}>
              {c}
            </li>
          ))}
        </ul>

        <div className="flex justify-between pt-2 mt-2 border-t-2 border-dashed">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">$38</span>
        </div>
        <button className="block w-3/4 p-3 mx-auto mt-5 text-center text-white transition duration-200 ease-in-out bg-blue-500 outline-none rounded-xl focus:bg-rose-400 hover:bg-indigo-500 active:bg-purple-500 ">
          Checkout
        </button>
      </div>

      {/* 2 */}
      <div className="overflow-hidden bg-white shadow-xl rounded-3xl group">
        <div className="p-5 bg-blue-500 pb-14">
          <span className="text-lg font-bold text-white">Profile</span>
        </div>

        <div className="relative p-6 bg-white rounded-3xl -top-5 ">
          <div className="relative flex items-end justify-between -top-16">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>

            <div className="w-24 h-24 transition-colors rounded-full bg-zinc-300 group-hover:bg-red-300"></div>

            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500">Spent</span>
              <span className="font-medium">$340</span>
            </div>
          </div>
          <div className="relative flex flex-col items-center -mb-5 -mt-14">
            <span className="text-lg font-medium">마린</span>
            <span className="text-sm text-gray-500">Tokyo</span>
          </div>
        </div>
      </div>

      {/* 3 */}
      <div className="p-6 bg-white shadow-xl rounded-3xl ">
        <div className="flex items-center justify-between mb-5">
          <div className="font-bold cursor-pointer ">←</div>
          <div className="flex items-center space-x-4">
            <span>🌟 4.9</span>
            <span className="p-2 rounded-md shadow-xl">💖</span>
          </div>
        </div>

        <div className="mb-5 bg-zinc-400 h-72"></div>

        <div className="flex flex-col">
          <span className="text-xl font-medium">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
        </div>

        <div className="flex items-center justify-between mt-3 mb-5">
          <div className="flex items-center space-x-2 ">
            <button className="w-5 h-5 transition bg-yellow-500 rounded-full active:ring-2 ring-offset-2 ring-yellow-500" />
            <button className="w-5 h-5 transition bg-indigo-500 rounded-full active:ring-2 ring-offset-2 ring-indigo-500" />
            <button className="w-5 h-5 transition bg-teal-500 rounded-full active:ring-2 ring-offset-2 ring-teal-500" />
          </div>
          <div className="flex items-center space-x-5">
            <button className="flex items-center justify-center w-8 text-xl text-gray-800 bg-blue-200 rounded-lg aspect-square">
              -
            </button>
            <div>0</div>
            <button className="flex items-center justify-center w-8 text-xl text-gray-800 bg-blue-200 rounded-lg aspect-square">
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-2xl font-medium">$450</span>
          <button className="px-8 py-2 text-xs text-center text-white bg-blue-500 rounded-lg ">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
