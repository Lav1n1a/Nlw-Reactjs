import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface onCreateNoteProps {
    onCreateNote: (content: string) => void
}

export function NewNoteCard({onCreateNote} : onCreateNoteProps) {

    const [ noteOptions, setNoteOptions ] = useState(true)
    const [ textNote, setTextNote ] = useState('')
    const [ isRecording, setRecording ] = useState(false)

    function handleEditor() {
        setNoteOptions(false)
    }

    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
        if(event.target.value === ''){
            setNoteOptions(true)
        } else {
            setTextNote(event.target.value)
            console.log(event.target.value)
        }
    }

    function handleSalveNote(event: FormEvent) {
        event.preventDefault()
        if(textNote){
            onCreateNote(textNote)
            toast.success('Nota criada com sucesso!')

            setTextNote('')
            setNoteOptions(true)
        }
    }

    function startRecording() {

        setNoteOptions(false)
        setRecording(true)

        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 
        'webkitSpeechRecognition' in window

        if (isSpeechRecognitionAPIAvailable) {
            alert('Infelizmente seu navegador não suporta a API de gravação!')
            return
        }

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

        const speechRecognition = new SpeechRecognitionAPI()

        speechRecognition.lang = 'pt-BR'
        speechRecognition.continuous = true
        speechRecognition.maxAlternatives = 1
        speechRecognition.interimResults = true

        speechRecognition.onresult = (event) => {
            console.log(event.results)
        }

      speechRecognition.onerror = (event) => {
        console.error(event)
      }

      speechRecognition.start()
    }

    function stopRecording() {
        setRecording(false)
    }
    
    return (
        <Dialog.Root>
            <Dialog.Trigger className='flex flex-col bg-slate-700 overflow-hidden p-5 gap-3 text-left hover:ring-2 hover:ring-slate-400 focus-visible:ring-2 focus-visible:ring-slate-900 rounded-md'>
            <span className="text-sm font-medium text-slate-300">
                Adicionar nota
            </span>
            <p className="text-sm leading-6 text-slate-200">
            Comece gravando uma nota em aúdio ou se preferir utilize apenas texto.
            </p>
            <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none' />
          </Dialog.Trigger>
          <Dialog.Portal>
          <Dialog.Overlay className='inset-0 fixed bg-black/60'/>
          <Dialog.Content className='fixed flex-1 flex flex-col overflow-hidden left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 max-w-[540px] h-[50vh] w-full bg-slate-700 rounded-sm'>
                <Dialog.DialogClose className='absolute right-0 top-0 p-0 bg-slate-800 hover:text-slate-100'>
                    <X className='size-5'/>
                </Dialog.DialogClose>
                <form className='flex-1 flex flex-col'>
                <div className='flex flex-1 flex-col gap-3 p-5'>
                    <span className="text-lg font-medium text-slate-300">
                    Adicionar nota
                    </span>
                   { noteOptions ? (
                       <p className="text-sm leading-6 text-slate-400">
                       Comece <button onClick={startRecording} className='text-lime-400 hover:underline'>gravando uma nota em aúdio</button> ou se preferir <button onClick={handleEditor} className='text-lime-400 hover:underline'>utilize apenas texto.</button>
                       </p>
                   ) : (
                    <textarea 
                    className='text-slate-400 bg-transparent resize-none flex-1 leading-6 outline-none'
                    onChange={handleContentChanged}
                    value={textNote}/>
                   )}
                </div>

                {isRecording ? (
                     <button
                     type='button'
                     onSubmit={stopRecording}
                     className='w-full bg-slate-900 text-white semibold py-4 text-center outline-none group'>
                         Parar de Gravar
                     </button>

                ):(
                    <button
                    type='button'
                    onClick={handleSalveNote}
                    className='w-full bg-lime-400 text-black semibold py-4 text-center outline-none group'>
                        Salvar nota
                    </button>
                )}
                </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
    )
}