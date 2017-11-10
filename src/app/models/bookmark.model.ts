import { Book } from './book.model';
import { User } from './user.model';

export class Bookmark {

    id: string;
    book: Book;
    user: User;
    position: number;
    date: Date;

}
