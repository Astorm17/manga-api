import express from 'express';
import puppeteer from 'puppeteer';

const router = express.Router()
router.get('/', (req, res) => {
	(async () => {
		try 
		{
			const siteUrl = "https://www.mangahere.cc/"
			const pageUrl = req.query['p']
			const browser = await puppeteer.launch()
			const page = await browser.newPage()
			await page.goto(pageUrl)

			const pageResult = await page.evaluate(() => {
				return {
					"chapter": document.querySelector('.reader-header-title-2').textContent,
					"image": 'https:' + document.querySelector('.reader-main-img').getAttribute('src')
				}
			})
			
			pageResult["pageUrl"] = pageUrl
	
			await browser.close()

			res.send(JSON.stringify(pageResult))

		}
		catch(err) 
		{
			console.log(err)
		}
	})()
})


export { router } 

