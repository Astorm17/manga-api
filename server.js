import express from 'express';
import { router as searchRouter } from './routes/search.js';
import { router as mangaRouter } from './routes/manga.js';
import { router as chaptersRouter } from './routes/chapters.js';
import { router as chapterRouter } from './routes/chapter.js';
import { router as pageRouter } from './routes/page.js';

const app = express()

app.use(express.json())

app.use('/search', searchRouter)
app.use('/manga', mangaRouter)
app.use('/chapters', chaptersRouter)
app.use('/chapter', chapterRouter)
app.use('/page', pageRouter)

app.listen(8080, () => console.log('Server started!'))
	
