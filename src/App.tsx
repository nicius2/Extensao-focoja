import { Navbar } from "./components/Navbar";
import bg from "./assets/bg.svg";

export function App() {
  return (
    <div className="min-h-screen flex justify-center overflow-hidden bg-white">
      <div
        className="w-[400px] min-h-[500px] bg-zinc-900 rounded-xl my-10"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
      >
        <Navbar />
      </div>
    </div>
  );
}
