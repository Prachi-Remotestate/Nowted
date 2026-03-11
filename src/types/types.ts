export interface RecentNote {
  id: string;
  title: string;
  folderId: string;
}


export interface Folder {
  id: string;
  name: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  deletedAt?: string | null | Date;
  folder?: Folder | null;
  isArchived: boolean
  isFavorite:boolean
}

export interface DeletedNote {
  note: Note
}