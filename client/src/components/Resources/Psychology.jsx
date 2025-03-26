import React, { useEffect, useState, useRef } from 'react'
import Header from '../Header/Header'
import './Psychology.css'

const VideoSection = ({ videos }) => {
	return (
		<div className="video-section">
			<h2>Видео:</h2>
			<div className="video-grid">
				{videos.map((video, index) => (
					<iframe
						key={index}
						src={video}
						title={`Video ${index + 1}`}
                        style={{ border: 'none' }}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				))}
			</div>
		</div>
	)
}

const ArticleSection = ({ articles }) => {
	return (
		<div className="article-section">
			<h2>Статьи:</h2>
			<div className="article-grid">
				{articles.map((article, index) => (
					<div className="article-card" key={index}>
						<a
                            className="article-title"
							href={article.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							{article.title}
						</a>
						<p>{article.description}</p>
					</div>
				))}
			</div>
		</div>
	)
}

const BookSection = ({ books }) => {
	return (
		<div className="book-section">
			<h2>Книги:</h2>
			<div className="book-grid">
				{books.map((book, index) => (
					<div className="book-card" key={index}>
						<img src={book.image} alt={book.title} />
						<p className="book-title">{book.title}</p>
					</div>
				))}
			</div>
		</div>
	)
}

const Psychology = () => {
	const sections = [
		{ id: 'videos', title: 'Видео' },
		{ id: 'articles', title: 'Статьи' },
		{ id: 'books', title: 'Книги' },
	]

	const [activeSection, setActiveSection] = useState(sections[0].id)
	const observerRef = useRef(null)

	const videos = [
		'https://www.youtube.com/embed/dQw4w9WgXcQ',
		'https://www.youtube.com/embed/oHg5SJYRHA0',
		'https://www.youtube.com/embed/dQw4w9WgXcQ',
		'https://www.youtube.com/embed/oHg5SJYRHA0',
		'https://www.youtube.com/embed/dQw4w9WgXcQ',
		'https://www.youtube.com/embed/oHg5SJYRHA0',
	]
	const articles = [
		{
			title: 'Как улучшить психологию торговли',
			link: '#',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum et vel eaque ex ducimus ipsam possimus inventore, consequuntur, nam exercitationem. Sapiente molestias quaerat possimus voluptate velit dolorem nihil vero!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum et vel eaque ex ducimus ipsam possimus inventore, consequuntur, nam exercitationem. Sapiente molestias quaerat possimus voluptate velit dolorem nihil vero!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum et vel eaque ex ducimus ipsam possimus inventore, consequuntur, nam exercitationem. Sapiente molestias quaerat possimus voluptate velit dolorem nihil vero!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum et vel eaque ex ducimus ipsam possimus inventore, consequuntur, nam exercitationem. Sapiente molestias quaerat possimus voluptate velit dolorem nihil vero!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum et vel eaque ex ducimus ipsam possimus inventore, consequuntur, nam exercitationem. Sapiente molestias quaerat possimus voluptate velit dolorem nihil vero!',
		},
		{
			title: 'Секреты успеха в трейдинге',
			link: '#',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum et vel eaque ex ducimus ipsam possimus inventore, consequuntur, nam exercitationem. Sapiente molestias quaerat possimus voluptate velit dolorem nihil vero!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum et vel eaque ex ducimus ipsam possimus inventore, consequuntur, nam exercitationem. Sapiente molestias quaerat possimus voluptate velit dolorem nihil vero!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum et vel eaque ex ducimus ipsam possimus inventore, consequuntur, nam exercitationem. Sapiente molestias quaerat possimus voluptate velit dolorem nihil vero!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum et vel eaque ex ducimus ipsam possimus inventore, consequuntur, nam exercitationem. Sapiente molestias quaerat possimus voluptate velit dolorem nihil vero!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt harum et vel eaque ex ducimus ipsam possimus inventore, consequuntur, nam exercitationem. Sapiente molestias quaerat possimus voluptate velit dolorem nihil vero!',
		},
	]
	const books = [
		{
			title: 'Психология трейдера',
			image: 'https://cdn1.ozone.ru/s3/multimedia-a/6232423138.jpg',
		},
		{
			title: 'Психология трейдера',
			image: 'https://cdn1.ozone.ru/s3/multimedia-a/6232423138.jpg',
		},
	]

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.6,
		}

		observerRef.current = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveSection(entry.target.id)
				}
			})
		}, options)

		const sectionElements = document.querySelectorAll('.res-section')
		sectionElements.forEach((section) => {
			observerRef.current.observe(section)
		})

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect()
			}
		}
	}, [])

	return (
		<>
			<Header />
			<div className="res-container">
				<div className="res-sidebar">
					<ul>
						{sections.map((section) => (
							<li
								key={section.id}
								className={
									activeSection === section.id ? 'active' : ''
								}
							>
								<a href={`#${section.id}`}>{section.title}</a>
							</li>
						))}
					</ul>
				</div>
				<div className="res-content">
					<div id="videos" className="res-section">
						<VideoSection videos={videos} />
					</div>
					<div id="articles" className="res-section">
						<ArticleSection articles={articles} />
					</div>
					<div id="books" className="res-section">
						<BookSection books={books} />
					</div>
				</div>
			</div>
		</>
	)
}

export default Psychology
