import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";

function App() {
  return (
    <>
      <Header />
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
