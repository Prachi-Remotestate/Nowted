export interface NotesAPIRes  {
 id: string,
 folderId:string,
 title:string,
 isFavorite:boolean,
 isArchived: boolean,
 createdAt:string,
 updatedAt:string,
 deletedAt:string,
 content: string
 preview:string,
 folder:FolderApiRes
}

export interface FolderApiRes {
    id:string,
    name:string,
    createdAt: string,
    updatedAt:string,
    deletedAt:string
}


export type  previewRes =  Omit<NotesAPIRes, "content">

export type recentNote = {
    recentNotes:previewRes[];
}

type NoteContent = Omit<NotesAPIRes, "preview">


export type getNotesRes = {
    note: NoteContent;
}

export type AllNotes = {
    notes:previewRes[];
    total:number
}


export type getfolders  = {
    folders:FolderApiRes[];
}


