import { useState } from 'react';

import { Button } from '@/components/ui/button';

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-300">
      <div>Counter: {counter}</div>
      <Button variant="outline" onClick={() => setCounter((prev) => prev + 1)}>
        Click
      </Button>
    </div>
  );
}

export default App;
