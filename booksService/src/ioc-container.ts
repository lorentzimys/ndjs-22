import { Container } from "inversify";
import { BooksRepository } from "./BooksRepository";

const iocContainer = new Container();
iocContainer.bind(BooksRepository).toSelf();

export { iocContainer };
