import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns' 
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

interface NoteCardProps {
    note:{
        id: string
        date: Date
        content: String   
    }

    onDeleteNote: (id:string) => void
}

export function NoteCard({note, onDeleteNote}: NoteCardProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md text-left flex flex-col gap-3 bg-slate-800 p-5 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-slate-900'>
            <span className="text-sm font-medium text-slate-300">
            {formatDistanceToNow(note.date.toISOString(),{locale: ptBR, addSuffix: true})}
            </span>
            <p className="text-sm leading-6 text-slate-400">
            {note.content}
            </p>
            <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none' />
        </Dialog.Trigger>

        <Dialog.Portal>
            <Dialog.Overlay className='inset-0 fixed bg-black/50'/>
            <Dialog.Content className='fixed overflow-hidden inset-0 md:left-1/2 md:top-1/2  md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[540px] md:h-[50vh] w-full bg-slate-700 md:rounded-sm'>
                <Dialog.DialogClose className='absolute right-0 top-0 p-1 md:p-0 bg-slate-800 hover:text-slate-100'>
                    <X className='size-5'/>
                </Dialog.DialogClose>
                <div className='flex flex-1 flex-col gap-3 p-5'>
                    <span className="text-lg font-medium text-slate-300">
                    {formatDistanceToNow(note.date.toISOString(),{locale: ptBR, addSuffix: true})}
                    </span>
                    <p className="text-sm leading-6 text-slate-400">
                    {note.content}
                    </p>
                </div>

                <button
                type='button'
                onClick={() => onDeleteNote(note.id)}
                className='w-full absolute bottom-0 bg-slate-800 py-4 text-center outline-none group'>
                    Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota?</span>
                </button>
            </Dialog.Content>
        </Dialog.Portal>
        </Dialog.Root>
    )
}