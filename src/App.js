import Form from './components/Form';

function App() {
  return (
    <div className='bg-zinc-900 gap-20 h-dvh w-dvw text-zinc-50 flex justify-center flex-col items-center'>
      <div className='text-center'>
        <h1 className='text-4xl mb-4'>Welcome to Guessify</h1>
        <h3 className='text-zinc-400'>
          Enter any name and it will guess the gender and nationality of the
          user...
        </h3>
      </div>

      <Form />
    </div>
  );
}

export default App;
