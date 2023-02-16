import express from 'express';
import cheerio from 'cheerio';
import got from 'got';

const router = express.Router()
router.get('/', (req, res) => {
	(async () => {
		try 
		{
			const siteUrl = "https://www.mangahere.cc/"
			const mangaUrl = req.query['m'] 
			const result = await got(mangaUrl)
			const $ = cheerio.load(result.body)
			
			var name, author, thumbnail, status, description = null
 			var genres = []

			
			name = $('.detail-info-right-title-font').text()
			author = $('.detail-info-right-say a').text()
			thumbnail = $('.detail-info-cover-img').attr('src')
			status = $('.detail-info-right-title-tip').text()
			description = $('.fullcontent').text()

			$('.detail-info-right-tag-list a').each(function() {
				genres.push($(this).text())	
			})

			var searchResults = {
				"name": name,
				"author": author,
				"mangaUrl": mangaUrl,
				"thumbnail": thumbnail,
				"status": status,
				"genres": genres,
				"description": description		
			}

			res.send(JSON.stringify(searchResults))

		}
		catch(err) 
		{
			console.log(err)
		}
	})()
}) 

export { router } 

