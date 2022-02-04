import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <form className="flex flex-col p-5 space-y-2">
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Username"
          className="p-1 border border-gray-400 rounded-lg outline-none peer valid:bg-green-100 invalid:bg-red-200 invalid:ring-2 ring-red-400"
          required
        />
        <span className="hidden peer-invalid:block peer-invalid:text-red-500">
          This input is invalid
        </span>
        <span className="hidden peer-valid:block peer-valid:text-green-500">Awesome Username</span>
      </div>

      <div className="flex flex-col">
        <input
          type="password"
          placeholder="Password"
          className="p-1 border border-gray-400 rounded-lg outline-none peer valid:bg-green-100 invalid:bg-red-200 invalid:ring-2 ring-red-400"
          required
        />
        <span className="hidden peer-invalid:block peer-invalid:text-red-500">
          This password is invalid
        </span>
        <span className="hidden peer-valid:block peer-valid:text-green-500">Awesome Password</span>
      </div>

      <input type="submit" value="Login" className="font-bold" />
    </form>
  );
};

export default Home;
