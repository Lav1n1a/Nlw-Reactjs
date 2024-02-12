import  logo  from './assets/logoExpert.png';
import { NewNoteCard } from './components/new-noteCard';
import { NoteCard } from './components/noteCard';

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt='Ícone NLW Expert'/>

      <form className='w-full'>
      <input 
      type='text'
      placeholder='Busque suas notas...'
      className='w-full bg-transparent text-3xl font-semibold placeholder:text-slate-500 outline-none' 
      />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard/>
        <NoteCard note={{
            date: new Date(),
            content: "Fazer café e tomar 😊😊❤️😊"
          }}/>

      </div>

    </div>
  )
}

