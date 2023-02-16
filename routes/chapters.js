import express from 'express';
import cheerio from 'cheerio';
import got from 'got';

const router = express.Router()
router.get('/', (req, res) => {
	(async () => {
		try 
		{
			const siteUrl = "https://www.mangahere.cc/"
			const mangaUrl = req.query['c']
			const result = await got(mangaUrl)
			const $ = await cheerio.load(result.body)
			
			var numChapters = null,
			count = 0,
			chapters = []

			// chapters will be an array of dicts
			$('.detail-main-list li a').each(function() {
				count++
				chapters.push(
					{
						"chapterUrl": $(this).attr('href'),
						"chapterFullUrl": siteUrl + $(this).attr('href'),
						"chapterNum": $(this).find('.title3').text(),
						"chapterDate": $(this).find('.title2').text()
					}
				)
			})
			
			var chapterResults = {
				"mangaUrl": mangaUrl,
				"count": count,
				"chapters": chapters
			}

			res.send(JSON.stringify(chapterResults))

		}
		catch(err) 
		{
			console.log(err)
		}
	})()
})
export { router } 


