export function NewNoteCard() {
    return (
        <div className='rounded-md bg-slate-700 overflow-hidden p-5 space-y-3'>
            <span className="text-sm font-medium text-slate-300">
                Adicionar nota
            </span>
            <p className="text-sm leading-6 text-slate-200">
                Digite uma nota...
            </p>
            <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none' />
          </div>
    )
}