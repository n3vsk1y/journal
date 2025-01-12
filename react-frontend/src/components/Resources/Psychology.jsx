import React, { useEffect, useState, useRef } from 'react'
import Header from '../Header/Header'
import './Psychology.css'

const Psychology = () => {
	const sections = [
		{ id: 'section1', title: 'Section 1' },
		{ id: 'section2', title: 'Section 2' },
		{ id: 'section3', title: 'Section 3' },
		{ id: 'section4', title: 'Section 4' },
	]

	const [activeSection, setActiveSection] = useState(sections[0].id)
	const observerRef = useRef(null)

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

		const sectionElements = document.querySelectorAll('.section')
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
				{sections.map((section) => (
					<div key={section.id} id={section.id} className="res-section">
						<h2>{section.title}</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Fusce aliquam tellus non nisi scelerisque, et
							facilisis purus viverra. Proin in ligula eu nulla
							faucibus feugiat ut vitae turpis.
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Fusce aliquam tellus non nisi scelerisque, et
							facilisis purus viverra. Proin in ligula eu nulla
							faucibus feugiat ut vitae turpis.
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Fusce aliquam tellus non nisi scelerisque, et
							facilisis purus viverra. Proin in ligula eu nulla
							faucibus feugiat ut vitae turpis.
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Fusce aliquam tellus non nisi scelerisque, et
							facilisis purus viverra. Proin in ligula eu nulla
							faucibus feugiat ut vitae turpis.
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Fusce aliquam tellus non nisi scelerisque, et
							facilisis purus viverra. Proin in ligula eu nulla
							faucibus feugiat ut vitae turpis.
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Fusce aliquam tellus non nisi scelerisque, et
							facilisis purus viverra. Proin in ligula eu nulla
							faucibus feugiat ut vitae turpis.
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Fusce aliquam tellus non nisi scelerisque, et
							facilisis purus viverra. Proin in ligula eu nulla
							faucibus feugiat ut vitae turpis.
						</p>
					</div>
				))}
			</div>
		</div>
        </>
	)
}

export default Psychology
