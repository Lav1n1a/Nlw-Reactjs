import { useState, useEffect, ChangeEvent } from 'react';
import  logo  from './assets/logoExpert.png';
import { NewNoteCard } from './components/new-noteCard';
import { NoteCard } from './components/noteCard';

interface Note {
  id: string,
  date: Date,
  content: string
}

export function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const localNotes = localStorage.getItem('notes');

    if(localNotes) {
     return JSON.parse(localNotes)
    }
  }, [])

  function onCreateNote(content: string) {
    const createNewNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }
    const notesArray = [ ...notes, createNewNote]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function onDeleteNote(id: string) {
    const notesArray = notes.filter(note => {
      return note.id !== id
    })

    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
    
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        const query = event.target.value

        setSearch(query)
  }

  const filterNotes = search !== ''
  ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  : notes

  console.log(search)

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt='Ícone NLW Expert'/>

      <form className='w-full'>
      <input 
      type='text'
      placeholder='Busque suas notas...'
      className='w-full bg-transparent text-3xl font-semibold placeholder:text-slate-500 outline-none' 
      onChange={handleSearch}
      />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard onCreateNote ={onCreateNote}/>
        
        {
          filterNotes.map(note =>{
            return <NoteCard key={note.id} note={note}  onDeleteNote={onDeleteNote}/>
          })}

      </div>

    </div>
  )
}

