# Element structure

## Element list

#navbar
#content
#title-area
.paragraph
.image
.dual-section
.image-break
#footer

## General structure
html

    head

    body

		#navbar
		Contains buttons to navigate to the other pages of the website

        #content
        The main column part of the page that contains all of the content

			#title-area
			The page's title, with a neat image behind it

			.paragraph
			A large amount of text

			.image
			An image

			.dual-section
			Two types of content side-by-side, or above and below if on mobile

			.image-break
			A image banner that breaks up the text
		
		#footer

			#explaination
			A short entry describing the site

			#contact-info
			Links to contact me

## Populated structure
<html>
    <head></head>
    <body>
		<div>
			<div id="navbar"></div>
			<div id="content">
				<div id="title-area">
					<div id="page-title"></div>
					<div id="page-banner"></div>
				</div>
				<div class="paragraph"></div>
				<div class="image"></div>
				<div class="dual-section"></div>
				<div class="image-break"></div>
			</div>
			<div id="footer">
				<div id="explaination"></div>
				<div id="contact-info"></div>
			</div>
		</div>
	</body>
</html>